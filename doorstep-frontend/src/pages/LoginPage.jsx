import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20" style={{ animation: 'fadeSlideUp 0.3s ease' }}>
      <div className="glassmorphism max-w-md w-full mx-auto p-10 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-text flex items-center justify-center gap-1">
            DOORSTEP AUTOWASH <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </h1>
          <h2 className="font-display text-4xl text-text mt-4">WELCOME BACK</h2>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-4 py-3 mb-6 font-body">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-body text-sm text-text-muted mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="font-body text-sm text-text-muted mb-1 block">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shimmer bg-primary text-bg font-body font-semibold px-6 py-3 rounded-lg mt-2 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 font-body text-text-muted text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
