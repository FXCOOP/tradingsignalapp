import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get user from JWT token
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Return user data (without password hash)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        access_level: user.access_level,
        has_broker_account: user.has_broker_account,
        free_signals_count: user.free_signals_count,
        free_articles_count: user.free_articles_count,
        broker_verified_at: user.broker_verified_at,
        broker_name: user.broker_name,
        created_at: user.created_at,
        last_login_at: user.last_login_at
      }
    })

  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
