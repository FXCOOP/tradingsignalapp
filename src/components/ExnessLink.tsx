'use client'
import { useUser } from '@/contexts/UserContext'

interface ExnessLinkProps {
  href: string
  source: string // Where the click came from (e.g., 'popup', 'banner', 'footer')
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  rel?: string
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * ExnessLink Component
 *
 * Automatically tracks all Exness affiliate link clicks in:
 * 1. Google Analytics
 * 2. Database (with user email for postback matching)
 *
 * Usage:
 * <ExnessLink href="https://one.exnessonelink.com/a/c_8f0nxidtbt" source="popup">
 *   Open Account
 * </ExnessLink>
 */
export function ExnessLink({ href, source, children, onClick, ...props }: ExnessLinkProps) {
  const { user } = useUser()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent immediate navigation

    // Call custom onClick if provided
    if (onClick) {
      onClick()
    }

    let finalUrl = href
    let clickId = null

    try {
      // ✅ Track in Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exness_click', {
          event_category: source,
          event_label: href,
          value: user ? 1 : 0 // 1 if logged in, 0 if not
        })
      }

      // ✅ Track in database with email (for postback matching)
      const token = localStorage.getItem('tradeflow_token')
      if (token && user) {
        const response = await fetch('/api/track/exness-click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            partner_id: 'c_8f0nxidtbt',
            click_url: href,
            user_email: user.email,
            click_source: source // Track where they clicked from
          })
        })

        if (response.ok) {
          const data = await response.json()
          clickId = data.click_id

          // Add click_id to URL as subid parameter
          const url = new URL(href)
          url.searchParams.set('subid', clickId)
          finalUrl = url.toString()

          console.log('✅ Exness click tracked:', {
            source,
            click_id: clickId,
            email: user.email,
            final_url: finalUrl
          })
        } else {
          console.warn('⚠️ Failed to track click in database:', await response.text())
        }
      } else {
        console.log('ℹ️ User not logged in - click tracked in GA only')
        // For non-logged-in users, generate a simple click_id
        clickId = `anon_${Date.now()}_${Math.random().toString(36).substring(7)}`
        const url = new URL(href)
        url.searchParams.set('subid', clickId)
        finalUrl = url.toString()
      }
    } catch (error) {
      console.error('❌ Failed to track Exness click:', error)
      // Continue with original URL if tracking fails
    }

    // Open the final URL with click_id
    window.open(finalUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}
