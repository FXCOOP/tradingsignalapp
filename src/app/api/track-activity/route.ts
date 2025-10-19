import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action_type, resource_type, resource_id, resource_title } = body

    // Premium users don't need tracking for limits
    const shouldIncrementCounter = !user.has_broker_account

    // Check if already tracked this resource
    const { data: existingActivity } = await supabaseAdmin
      .from('user_activity')
      .select('id')
      .eq('user_id', user.id)
      .eq('resource_type', resource_type)
      .eq('resource_id', resource_id)
      .single()

    if (existingActivity) {
      // Already tracked - don't increment counter again
      return NextResponse.json({
        success: true,
        message: 'Activity already tracked',
        new_view: false
      })
    }

    // Log activity
    await supabaseAdmin
      .from('user_activity')
      .insert({
        user_id: user.id,
        action_type,
        resource_type,
        resource_id,
        resource_title,
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown'
      })

    // Increment counter for free users
    let updatedUser = user
    if (shouldIncrementCounter) {
      const countField = `free_${resource_type}s_count` // e.g., free_signals_count

      const { data: updated } = await supabaseAdmin
        .from('users')
        .update({
          [countField]: (user as any)[countField] + 1
        })
        .eq('id', user.id)
        .select()
        .single()

      updatedUser = updated || user
    }

    return NextResponse.json({
      success: true,
      message: 'Activity tracked',
      new_view: true,
      free_signals_count: (updatedUser as any).free_signals_count,
      free_articles_count: (updatedUser as any).free_articles_count,
      remaining_signals: Math.max(0, 3 - (updatedUser as any).free_signals_count),
      remaining_articles: Math.max(0, 3 - (updatedUser as any).free_articles_count)
    })

  } catch (error) {
    console.error('Track activity error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
