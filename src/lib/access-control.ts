import { supabaseAdmin } from './supabase'

const FREE_TIER_LIMIT = parseInt(process.env.FREE_TIER_LIMIT || '3')

export async function canViewContent(userId: string): Promise<{
  canView: boolean
  viewsRemaining: number
  reason?: string
}> {
  try {
    // Get user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return { canView: false, viewsRemaining: 0, reason: 'User not found' }
    }

    // Check if email is verified
    if (!user.email_verified) {
      return { canView: false, viewsRemaining: 0, reason: 'Please verify your email first' }
    }

    // Premium users get unlimited access
    if (user.access_tier === 'premium') {
      return { canView: true, viewsRemaining: -1 } // -1 means unlimited
    }

    // Reset views if needed (new day)
    const today = new Date().toISOString().split('T')[0]
    const resetDate = user.free_views_reset_date

    if (resetDate !== today) {
      // Reset the counter
      await supabaseAdmin
        .from('users')
        .update({
          free_views_count: 0,
          free_views_reset_date: today
        })
        .eq('id', userId)

      return { canView: true, viewsRemaining: FREE_TIER_LIMIT - 1 }
    }

    // Check free tier limit
    const viewsUsed = user.free_views_count
    const viewsRemaining = FREE_TIER_LIMIT - viewsUsed

    if (viewsUsed >= FREE_TIER_LIMIT) {
      return {
        canView: false,
        viewsRemaining: 0,
        reason: 'Free limit reached. Upgrade to premium for unlimited access!'
      }
    }

    return { canView: true, viewsRemaining }

  } catch (error) {
    console.error('Access control error:', error)
    return { canView: false, viewsRemaining: 0, reason: 'Error checking access' }
  }
}

export async function recordView(
  userId: string,
  contentType: 'signal' | 'news' | 'education' | 'analysis',
  contentId: string
): Promise<void> {
  try {
    // Get user
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('access_tier, free_views_count')
      .eq('id', userId)
      .single()

    if (!user) return

    // Don't count views for premium users
    if (user.access_tier === 'premium') {
      // Still log the activity for analytics
      await supabaseAdmin.from('user_activity').insert({
        user_id: userId,
        action_type: `view_${contentType}`,
        content_id: contentId,
        content_type: contentType
      })
      return
    }

    // Increment free view count
    await supabaseAdmin
      .from('users')
      .update({
        free_views_count: user.free_views_count + 1
      })
      .eq('id', userId)

    // Log activity
    await supabaseAdmin.from('user_activity').insert({
      user_id: userId,
      action_type: `view_${contentType}`,
      content_id: contentId,
      content_type: contentType
    })

  } catch (error) {
    console.error('Record view error:', error)
  }
}

export async function getUserStats(userId: string) {
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('access_tier, free_views_count, free_views_reset_date')
    .eq('id', userId)
    .single()

  if (!user) return null

  const viewsRemaining = user.access_tier === 'premium'
    ? -1
    : Math.max(0, FREE_TIER_LIMIT - user.free_views_count)

  return {
    accessTier: user.access_tier,
    viewsUsed: user.free_views_count,
    viewsRemaining,
    resetDate: user.free_views_reset_date,
    isPremium: user.access_tier === 'premium'
  }
}
