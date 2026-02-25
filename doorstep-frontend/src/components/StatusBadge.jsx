const statusStyles = {
  pending: 'bg-warning/20 text-warning animate-[pulse-glow_2s_ease-in-out_infinite]',
  confirmed: 'bg-primary/20 text-primary',
  completed: 'bg-success/20 text-success',
  cancelled: 'bg-danger/20 text-danger',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase ${statusStyles[status] || ''}`}>
      {status}
    </span>
  )
}
