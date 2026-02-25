import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import AdminLayout from '../../components/AdminLayout'
import LoadingSpinner from '../../components/LoadingSpinner'

const emptyForm = { name: '', email: '', phone: '', is_active: true }

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchStaff() }, [])

  function fetchStaff() {
    setLoading(true)
    api.get('/api/admin/staff')
      .then(res => setStaff(res.data.data || []))
      .finally(() => setLoading(false))
  }

  function openEdit(member) {
    setEditId(member.id)
    setForm({ name: member.name, email: member.email, phone: member.phone, is_active: member.is_active })
    setShowForm(true)
  }

  function openNew() {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editId) {
        await api.put(`/api/admin/staff/${editId}`, form)
      } else {
        await api.post('/api/admin/staff', form)
      }
      setShowForm(false)
      fetchStaff()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save staff member.')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(member) {
    await api.put(`/api/admin/staff/${member.id}`, { is_active: !member.is_active })
    fetchStaff()
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return
    await api.delete(`/api/admin/staff/${id}`)
    fetchStaff()
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl text-text">MANAGE STAFF</h1>
          <button onClick={openNew} className="shimmer bg-primary text-bg font-body font-semibold px-4 py-2 rounded-lg text-sm">
            Add Staff Member
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="glassmorphism rounded-xl p-6 mb-8">
            <h2 className="font-display text-2xl text-text mb-4">{editId ? 'EDIT STAFF' : 'NEW STAFF MEMBER'}</h2>
            {error && <p className="text-danger text-sm font-body mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm text-text-muted mb-1 block">Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                  required
                />
              </div>
              <div>
                <label className="font-body text-sm text-text-muted mb-1 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                  required
                />
              </div>
              <div>
                <label className="font-body text-sm text-text-muted mb-1 block">Phone</label>
                <input
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                  placeholder="604-555-0100"
                  required
                />
              </div>
              <div>
                <label className="font-body text-sm text-text-muted mb-1 block">Status</label>
                <select
                  value={form.is_active ? 'true' : 'false'}
                  onChange={e => setForm({ ...form, is_active: e.target.value === 'true' })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving} className="shimmer bg-primary text-bg font-body font-semibold px-6 py-2 rounded-lg disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Staff Member'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-border text-text-muted font-body px-6 py-2 rounded-lg hover:text-text">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Staff Table */}
        <div className="glassmorphism rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Name</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Email</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Phone</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Status</th>
                <th className="text-left font-body text-text-muted text-xs uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(m => (
                <tr key={m.id} className="border-b border-border/50 hover:bg-surface-2/50">
                  <td className="px-4 py-3 font-body text-text text-sm">{m.name}</td>
                  <td className="px-4 py-3 font-body text-text-muted text-sm">{m.email}</td>
                  <td className="px-4 py-3 font-mono text-text-muted text-sm">{m.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-mono ${m.is_active ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                      {m.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button onClick={() => openEdit(m)} className="text-primary text-sm font-body hover:underline">Edit</button>
                    <button onClick={() => toggleActive(m)} className="text-warning text-sm font-body hover:underline">
                      {m.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="text-danger text-sm font-body hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {staff.length === 0 && (
            <p className="text-center py-10 font-body text-text-muted">No staff members found.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
