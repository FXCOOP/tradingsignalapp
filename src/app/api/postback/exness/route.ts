import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Parse postback data from Exness
    const postbackData = await request.json()

    console.log('📡 Received Exness Postback:', postbackData)

    const {
      partner_id,      // c_8f0nxidtbt
      event_type,      // 'FTD', 'Deposit', etc.
      ftd_amount,      // Deposit amount
      user_id: exness_user_id,
      ...otherData
    } = postbackData

    // Find which user clicked this partner_id
    const { data: clickData, error: clickError } = await supabaseAdmin
      .from('exness_clicks')
      .select('user_id')
      .eq('partner_id', partner_id)
      .order('clicked_at', { ascending: false })
      .limit(1)
      .single()

    if (clickError || !clickData) {
      console.error('❌ No user found for partner_id:', partner_id)

      // Still record the postback for debugging
      await supabaseAdmin.from('exness_conversions').insert({
        partner_id,
        event_type,
        ftd_amount,
        exness_user_id,
        raw_postback_data: postbackData,
        processed: false
      })

      return NextResponse.json({
        success: false,
        message: 'No user found for this partner_id'
      })
    }

    const userId = clickData.user_id

    // Record conversion
    const { data: conversion, error: conversionError } = await supabaseAdmin
      .from('exness_conversions')
      .insert({
        user_id: userId,
        partner_id,
        event_type,
        ftd_amount,
        exness_user_id,
        raw_postback_data: postbackData,
        processed: false
      })
      .select()
      .single()

    if (conversionError) {
      console.error('❌ Error recording conversion:', conversionError)
      return NextResponse.json({ error: 'Failed to record conversion' }, { status: 500 })
    }

    // AUTO-UPGRADE: Set has_broker_account = true
    const { error: upgradeError } = await supabaseAdmin
      .from('users')
      .update({
        has_broker_account: true,
        broker_name: 'Exness',
        broker_verified_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (upgradeError) {
      console.error('❌ Error upgrading user:', upgradeError)
      return NextResponse.json({ error: 'Failed to upgrade user' }, { status: 500 })
    }

    // Mark conversion as processed
    await supabaseAdmin
      .from('exness_conversions')
      .update({
        processed: true,
        processed_at: new Date().toISOString()
      })
      .eq('id', conversion.id)

    console.log('✅ User upgraded successfully:', userId)

    return NextResponse.json({
      success: true,
      message: 'User upgraded to premium',
      user_id: userId,
      conversion_id: conversion.id
    })

  } catch (error) {
    console.error('❌ Postback processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Also support GET for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Exness Postback Endpoint',
    status: 'operational',
    timestamp: new Date().toISOString()
  })
}
