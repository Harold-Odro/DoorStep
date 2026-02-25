import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function BookingCard({ booking }) {
  return (
    <div className="glassmorphism glow-hover rounded-xl p-5 flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl text-text">{booking.service?.name || 'Service'}</h3>
        <p className="font-body text-text-muted text-sm">
          {booking.booking_date} at {booking.booking_time}
        </p>
        <p className="font-body text-text-muted text-sm truncate max-w-xs">{booking.address}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <StatusBadge status={booking.status} />
        <Link
          to={`/bookings/${booking.id}`}
          className="text-primary text-sm font-body hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
