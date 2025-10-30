'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface PopupVariant {
  id: string
  name: string
  icon: string
  title: string
  tagline: string
  gradient: string
  textColor: string
  ctaColor: string
}

interface VariantStats {
  views: number
  clicks: number
  cvr: number
}

interface Analytics {
  variants: Record<string, VariantStats>
  totalViews: number
  totalClicks: number
  testsRun: number
}

const VARIANTS: PopupVariant[] = [
  {
    id: 'pink',
    name: 'Pink/Orange',
    icon: '🏆',
    title: 'Unlock Your Trading Success',
    tagline: 'Complete these 3 simple steps to activate all bonuses',
    gradient: 'from-pink-400 via-yellow-300 to-yellow-200',
    textColor: 'text-gray-900',
    ctaColor: 'text-pink-500'
  },
  {
    id: 'blue',
    name: 'Blue Ocean',
    icon: '💎',
    title: 'Start Your Profit Journey',
    tagline: 'Three easy steps to unlock premium trading tools',
    gradient: 'from-blue-400 to-cyan-400',
    textColor: 'text-white',
    ctaColor: 'text-blue-500'
  },
  {
    id: 'purple',
    name: 'Purple Sunset',
    icon: '✨',
    title: 'Unlock Elite Trading Status',
    tagline: 'Follow these steps to access premium features',
    gradient: 'from-teal-200 to-pink-200',
    textColor: 'text-gray-900',
    ctaColor: 'text-purple-600'
  },
  {
    id: 'green',
    name: 'Green Success',
    icon: '💰',
    title: 'Start Earning Today',
    tagline: 'Complete setup in 3 minutes and start profiting',
    gradient: 'from-lime-300 to-emerald-400',
    textColor: 'text-emerald-900',
    ctaColor: 'text-white'
  },
  {
    id: 'orange',
    name: 'Orange Energy',
    icon: '🚀',
    title: 'Blast Off to Profits!',
    tagline: '3 quick steps to launch your trading career',
    gradient: 'from-pink-400 to-yellow-300',
    textColor: 'text-white',
    ctaColor: 'text-pink-500'
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    icon: '👑',
    title: 'Join The Elite Traders',
    tagline: 'Exclusive access for select members only',
    gradient: 'from-indigo-500 to-purple-600',
    textColor: 'text-white',
    ctaColor: 'text-indigo-600'
  },
  {
    id: 'red',
    name: 'Red Power',
    icon: '⚡',
    title: 'Don\'t Miss This Opportunity!',
    tagline: 'Limited spots available - Act fast!',
    gradient: 'from-red-500 to-orange-500',
    textColor: 'text-white',
    ctaColor: 'text-red-500'
  }
]

const EXNESS_URL = 'https://one.exnesstrack.net/a/0oq2t8o0u4'
const STORAGE_KEY = 'gcc_popup_analytics'
const POPUP_SHOWN_KEY = 'gcc_popup_shown'

export function AutoOptimizingPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentVariant, setCurrentVariant] = useState<PopupVariant | null>(null)
  const [analytics, setAnalytics] = useState<Analytics>({
    variants: {},
    totalViews: 0,
    totalClicks: 0,
    testsRun: 0
  })

  // Initialize analytics
  useEffect(() => {
    const initAnalytics = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setAnalytics(JSON.parse(saved))
      } else {
        const initialAnalytics: Analytics = {
          variants: {},
          totalViews: 0,
          totalClicks: 0,
          testsRun: 0
        }
        VARIANTS.forEach(variant => {
          initialAnalytics.variants[variant.id] = {
            views: 0,
            clicks: 0,
            cvr: 0
          }
        })
        setAnalytics(initialAnalytics)
      }
    }

    initAnalytics()
  }, [])

  // Save analytics
  const saveAnalytics = (newAnalytics: Analytics) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnalytics))
    setAnalytics(newAnalytics)
  }

  // Multi-Armed Bandit Algorithm (ε-greedy)
  const selectVariant = (): PopupVariant => {
    const EPSILON = 0.2 // 20% exploration
    const MIN_VIEWS = 3

    // Exploration: Random selection
    if (Math.random() < EPSILON) {
      return VARIANTS[Math.floor(Math.random() * VARIANTS.length)]
    }

    // Exploitation: Best performing variant
    let bestVariant = VARIANTS[0]
    let bestCVR = 0
    let hasEnoughData = false

    VARIANTS.forEach(variant => {
      const stats = analytics.variants[variant.id]
      if (stats && stats.views >= MIN_VIEWS) {
        hasEnoughData = true
        const cvr = stats.views > 0 ? stats.clicks / stats.views : 0
        if (cvr > bestCVR) {
          bestCVR = cvr
          bestVariant = variant
        }
      }
    })

    // Not enough data? Explore randomly
    if (!hasEnoughData) {
      return VARIANTS[Math.floor(Math.random() * VARIANTS.length)]
    }

    return bestVariant
  }

  // Show popup
  useEffect(() => {
    // Check if already shown this session
    const hasShown = sessionStorage.getItem(POPUP_SHOWN_KEY)
    if (hasShown) return

    // Show after 3 seconds
    const timer = setTimeout(() => {
      const variant = selectVariant()
      setCurrentVariant(variant)
      setIsVisible(true)

      // Track view
      const newAnalytics = { ...analytics }
      if (!newAnalytics.variants[variant.id]) {
        newAnalytics.variants[variant.id] = { views: 0, clicks: 0, cvr: 0 }
      }
      newAnalytics.variants[variant.id].views++
      newAnalytics.totalViews++
      newAnalytics.testsRun++
      saveAnalytics(newAnalytics)

      // Mark as shown
      sessionStorage.setItem(POPUP_SHOWN_KEY, 'true')
    }, 3000)

    return () => clearTimeout(timer)
  }, []) // Only run once on mount

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const handleCTA = () => {
    // Track conversion
    if (currentVariant) {
      const newAnalytics = { ...analytics }
      newAnalytics.variants[currentVariant.id].clicks++
      newAnalytics.totalClicks++

      // Update CVR
      const stats = newAnalytics.variants[currentVariant.id]
      stats.cvr = (stats.clicks / stats.views) * 100

      saveAnalytics(newAnalytics)
    }

    // Redirect to Exness
    window.location.href = EXNESS_URL
  }

  if (!isVisible || !currentVariant) return null

  const variant = currentVariant
  const isGreenVariant = variant.id === 'green'

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`relative bg-gradient-to-br ${variant.gradient} rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-300 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 transition-colors text-white z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Icon with Animation */}
            <div className="text-center mb-6">
              <div className="inline-block text-7xl animate-bounce">
                {variant.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-3xl font-bold text-center mb-3 leading-tight ${variant.textColor}`}>
              {variant.title}
            </h3>

            {/* Subtitle */}
            <p className={`text-center mb-8 text-base ${variant.textColor} ${variant.id === 'blue' || variant.id === 'royal' || variant.id === 'red' ? 'opacity-95' : 'opacity-80'}`}>
              {variant.tagline}
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                <div className={`flex-shrink-0 w-12 h-12 ${
                  isGreenVariant ? 'bg-gradient-to-br from-emerald-600 to-emerald-800' : 'bg-gradient-to-br from-purple-600 to-purple-800'
                } rounded-full flex items-center justify-center text-white font-black text-xl`}>
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 mb-1 text-base">
                    Open Free Account (2 min)
                  </div>
                  <div className={`${isGreenVariant ? 'text-emerald-600' : 'text-green-600'} font-semibold text-sm`}>
                    🎁 Unlock: Welcome Bonus + Free Signals
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                <div className={`flex-shrink-0 w-12 h-12 ${
                  isGreenVariant ? 'bg-gradient-to-br from-emerald-600 to-emerald-800' : 'bg-gradient-to-br from-purple-600 to-purple-800'
                } rounded-full flex items-center justify-center text-white font-black text-xl`}>
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 mb-1 text-base">
                    Verify Your Account
                  </div>
                  <div className={`${isGreenVariant ? 'text-emerald-600' : 'text-green-600'} font-semibold text-sm`}>
                    🎁 Unlock: Premium Indicators + Analysis
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                <div className={`flex-shrink-0 w-12 h-12 ${
                  isGreenVariant ? 'bg-gradient-to-br from-emerald-600 to-emerald-800' : 'bg-gradient-to-br from-purple-600 to-purple-800'
                } rounded-full flex items-center justify-center text-white font-black text-xl`}>
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 mb-1 text-base">
                    Take Your First Trade
                  </div>
                  <div className={`${isGreenVariant ? 'text-emerald-600' : 'text-green-600'} font-semibold text-sm`}>
                    🎁 Unlock: VIP Community + Expert Support
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCTA}
              className={`w-full ${
                isGreenVariant
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-800 text-white'
                  : `bg-white ${variant.ctaColor}`
              } py-5 px-8 rounded-full font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200`}
            >
              START UNLOCKING REWARDS →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  )
}

// Analytics Dashboard Component (for testing/admin)
export function PopupAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const loadAnalytics = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setAnalytics(JSON.parse(saved))
      }
    }

    loadAnalytics()
    const interval = setInterval(loadAnalytics, 5000) // Update every 5s

    return () => clearInterval(interval)
  }, [])

  if (!analytics || !isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-[10000] text-sm font-semibold"
      >
        📊 View A/B Stats
      </button>
    )
  }

  const overallCVR = analytics.totalViews > 0
    ? ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1)
    : 0

  const sortedVariants = [...VARIANTS].sort((a, b) => {
    const aStats = analytics.variants[a.id] || { views: 0, clicks: 0, cvr: 0 }
    const bStats = analytics.variants[b.id] || { views: 0, clicks: 0, cvr: 0 }
    const aCVR = aStats.views > 0 ? aStats.clicks / aStats.views : 0
    const bCVR = bStats.views > 0 ? bStats.clicks / bStats.views : 0
    return bCVR - aCVR
  })

  return (
    <div className="fixed top-4 right-4 bg-white rounded-2xl shadow-2xl p-6 z-[10000] max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">🎯 A/B Test Stats</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{analytics.totalViews}</div>
          <div className="text-xs text-gray-600">Views</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{analytics.totalClicks}</div>
          <div className="text-xs text-gray-600">Clicks</div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-3 text-center mb-4">
        <div className="text-3xl font-bold text-green-600">{overallCVR}%</div>
        <div className="text-xs text-gray-600">Conversion Rate</div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {sortedVariants.map((variant, index) => {
          const stats = analytics.variants[variant.id] || { views: 0, clicks: 0, cvr: 0 }
          const cvr = stats.views > 0 ? ((stats.clicks / stats.views) * 100).toFixed(1) : 0
          const isWinner = index === 0 && stats.views >= 5 && stats.clicks > 0

          return (
            <div
              key={variant.id}
              className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                isWinner ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{variant.icon}</span>
                <span className={isWinner ? 'font-bold' : ''}>{variant.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{stats.clicks}/{stats.views}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isWinner ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {cvr}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}