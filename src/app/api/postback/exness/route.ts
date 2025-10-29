import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Exness Partner ID
const EXNESS_PARTNER_ID = 'c_8f0nxidtbt'

/**
 * Exness Postback Handler
 *
 * Handles all Exness affiliate events:
 * - REGISTRATION: User registered with Exness
 * - QUALIFICATION: User completed qualification steps
 * - AGGREGATED_DEPOSIT: User made a deposit
 * - REWARD_PROCESSING: Commission/reward is being processed (AUTO-APPROVE USER HERE!)
 * - IS_KYC_PASSED: User completed KYC verification
 */
export async function POST(request: NextRequest) {
  try {
    // Parse postback data from Exness (supports both JSON body and URL parameters)
    let postbackData: any = {}

    // Try to parse JSON body first
    try {
      const body = await request.json()
      postbackData = body
    } catch (parseError) {
      // If JSON parsing fails, try URL parameters (Exness Token/Parameter format)
      const url = new URL(request.url)
      const params = url.searchParams

      // Convert URL parameters to object
      postbackData = {
        partner_id: params.get('partner_id'),
        event_type: params.get('event_type'),
        user_id: params.get('user_id'),
        deposit_amount: params.get('deposit_amount'),
        ftd_amount: params.get('ftd_amount'),
        reward_amount: params.get('reward_amount'),
        kyc_status: params.get('kyc_status'),
        qualification_status: params.get('qualification_status')
      }

      // Remove null values
      postbackData = Object.fromEntries(
        Object.entries(postbackData).filter(([_, v]) => v != null)
      )

      // If still no data, try reading form data
      if (Object.keys(postbackData).length === 0) {
        try {
          const formData = await request.formData()
          formData.forEach((value, key) => {
            postbackData[key] = value
          })
        } catch (formError) {
          console.error('❌ Failed to parse any data format:', parseError)
        }
      }
    }

    console.log('📡 Received Exness Postback (multiple format support):', {
      timestamp: new Date().toISOString(),
      data: postbackData,
      url: request.url
    })

    console.log('📡 Received Exness Postback:', {
      timestamp: new Date().toISOString(),
      event: postbackData.event_type || postbackData.eventType,
      data: postbackData
    })

    // Extract data (Exness may send different field names)
    const {
      partner_id = postbackData.partnerId,
      event_type = postbackData.eventType,
      user_id: exness_user_id = postbackData.userId,
      ftd_amount = postbackData.ftdAmount || postbackData.amount,
      deposit_amount = postbackData.depositAmount,
      reward_amount = postbackData.rewardAmount,
      kyc_status = postbackData.kycStatus,
      qualification_status = postbackData.qualificationStatus,
      subid = postbackData.subid, // 🆕 Extract click_id from subid parameter
      ...otherData
    } = postbackData

    console.log('🔍 Postback includes click_id (subid):', subid)

    // Verify partner ID matches
    if (partner_id && partner_id !== EXNESS_PARTNER_ID) {
      console.warn('⚠️ Partner ID mismatch:', partner_id, 'Expected:', EXNESS_PARTNER_ID)
    }

    let userId: string | null = null

    // 🆕 PRIORITY 1: Find user by click_id (from subid parameter)
    if (subid) {
      console.log('🔍 Looking up user by click_id:', subid)
      const { data: clickData, error: clickError } = await supabaseAdmin
        .from('exness_clicks')
        .select('user_id, user_email, clicked_at')
        .eq('click_id', subid)
        .maybeSingle()

      if (clickData) {
        userId = clickData.user_id
        console.log('✅ Found user by click_id:', userId, 'Email:', clickData.user_email)
      } else {
        console.warn('⚠️ No click found with click_id:', subid)
      }
    }

    // FALLBACK: If no click_id, try to find by most recent click (old method)
    if (!userId) {
      console.log('🔍 Falling back to most recent click lookup')
      const { data: clickData, error: clickError } = await supabaseAdmin
        .from('exness_clicks')
        .select('user_id, clicked_at')
        .eq('partner_id', EXNESS_PARTNER_ID)
        .order('clicked_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      userId = clickData?.user_id || null
    }

    // If no click found, try to find user by Exness user ID (if we've seen them before)
    if (!userId && exness_user_id) {
      const { data: existingConversion } = await supabaseAdmin
        .from('exness_conversions')
        .select('user_id')
        .eq('exness_user_id', exness_user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      userId = existingConversion?.user_id || null
    }

    // Record postback event
    const insertData: any = {
      user_id: userId,
      partner_id: EXNESS_PARTNER_ID,
      event_type: event_type || 'UNKNOWN',
      ftd_amount: parseFloat(ftd_amount || deposit_amount || '0'),
      reward_amount: parseFloat(reward_amount || '0'),
      exness_user_id: exness_user_id || null,
      raw_postback_data: postbackData,
      processed: false
    }

    // Only add optional fields if they have values
    if (kyc_status) {
      insertData.kyc_status = kyc_status
    }
    if (qualification_status) {
      insertData.qualification_status = qualification_status
    }

    const { data: conversion, error: conversionError } = await supabaseAdmin
      .from('exness_conversions')
      .insert(insertData)
      .select()
      .maybeSingle()

    if (conversionError) {
      console.error('❌ Error recording conversion:', conversionError)
      return NextResponse.json({
        success: false,
        error: 'Failed to record conversion',
        details: conversionError.message
      }, { status: 500 })
    }

    // Handle different event types
    let upgradeApplied = false

    if (userId) {
      switch (event_type) {
        case 'REGISTRATION':
          console.log('📝 User registered with Exness:', userId)
          await supabaseAdmin
            .from('users')
            .update({
              exness_registered: true,
              exness_user_id: exness_user_id
            })
            .eq('id', userId)
          break

        case 'QUALIFICATION':
          console.log('✅ User qualified with Exness:', userId)
          await supabaseAdmin
            .from('users')
            .update({
              exness_qualified: true,
              broker_name: 'Exness'
            })
            .eq('id', userId)
          break

        case 'AGGREGATED_DEPOSIT':
          console.log('💰 User made deposit:', userId, deposit_amount || ftd_amount)
          await supabaseAdmin
            .from('users')
            .update({
              exness_deposited: true,
              exness_deposit_amount: parseFloat(deposit_amount || ftd_amount || '0')
            })
            .eq('id', userId)
          break

        case 'REWARD_PROCESSING':
          // 🎉 AUTO-APPROVE USER HERE!
          console.log('🎉 REWARD PROCESSING - AUTO-APPROVING USER:', userId)

          const { error: approvalError } = await supabaseAdmin
            .from('users')
            .update({
              has_broker_account: true,  // ✅ UNLOCK PREMIUM ACCESS
              broker_name: 'Exness',
              broker_verified_at: new Date().toISOString(),
              exness_reward_processed: true,
              exness_reward_amount: parseFloat(reward_amount || '0'),
              approved_at: new Date().toISOString()
            })
            .eq('id', userId)

          if (!approvalError) {
            upgradeApplied = true
            console.log('✅ User auto-approved and upgraded to PREMIUM:', userId)

            // Track in activity log
            await supabaseAdmin.from('activity_log').insert({
              user_id: userId,
              action: 'EXNESS_REWARD_APPROVED',
              details: {
                event_type,
                reward_amount,
                exness_user_id
              }
            })
          } else {
            console.error('❌ Failed to approve user:', approvalError)
          }
          break

        case 'IS_KYC_PASSED':
          console.log('🆔 User passed KYC:', userId)
          await supabaseAdmin
            .from('users')
            .update({
              exness_kyc_passed: true,
              kyc_verified_at: new Date().toISOString()
            })
            .eq('id', userId)
          break

        default:
          console.log('ℹ️ Unknown event type:', event_type)
      }
    } else {
      console.warn('⚠️ No user ID found for postback')
    }

    // Mark conversion as processed
    if (conversion) {
      await supabaseAdmin
        .from('exness_conversions')
        .update({
          processed: true,
          processed_at: new Date().toISOString(),
          user_approved: upgradeApplied
        })
        .eq('id', conversion.id)
    }

    // Return success response with CORS headers
    return NextResponse.json({
      success: true,
      message: 'Postback processed successfully',
      event_type,
      user_id: userId,
      upgrade_applied: upgradeApplied,
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })

  } catch (error: any) {
    console.error('❌ Exness Postback Error:', error)

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error.message
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}

// GET endpoint to check postback configuration
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ready',
    partner_id: EXNESS_PARTNER_ID,
    supported_events: [
      'REGISTRATION',
      'QUALIFICATION',
      'AGGREGATED_DEPOSIT',
      'REWARD_PROCESSING',
      'IS_KYC_PASSED'
    ],
    postback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/postback/exness`,
    instructions: {
      registration: `${process.env.NEXT_PUBLIC_APP_URL}/api/postback/exness?event=registration`,
      qualification: `${process.env.NEXT_PUBLIC_APP_URL}/api/postback/exness?event=qualification`,
      deposit: `${process.env.NEXT_PUBLIC_APP_URL}/api/postback/exness?event=deposit`,
      reward: `${process.env.NEXT_PUBLIC_APP_URL}/api/postback/exness?event=reward`,
      kyc: `${process.env.NEXT_PUBLIC_APP_URL}/api/postback/exness?event=kyc`
    },
    example_postback: {
      partner_id: EXNESS_PARTNER_ID,
      event_type: "REWARD_PROCESSING",
      user_id: "exness_user_123",
      reward_amount: 50.00
    }
  }, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
