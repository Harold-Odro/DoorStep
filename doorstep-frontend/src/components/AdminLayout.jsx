import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { to: '/admin/services', label: 'Services', icon: '🚿' },
  { to: '/admin/staff', label: 'Staff', icon: '👥' },
]

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <aside className="fixed top-0 left-0 w-60 min-h-screen bg-surface border-r border-border pt-20 px-4">
        <h2 className="font-display text-xl text-primary mb-6 px-3">Admin Panel</h2>
        <nav className="flex flex-col gap-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors
                ${isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text hover:bg-surface-2'}`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 ml-60 p-8 pt-24 min-h-screen">
        {children}
      </main>
    </div>
  )
}
