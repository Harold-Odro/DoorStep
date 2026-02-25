import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import AdminLayout from '../../components/AdminLayout'
import StatusBadge from '../../components/StatusBadge'
import LoadingSpinner from '../../components/LoadingSpinner'

const FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']
const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [staff, setStaff] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
    api.get('/api/admin/staff').then(res => setStaff(res.data.data || []))
  }, [filter])

  function fetchBookings() {
    setLoading(true)
    const params = filter !== 'all' ? `?status=${filter}` : ''
    api.get(`/api/admin/bookings${params}`)
      .then(res => setBookings(res.data.data || []))
      .finally(() => setLoading(false))
  }

  async function updateBooking(id, data) {
    await api.put(`/api/admin/bookings/${id}`, data)
    fetchBookings()
  }

  const statusBorderColor = {
    pending: 'border-l-warning',
    confirmed: 'border-l-primary',
    completed: 'border-l-success',
    cancelled: 'border-l-danger',
  }

  return (
    <AdminLayout>
      <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
        <h1 className="font-display text-4xl text-text mb-8">MANAGE BOOKINGS</h1>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-body text-sm capitalize transition-colors
                ${filter === f ? 'bg-primary text-bg' : 'bg-surface-2 text-text-muted hover:text-text border border-border'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="glassmorphism rounded-xl overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">ID</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Customer</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Service</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Date & Time</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Address</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Status</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Staff</th>
                  <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className={`border-b border-border/50 border-l-4 hover:bg-surface-2/50 ${statusBorderColor[b.status] || ''}`}>
                    <td className="px-4 py-3 font-mono text-text-muted text-sm">#{b.id}</td>
                    <td className="px-4 py-3 font-body text-text text-sm">{b.user?.name || '—'}</td>
                    <td className="px-4 py-3 font-body text-text text-sm">{b.service?.name || '—'}</td>
                    <td className="px-4 py-3 font-body text-text-muted text-sm">{b.booking_date}<br/>{b.booking_time}</td>
                    <td className="px-4 py-3 font-body text-text-muted text-sm max-w-[200px] truncate">{b.address}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3">
                      <select
                        value={b.staff?.id || ''}
                        onChange={e => updateBooking(b.id, { staff_id: e.target.value || null })}
                        className="bg-surface-2 border border-border text-text rounded px-2 py-1 text-xs font-body outline-none"
                      >
                        <option value="">Unassigned</option>
                        {staff.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        onChange={e => updateBooking(b.id, { status: e.target.value })}
                        className="bg-surface-2 border border-border text-text rounded px-2 py-1 text-xs font-body outline-none"
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <p className="text-center py-10 font-body text-text-muted">No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
