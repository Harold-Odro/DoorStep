import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../lib/axios'
import ServiceCard from '../components/ServiceCard'
import StepIndicator from '../components/StepIndicator'
import LoadingSpinner from '../components/LoadingSpinner'

const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/api/services').then(res => {
      const data = res.data.data || []
      setServices(data)
      const preselect = searchParams.get('service')
      if (preselect) setSelectedService(Number(preselect))
    }).finally(() => setLoading(false))
  }, [searchParams])

  const today = new Date().toISOString().split('T')[0]
  const selectedServiceObj = services.find(s => s.id === selectedService)

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    try {
      const res = await api.post('/api/bookings', {
        service_id: selectedService,
        booking_date: bookingDate,
        booking_time: bookingTime,
        address,
        notes: notes || null,
      })
      setSuccess(res.data.data || res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20" style={{ animation: 'fadeSlideUp 0.3s ease' }}>
        <div className="glassmorphism max-w-lg w-full p-10 rounded-2xl text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-display text-4xl text-text mb-2">BOOKING CONFIRMED!</h2>
          <p className="font-body text-text-muted mb-6">Your wash has been booked successfully.</p>
          <div className="bg-surface-2 rounded-xl p-6 border border-border text-left mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-body text-text-muted text-sm">Service</span>
              <span className="font-body text-text text-sm">{success.service?.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-text-muted text-sm">Date</span>
              <span className="font-body text-text text-sm">{success.booking_date}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-text-muted text-sm">Time</span>
              <span className="font-body text-text text-sm">{success.booking_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-text-muted text-sm">Price</span>
              <span className="font-mono text-gold text-sm">CAD ${Number(success.service?.price).toFixed(2)}</span>
            </div>
          </div>
          <Link to="/dashboard" className="shimmer bg-primary text-bg font-body font-semibold px-6 py-3 rounded-lg inline-block">
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ animation: 'fadeSlideUp 0.3s ease' }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl text-text text-center mb-8">BOOK A WASH</h1>
        <StepIndicator steps={['Choose Service', 'Date & Time', 'Your Details']} currentStep={step} />

        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-4 py-3 mb-6 font-body">
            {error}
          </div>
        )}

        {/* Step 1: Choose Service */}
        {step === 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  selectable
                  selected={selectedService === s.id}
                  onSelect={setSelectedService}
                  showCta={false}
                />
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(1)}
                disabled={!selectedService}
                className="shimmer bg-primary text-bg font-body font-semibold px-6 py-3 rounded-lg disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 1 && (
          <div>
            <div className="glassmorphism rounded-2xl p-6 mb-6">
              <label className="font-body text-sm text-text-muted mb-2 block">Select Date</label>
              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={e => setBookingDate(e.target.value)}
                className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body"
              />
            </div>
            <div className="glassmorphism rounded-2xl p-6">
              <label className="font-body text-sm text-text-muted mb-3 block">Select Time</label>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    onClick={() => setBookingTime(t)}
                    className={`px-4 py-2 rounded-full border font-mono text-sm transition-colors
                      ${bookingTime === t
                        ? 'bg-primary text-bg border-primary'
                        : 'border-border text-text-muted hover:border-primary hover:text-primary'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(0)} className="font-body text-text-muted hover:text-text px-6 py-3">
                ← Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!bookingDate || !bookingTime}
                className="shimmer bg-primary text-bg font-body font-semibold px-6 py-3 rounded-lg disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details & Confirm */}
        {step === 2 && (
          <div>
            <div className="glassmorphism rounded-2xl p-6 mb-6">
              <label className="font-body text-sm text-text-muted mb-2 block">Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. 123 Granville Street, Vancouver, BC V6C 1T2"
                rows={3}
                className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body resize-none"
                required
              />
            </div>
            <div className="glassmorphism rounded-2xl p-6 mb-6">
              <label className="font-body text-sm text-text-muted mb-2 block">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any special instructions? (e.g. gate code, parking notes, dog in yard)"
                rows={2}
                className="bg-surface-2 border border-border text-text rounded-lg px-4 py-3 w-full focus:border-primary outline-none font-body resize-none"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-surface-2 rounded-xl p-6 border border-border mb-6">
              <h3 className="font-display text-xl text-text mb-4">BOOKING SUMMARY</h3>
              <div className="flex justify-between mb-2">
                <span className="font-body text-text-muted text-sm">Service</span>
                <span className="font-body text-text text-sm">{selectedServiceObj?.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-body text-text-muted text-sm">Date</span>
                <span className="font-body text-text text-sm">{bookingDate}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-body text-text-muted text-sm">Time</span>
                <span className="font-body text-text text-sm">{bookingTime}</span>
              </div>
              <hr className="border-border my-3" />
              <div className="flex justify-between">
                <span className="font-body text-text font-semibold">Total</span>
                <span className="font-mono text-2xl text-gold">CAD ${Number(selectedServiceObj?.price).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="font-body text-text-muted hover:text-text px-6 py-3">
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!address || submitting}
                className="shimmer bg-primary text-bg font-body font-semibold px-8 py-3 rounded-lg disabled:opacity-50"
              >
                {submitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
