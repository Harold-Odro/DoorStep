import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.password_confirmation)
      navigate('/dashboard')
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ general: [err.response?.data?.message || 'Registration failed.'] })
      }
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
          <h2 className="font-display text-4xl text-text mt-4">CREATE ACCOUNT</h2>
        </div>

        {errors.general && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-4 py-3 mb-6 font-body">
            {errors.general[0]}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-body text-sm text-text-muted mb-1 block">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
              placeholder="Alex Johnson"
              required
            />
            {errors.name && <p className="text-danger text-xs mt-1 font-body">{errors.name[0]}</p>}
          </div>
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
            {errors.email && <p className="text-danger text-xs mt-1 font-body">{errors.email[0]}</p>}
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
            {errors.password && <p className="text-danger text-xs mt-1 font-body">{errors.password[0]}</p>}
          </div>
          <div>
            <label className="font-body text-sm text-text-muted mb-1 block">Confirm Password</label>
            <input
              type="password"
              value={form.password_confirmation}
              onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 font-body text-text-muted text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
