'use client'
import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signup' | 'login'
  redirectAfterLogin?: string
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = 'signup',
  redirectAfterLogin
}: AuthModalProps) {
  const [mode, setMode] = useState<'signup' | 'login'>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup, login } = useUser()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        await signup(email, password, fullName)
      } else {
        await login(email, password)
      }

      // Success! Redirect or close
      if (redirectAfterLogin) {
        window.location.href = redirectAfterLogin
      } else {
        onClose()
        window.location.reload() // Refresh to show updated content
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {mode === 'signup' ? '🎉 Create Free Account' : '👋 Welcome Back'}
        </h2>

        {mode === 'signup' && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Free Account Includes:</p>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>✅ 3 Free Trading Signals</li>
              <li>✅ 3 Free Market Articles</li>
              <li>✅ Basic Trading Tips</li>
            </ul>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ahmed Al-Mansoori"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Please wait...' : (mode === 'signup' ? 'Create Account' : 'Login')}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-blue-600 font-medium hover:underline"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up free
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
