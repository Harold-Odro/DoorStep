import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/axios'
import AdminLayout from '../../components/AdminLayout'
import StatusBadge from '../../components/StatusBadge'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function AdminDashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/admin/dashboard')
      .then(res => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
        <h1 className="font-display text-4xl text-text mb-8">ADMIN DASHBOARD</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Bookings', value: data.total_bookings, color: 'text-primary' },
            { label: 'Pending', value: data.pending_count, color: 'text-warning' },
            { label: 'Revenue', value: `CAD $${Number(data.total_revenue).toFixed(2)}`, color: 'text-gold' },
            { label: 'Completed', value: data.completed_count, color: 'text-success' },
          ].map((s, i) => (
            <div key={i} className="glassmorphism rounded-xl p-6">
              <span className={`font-display text-3xl ${s.color}`}>{s.value}</span>
              <p className="font-body text-text-muted text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <h2 className="font-display text-2xl text-text mb-4">RECENT BOOKINGS</h2>
        <div className="glassmorphism rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Customer</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Service</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Date</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Status</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {(data.recent_bookings || []).map(b => (
                <tr key={b.id} className="border-b border-border/50 hover:bg-surface-2/50">
                  <td className="px-4 py-3 font-body text-text text-sm">{b.user?.name || '—'}</td>
                  <td className="px-4 py-3 font-body text-text text-sm">{b.service?.name || '—'}</td>
                  <td className="px-4 py-3 font-body text-text-muted text-sm">{b.booking_date}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3">
                    <Link to="/admin/bookings" className="text-primary text-sm font-body hover:underline">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
