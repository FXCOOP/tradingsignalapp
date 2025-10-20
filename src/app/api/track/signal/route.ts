import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    // Verify token and get user (simplified - you should verify JWT properly)
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, free_signals_count, has_broker_account')
      .eq('id', token) // In production, decode JWT to get user ID
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { signal_id } = body

    if (!signal_id) {
      return NextResponse.json(
        { success: false, error: 'Signal ID required' },
        { status: 400 }
      )
    }

    // Check if user has broker account (premium)
    if (user.has_broker_account) {
      return NextResponse.json({
        success: true,
        can_view: true,
        is_premium: true,
        remaining: Infinity
      })
    }

    // Check free tier limit (3 signals)
    if (user.free_signals_count >= 3) {
      return NextResponse.json({
        success: true,
        can_view: false,
        is_premium: false,
        remaining: 0,
        message: 'Free limit reached. Open a broker account for unlimited signals!'
      })
    }

    // Increment free signals count
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ free_signals_count: user.free_signals_count + 1 })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating signal count:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to track signal view' },
        { status: 500 }
      )
    }

    // Record the view
    await supabaseAdmin
      .from('user_signal_views')
      .insert({
        user_id: user.id,
        signal_id: signal_id
      })
      .select()

    return NextResponse.json({
      success: true,
      can_view: true,
      is_premium: false,
      remaining: 3 - (user.free_signals_count + 1)
    })

  } catch (error) {
    console.error('Track signal error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
