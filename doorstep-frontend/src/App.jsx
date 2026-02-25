import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import BookingDetailPage from './pages/BookingDetailPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminBookingsPage from './pages/admin/AdminBookingsPage'
import AdminServicesPage from './pages/admin/AdminServicesPage'
import AdminStaffPage from './pages/admin/AdminStaffPage'

export default function App() {
  return (
    <div className="min-h-screen bg-bg font-body text-text">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetailPage /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><AdminBookingsPage /></AdminRoute>} />
        <Route path="/admin/services" element={<AdminRoute><AdminServicesPage /></AdminRoute>} />
        <Route path="/admin/staff" element={<AdminRoute><AdminStaffPage /></AdminRoute>} />
      </Routes>
    </div>
  )
}
