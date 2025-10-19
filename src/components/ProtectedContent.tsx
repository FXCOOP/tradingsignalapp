'use client'
import { useState, useEffect, ReactNode } from 'react'
import { useUser } from '@/contexts/UserContext'
import { AuthModal } from './AuthModal'

interface ProtectedContentProps {
  children: ReactNode
  resourceType: 'signal' | 'article' | 'course'
  resourceId: string
  fallback?: ReactNode
}

export function ProtectedContent({
  children,
  resourceType,
  resourceId,
  fallback
}: ProtectedContentProps) {
  const { user, loading, isPremium } = useUser()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [accessData, setAccessData] = useState<any>(null)

  useEffect(() => {
    checkAccess()
  }, [user, resourceType, resourceId])

  const checkAccess = async () => {
    // If loading user data, wait
    if (loading) return

    // If no user, no access
    if (!user) {
      setHasAccess(false)
      return
    }

    // Premium users always have access
    if (isPremium()) {
      setHasAccess(true)
      trackActivity()
      return
    }

    // Check access via API
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(`/api/check-access/${resourceType}/${resourceId}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })

      const data = await response.json()
      setAccessData(data)
      setHasAccess(data.has_access)

      // Track activity if has access
      if (data.has_access) {
        trackActivity()
      }
    } catch (error) {
      console.error('Error checking access:', error)
      setHasAccess(false)
    }
  }

  const trackActivity = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      await fetch('/api/track-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          action_type: `view_${resourceType}`,
          resource_type: resourceType,
          resource_id: resourceId,
          resource_title: `${resourceType} ${resourceId}`
        })
      })
    } catch (error) {
      console.error('Error tracking activity:', error)
    }
  }

  // Loading state
  if (loading || hasAccess === null) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // No user - show auth modal trigger
  if (!user) {
    return (
      <>
        <div className="relative">
          {fallback || (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🔒 Sign up to access this content
              </h3>
              <p className="text-gray-600 mb-6">
                Create a free account to get 3 free {resourceType}s!
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="signup"
        />
      </>
    )
  }

  // Has access - show content
  if (hasAccess) {
    return <>{children}</>
  }

  // No access - show upgrade prompt
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        ⭐ Upgrade to Premium
      </h3>

      {accessData?.reason === 'limit_reached' && (
        <p className="text-gray-700 mb-4">
          You've used all {accessData.limit} free {resourceType}s.
        </p>
      )}

      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="font-bold text-lg mb-3">Get UNLIMITED Access:</h4>
        <ul className="text-left space-y-2 mb-4">
          <li>🚀 Unlimited Trading Signals</li>
          <li>📊 Unlimited Market Analysis</li>
          <li>🎓 Full Education Platform</li>
          <li>💼 Copy Trading Features</li>
        </ul>
        <p className="text-sm text-gray-600">
          Just open a broker account with minimum $10 deposit
        </p>
      </div>

      <a
        href={`https://www.exnesspro.com/en/efficient-way-to-trade-stocks?partner_id=${process.env.NEXT_PUBLIC_EXNESS_PARTNER_ID || 'c_8f0nxidtbt'}&client_id=${user.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all"
      >
        Open Exness Account (Verified Broker)
      </a>

      <p className="text-xs text-gray-500 mt-4">
        Regulated broker • Minimum $10 deposit • Instant verification
      </p>
    </div>
  )
}
