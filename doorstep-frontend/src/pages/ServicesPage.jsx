import { useState, useEffect } from 'react'
import api from '../lib/axios'
import ServiceCard from '../components/ServiceCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/services')
      .then(res => setServices(res.data.data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
      <section className="bg-surface py-20 pt-28 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="font-display text-5xl text-text mb-4">OUR SERVICES</h1>
          <p className="font-body text-text-muted max-w-xl mx-auto">
            Professional mobile car wash and detailing — delivered to your doorstep anywhere in British Columbia.
          </p>
        </div>
      </section>

      <section className="bg-bg py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {services.map(s => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
