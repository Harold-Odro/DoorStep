import { useNavigate } from 'react-router-dom'

export default function ServiceCard({ service, selectable, selected, onSelect, showCta = true }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={selectable ? () => onSelect(service.id) : undefined}
      className={`glassmorphism glow-hover rounded-2xl p-6 flex flex-col gap-4 border-t-2 border-gold transition-all
        ${selectable ? 'cursor-pointer' : ''}
        ${selected ? 'border-2 !border-primary ring-1 ring-primary/30' : ''}`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-bg text-xs font-bold">
          ✓
        </div>
      )}
      <div className="flex items-start justify-between">
        <h3 className="font-display text-2xl text-text">{service.name}</h3>
        <span className="font-mono text-sm text-text-muted border border-border px-2 py-1 rounded-full">
          {service.duration_minutes} min
        </span>
      </div>
      <p className="font-body text-text-muted text-sm flex-1">{service.description}</p>
      <div className="flex items-end justify-between mt-auto">
        <span className="font-mono text-3xl text-gold">CAD ${Number(service.price).toFixed(2)}</span>
        {showCta && !selectable && (
          <button
            onClick={() => navigate(`/book?service=${service.id}`)}
            className="shimmer bg-primary text-bg font-body font-semibold px-4 py-2 rounded-lg text-sm"
          >
            Book This Service →
          </button>
        )}
      </div>
    </div>
  )
}
