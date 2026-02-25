import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[rgba(5,13,26,0.95)] backdrop-blur-xl border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="font-display text-2xl text-text tracking-wide">DOORSTEP AUTOWASH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-body text-sm text-text-muted hover:text-text transition-colors">Home</Link>
          <Link to="/services" className="font-body text-sm text-text-muted hover:text-text transition-colors">Services</Link>

          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/dashboard" className="font-body text-sm text-text-muted hover:text-text transition-colors">My Bookings</Link>
              <Link to="/book" className="shimmer bg-primary text-bg font-body font-semibold px-4 py-2 rounded-lg text-sm">
                Book Now
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin" className="font-body text-sm text-text-muted hover:text-text transition-colors">Dashboard</Link>
              <Link to="/admin/bookings" className="font-body text-sm text-text-muted hover:text-text transition-colors">Bookings</Link>
              <Link to="/admin/services" className="font-body text-sm text-text-muted hover:text-text transition-colors">Services</Link>
              <Link to="/admin/staff" className="font-body text-sm text-text-muted hover:text-text transition-colors">Staff</Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="font-body text-sm text-text-muted">{user.name}</span>
              <button onClick={handleLogout} className="font-body text-sm text-danger hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="font-body text-sm text-text-muted hover:text-text transition-colors">Login</Link>
              <Link to="/register" className="font-body text-sm border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-bg transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-text" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Home</Link>
          <Link to="/services" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Services</Link>
          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">My Bookings</Link>
              <Link to="/book" onClick={() => setMobileOpen(false)} className="font-body text-sm text-primary font-semibold">Book Now</Link>
            </>
          )}
          {isAdmin && (
            <>
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Dashboard</Link>
              <Link to="/admin/bookings" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Bookings</Link>
              <Link to="/admin/services" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Services</Link>
              <Link to="/admin/staff" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Staff</Link>
            </>
          )}
          {isAuthenticated ? (
            <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="font-body text-sm text-danger text-left">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="font-body text-sm text-text-muted">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="font-body text-sm text-primary">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
