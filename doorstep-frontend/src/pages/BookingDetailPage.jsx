import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../lib/axios'
import StatusBadge from '../components/StatusBadge'
import LoadingSpinner from '../components/LoadingSpinner'

const statusOrder = ['pending', 'confirmed', 'completed']

export default function BookingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    api.get(`/api/bookings/${id}`)
      .then(res => setBooking(res.data.data || res.data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  async function handleCancel() {
    setCancelling(true)
    try {
      const res = await api.put(`/api/bookings/${id}/cancel`)
      setBooking(res.data.data || res.data)
      setShowConfirm(false)
    } catch {
      // ignore
    } finally {
      setCancelling(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (!booking) return null

  const canCancel = booking.status === 'pending' || booking.status === 'confirmed'
  const currentStatusIdx = statusOrder.indexOf(booking.status)

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ animation: 'fadeSlideUp 0.3s ease' }}>
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="font-body text-text-muted hover:text-text mb-6 inline-block">
          ← Back to Dashboard
        </button>

        <div className="glassmorphism rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="font-display text-3xl text-text">{booking.service?.name}</h1>
            <StatusBadge status={booking.status} />
          </div>

          {/* Status Timeline */}
          {booking.status !== 'cancelled' && (
            <div className="flex items-center gap-0 mb-8">
              {statusOrder.map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono
                      ${i <= currentStatusIdx ? 'bg-primary text-bg' : 'bg-surface-2 border border-border text-text-muted'}`}>
                      {i <= currentStatusIdx ? '✓' : i + 1}
                    </div>
                    <span className="text-xs mt-1 font-body text-text-muted capitalize">{s}</span>
                  </div>
                  {i < statusOrder.length - 1 && (
                    <div className={`w-12 h-0.5 mx-1 mb-5 ${i < currentStatusIdx ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-3">
              <span className="font-body text-text-muted">Date</span>
              <span className="font-body text-text">{booking.booking_date}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="font-body text-text-muted">Time</span>
              <span className="font-body text-text">{booking.booking_time}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="font-body text-text-muted">Address</span>
              <span className="font-body text-text text-right max-w-xs">{booking.address}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="font-body text-text-muted">Price</span>
              <span className="font-mono text-gold text-xl">CAD ${Number(booking.service?.price).toFixed(2)}</span>
            </div>
            {booking.staff && (
              <div className="flex justify-between border-b border-border pb-3">
                <span className="font-body text-text-muted">Assigned Staff</span>
                <span className="font-body text-text">{booking.staff.name}</span>
              </div>
            )}
            {booking.notes && (
              <div className="flex justify-between">
                <span className="font-body text-text-muted">Notes</span>
                <span className="font-body text-text text-right max-w-xs">{booking.notes}</span>
              </div>
            )}
          </div>

          {/* Cancel Button */}
          {canCancel && (
            <div className="mt-8 pt-6 border-t border-border">
              {showConfirm ? (
                <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
                  <p className="font-body text-danger text-sm mb-3">Are you sure you want to cancel this booking?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="bg-danger text-white font-body font-semibold px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                    >
                      {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="border border-border text-text-muted font-body px-4 py-2 rounded-lg text-sm hover:text-text"
                    >
                      No, Keep It
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="border border-danger text-danger font-body px-4 py-2 rounded-lg text-sm hover:bg-danger/10"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
