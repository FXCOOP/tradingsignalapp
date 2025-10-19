import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

const FREE_LIMITS = {
  signal: 3,
  article: 3,
  course: 0 // Premium only
}

export async function GET(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } }
) {
  try {
    const { resourceType, resourceId } = params

    // Get current user
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({
        success: false,
        has_access: false,
        reason: 'not_authenticated',
        message: 'Please sign up or login to access this content'
      })
    }

    // Premium users get unlimited access
    if (user.has_broker_account) {
      return NextResponse.json({
        success: true,
        has_access: true,
        access_level: 'premium',
        message: 'Premium access granted'
      })
    }

    // Free users - check limits
    const limit = FREE_LIMITS[resourceType as keyof typeof FREE_LIMITS]

    if (limit === undefined || limit === 0) {
      return NextResponse.json({
        success: false,
        has_access: false,
        reason: 'premium_only',
        message: 'This content requires premium access',
        upgrade_url: '/broker-signup'
      })
    }

    // Count how many times user accessed this type
    const countField = `free_${resourceType}s_count` // e.g., free_signals_count
    const currentCount = (user as any)[countField] || 0

    if (currentCount >= limit) {
      return NextResponse.json({
        success: false,
        has_access: false,
        reason: 'limit_reached',
        remaining: 0,
        limit: limit,
        message: `You've used all ${limit} free ${resourceType}s. Upgrade to premium for unlimited access!`,
        upgrade_url: '/broker-signup'
      })
    }

    // Check if user already viewed this specific resource
    const { data: existingView } = await supabaseAdmin
      .from('user_activity')
      .select('id')
      .eq('user_id', user.id)
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .single()

    const remaining = limit - currentCount - (existingView ? 0 : 1)

    return NextResponse.json({
      success: true,
      has_access: true,
      access_level: 'free',
      remaining: Math.max(0, remaining),
      limit: limit,
      message: existingView
        ? 'Access granted (already viewed)'
        : `Access granted. ${remaining} free ${resourceType}s remaining after this.`
    })

  } catch (error) {
    console.error('Check access error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
