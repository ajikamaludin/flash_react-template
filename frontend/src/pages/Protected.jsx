import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute() {
  const { user } = useAuth()

  console.log(`ProtectedPage :` + user)

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />
  }

  return <Outlet />
}
