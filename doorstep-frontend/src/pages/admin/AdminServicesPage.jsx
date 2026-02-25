import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import AdminLayout from '../../components/AdminLayout'
import LoadingSpinner from '../../components/LoadingSpinner'

const emptyForm = { name: '', description: '', price: '', duration_minutes: '', is_active: true }

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchServices() }, [])

  function fetchServices() {
    setLoading(true)
    api.get('/api/services')
      .then(res => setServices(res.data.data || []))
      .finally(() => setLoading(false))
  }

  function openEdit(service) {
    setEditId(service.id)
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
      duration_minutes: service.duration_minutes,
      is_active: service.is_active,
    })
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
        await api.put(`/api/admin/services/${editId}`, form)
      } else {
        await api.post('/api/admin/services', form)
      }
      setShowForm(false)
      fetchServices()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save service.')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(service) {
    await api.put(`/api/admin/services/${service.id}`, { ...service, is_active: !service.is_active })
    fetchServices()
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this service?')) return
    await api.delete(`/api/admin/services/${id}`)
    fetchServices()
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl text-text">MANAGE SERVICES</h1>
          <button onClick={openNew} className="shimmer bg-primary text-bg font-body font-semibold px-4 py-2 rounded-lg text-sm">
            Add New Service
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="glassmorphism rounded-xl p-6 mb-8">
            <h2 className="font-display text-2xl text-text mb-4">{editId ? 'EDIT SERVICE' : 'NEW SERVICE'}</h2>
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
                <label className="font-body text-sm text-text-muted mb-1 block">Price (CAD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                  required
                />
              </div>
              <div>
                <label className="font-body text-sm text-text-muted mb-1 block">Duration (minutes)</label>
                <input
                  type="number"
                  value={form.duration_minutes}
                  onChange={e => setForm({ ...form, duration_minutes: e.target.value })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                  required
                />
              </div>
              <div>
                <label className="font-body text-sm text-text-muted mb-1 block">Active</label>
                <select
                  value={form.is_active ? 'true' : 'false'}
                  onChange={e => setForm({ ...form, is_active: e.target.value === 'true' })}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="font-body text-sm text-text-muted mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body resize-none"
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving} className="shimmer bg-primary text-bg font-body font-semibold px-6 py-2 rounded-lg disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-border text-text-muted font-body px-6 py-2 rounded-lg hover:text-text">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.id} className={`glassmorphism rounded-xl p-6 border-t-2 border-gold ${!s.is_active ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl text-text">{s.name}</h3>
                <span className="font-mono text-sm text-text-muted">{s.duration_minutes} min</span>
              </div>
              <p className="font-body text-text-muted text-sm mb-4">{s.description}</p>
              <p className="font-mono text-2xl text-gold mb-4">CAD ${Number(s.price).toFixed(2)}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="text-primary text-sm font-body hover:underline">Edit</button>
                <button onClick={() => toggleActive(s)} className="text-warning text-sm font-body hover:underline">
                  {s.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDelete(s.id)} className="text-danger text-sm font-body hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
