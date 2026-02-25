import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../lib/axios'
import BookingCard from '../components/BookingCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function DashboardPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/bookings')
      .then(res => setBookings(res.data.data || []))
      .finally(() => setLoading(false))
  }, [])

  const upcoming = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed')
    .sort((a, b) => a.booking_date.localeCompare(b.booking_date))
  const history = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ animation: 'fadeSlideUp 0.3s ease' }}>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-display text-4xl text-text mb-8">WELCOME BACK, {user?.name?.toUpperCase()}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Total Bookings', value: bookings.length },
            { label: 'Upcoming', value: upcoming.length },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length },
          ].map((s, i) => (
            <div key={i} className="glassmorphism rounded-xl p-6 text-center">
              <span className="font-display text-3xl text-primary">{s.value}</span>
              <p className="font-body text-text-muted text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-text">UPCOMING APPOINTMENTS</h2>
            <Link to="/book" className="shimmer bg-primary text-bg font-body font-semibold px-4 py-2 rounded-lg text-sm">
              Book New Wash
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="glassmorphism rounded-xl p-10 text-center">
              <p className="font-body text-text-muted">No upcoming appointments. Book a wash to get started!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {upcoming.map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
          )}
        </section>

        {/* History */}
        <section>
          <h2 className="font-display text-2xl text-text mb-6">BOOKING HISTORY</h2>
          {history.length === 0 ? (
            <div className="glassmorphism rounded-xl p-10 text-center">
              <p className="font-body text-text-muted">No booking history yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
