'use client'

import { useState, useEffect } from 'react'
import { X, Rocket } from 'lucide-react'

interface GamificationPopupProps {
  language?: 'en' | 'ar'
  onOpenAccount: () => void
  showDelay?: number
}

const translations = {
  en: {
    title: 'Start Trading in 3 Easy Steps',
    subtitle: 'Join thousands of traders who started their journey with us.',
    step1: {
      title: 'Open Account (2 min)',
      subtitle: 'Just $10 minimum • Instant verification'
    },
    step2: {
      title: 'Get Free Signals',
      subtitle: 'Access unlimited trading signals & analysis'
    },
    step3: {
      title: 'Start Trading',
      subtitle: 'Trade your first position in 5 minutes'
    },
    cta: 'Get Started Now (2 Min Setup)',
    socialProof: '12,547 traders started this way',
    riskWarning: 'CFDs are complex instruments. Consider your risk tolerance before trading.',
    close: 'Close'
  },
  ar: {
    title: 'ابدأ التداول في 3 خطوات سهلة',
    subtitle: 'انضم لآلاف المتداولين الذين بدأوا رحلتهم معنا.',
    step1: {
      title: 'افتح حساب (دقيقتان)',
      subtitle: 'فقط 10 دولار كحد أدنى • تحقق فوري'
    },
    step2: {
      title: 'احصل على إشارات مجانية',
      subtitle: 'الوصول غير المحدود لإشارات التداول والتحليل'
    },
    step3: {
      title: 'ابدأ التداول',
      subtitle: 'تداول أول مركز لك في 5 دقائق'
    },
    cta: 'ابدأ الآن (إعداد دقيقتين)',
    socialProof: '12,547 متداول بدأوا بهذه الطريقة',
    riskWarning: 'العقود مقابل الفروقات هي أدوات معقدة. ضع في اعتبارك تحمل المخاطر قبل التداول.',
    close: 'إغلاق'
  }
}

export function GamificationPopup({
  language = 'en',
  onOpenAccount,
  showDelay = 3000
}: GamificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const t = translations[language]
  const isRTL = language === 'ar'

  useEffect(() => {
    // Check if user has already seen this popup
    const hasSeenPopup = localStorage.getItem('gamification_popup_seen')

    if (hasSeenPopup) {
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, showDelay)

    return () => clearTimeout(timer)
  }, [showDelay])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem('gamification_popup_seen', 'true')
    }, 300)
  }

  const handleCTA = () => {
    localStorage.setItem('gamification_popup_seen', 'true')
    setIsVisible(false)
    onOpenAccount()
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div
          className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-300 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 z-10`}
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Rocket Icon with Pulse Animation */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse-slow">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 text-blue-600 leading-tight">
              {t.title}
            </h3>

            {/* Subtitle */}
            <p className="text-center text-gray-600 mb-8 text-sm">
              {t.subtitle}
            </p>

            {/* Steps */}
            <div className="space-y-3 mb-6">
              {/* Step 1 */}
              <div className="bg-blue-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 mb-0.5 text-base">
                      {t.step1.title}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {t.step1.subtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-blue-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 mb-0.5 text-base">
                      {t.step2.title}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {t.step2.subtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-blue-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 mb-0.5 text-base">
                      {t.step3.title}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {t.step3.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCTA}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mb-4"
            >
              ✨ {t.cta}
            </button>

            {/* Social Proof */}
            <p className="text-center text-gray-600 text-xs mb-4">
              {t.socialProof}
            </p>

            {/* Risk Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
              <span className="text-yellow-600 text-sm flex-shrink-0">⚠️</span>
              <p className="text-yellow-800 text-xs leading-relaxed">
                {t.riskWarning}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}