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
    // Call custom onClick if provided
    if (onClick) {
      onClick()
    }

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
          console.log('✅ Exness click tracked:', {
            source,
            click_id: data.click_id,
            email: user.email
          })
        } else {
          console.warn('⚠️ Failed to track click in database:', await response.text())
        }
      } else {
        console.log('ℹ️ User not logged in - click tracked in GA only')
      }
    } catch (error) {
      console.error('❌ Failed to track Exness click:', error)
      // Don't block the link navigation on error
    }
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
