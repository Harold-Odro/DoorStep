import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/axios'
import ServiceCard from '../components/ServiceCard'

function FloatingBubbles() {
  const bubbles = [
    { size: 6, left: '10%', delay: '0s', duration: '8s' },
    { size: 4, left: '25%', delay: '1s', duration: '10s' },
    { size: 8, left: '45%', delay: '2s', duration: '7s' },
    { size: 3, left: '65%', delay: '3s', duration: '12s' },
    { size: 5, left: '80%', delay: '4s', duration: '9s' },
    { size: 7, left: '90%', delay: '0.5s', duration: '11s' },
    { size: 4, left: '35%', delay: '2.5s', duration: '8.5s' },
  ]

  return (
    <>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/10 bottom-0"
          style={{
            width: `${b.size * 8}px`,
            height: `${b.size * 8}px`,
            left: b.left,
            animation: `bubble-float ${b.duration} ease-in infinite`,
            animationDelay: b.delay,
          }}
        />
      ))}
    </>
  )
}

export default function HomePage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    api.get('/api/services').then(res => setServices(res.data.data || []))
  }, [])

  return (
    <div style={{ animation: 'fadeSlideUp 0.3s ease' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-[#071535]" />
        <FloatingBubbles />
        <div className="relative z-10 px-6">
          <p className="text-primary font-body tracking-widest text-sm uppercase mb-4">
            British Columbia's #1 Mobile Car Wash
          </p>
          <h1 className="font-display text-[clamp(56px,10vw,96px)] text-text leading-none">
            WE COME TO YOU
          </h1>
          <p className="font-body text-xl text-text-muted max-w-xl mx-auto mt-4">
            Professional car wash and detailing services delivered right to your doorstep —
            anywhere in British Columbia. Book your slot in under 60 seconds.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link to="/book" className="shimmer bg-primary text-bg font-semibold px-8 py-4 rounded-lg text-lg inline-block">
              Book a Wash Now →
            </Link>
            <Link to="/services" className="text-primary underline font-body">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20 py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-gold">10% OFF</span>
            <span className="font-body text-text text-sm">for new customers on their first booking</span>
          </div>
          <span className="hidden md:block text-border">|</span>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-gold">15% OFF</span>
            <span className="font-body text-text text-sm">your next booking when you refer a friend</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface border-y border-border py-8">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { num: '500+', label: 'Washes Completed' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '✓', label: 'Same-Day Booking Available' },
          ].map((s, i) => (
            <div key={i}>
              <span className="font-display text-3xl text-primary">{s.num}</span>
              <p className="font-body text-text-muted text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-bg py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-4xl text-text text-center mb-4">OUR SERVICES</h2>
          <p className="font-body text-text-muted text-center max-w-2xl mx-auto mb-12">
            From a quick exterior rinse to a full premium detail —
            Doorstep Autowash Service has you covered across British Columbia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.slice(0, 4).map(s => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="text-primary font-body hover:underline text-lg">
              See All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-4xl text-text text-center mb-16">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Choose Your Service', desc: 'Pick from our range of wash and detailing packages.' },
              { num: '02', title: 'Pick a Date & Time', desc: 'Select a convenient slot and drop your address.' },
              { num: '03', title: 'We Come to You', desc: 'Our team arrives at your door, fully equipped.' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <span className="font-display text-6xl text-primary opacity-30">{step.num}</span>
                <h3 className="font-display text-2xl text-text mt-2">{step.title}</h3>
                <p className="font-body text-text-muted mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-accent to-primary py-20 text-center px-6">
        <h2 className="font-display text-5xl text-bg mb-4">READY FOR A CLEAN RIDE?</h2>
        <p className="font-body text-bg/80 text-lg mb-8">
          Book online in seconds. We bring everything to your door.
        </p>
        <Link to="/book" className="bg-bg text-text font-body font-semibold px-8 py-4 rounded-lg text-lg inline-block hover:bg-surface transition-colors">
          Book Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl text-text mb-2">DOORSTEP AUTOWASH</h3>
            <p className="font-body text-text-muted text-sm">Clean car. Zero effort.</p>
            <p className="font-body text-text-muted text-sm mt-1">British Columbia, Canada</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/" className="font-body text-text-muted text-sm hover:text-text">Home</Link>
            <Link to="/services" className="font-body text-text-muted text-sm hover:text-text">Services</Link>
            <Link to="/book" className="font-body text-text-muted text-sm hover:text-text">Book Now</Link>
            <Link to="/login" className="font-body text-text-muted text-sm hover:text-text">Login</Link>
          </div>
          <div>
            <p className="font-body text-text-muted text-sm">hello@doorstepauto.ca</p>
          </div>
        </div>
        <hr className="border-none h-px bg-gradient-to-r from-transparent via-primary to-transparent my-8" />
        <p className="text-center font-body text-text-muted text-xs">
          © 2025 Doorstep Autowash Service. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
