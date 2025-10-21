import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyToken } from '@/lib/auth'

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

    // Verify JWT token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user from database
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, free_articles_count, has_broker_account')
      .eq('id', decoded.userId)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { article_id } = body

    if (!article_id) {
      return NextResponse.json(
        { success: false, error: 'Article ID required' },
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

    // Check free tier limit (3 articles)
    if (user.free_articles_count >= 3) {
      return NextResponse.json({
        success: true,
        can_view: false,
        is_premium: false,
        remaining: 0,
        message: 'Free limit reached. Open a broker account for unlimited articles!'
      })
    }

    // Increment free articles count
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ free_articles_count: user.free_articles_count + 1 })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating article count:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to track article view' },
        { status: 500 }
      )
    }

    // Record the view
    await supabaseAdmin
      .from('user_article_views')
      .insert({
        user_id: user.id,
        article_id: article_id
      })
      .select()

    return NextResponse.json({
      success: true,
      can_view: true,
      is_premium: false,
      remaining: 3 - (user.free_articles_count + 1)
    })

  } catch (error) {
    console.error('Track article error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
