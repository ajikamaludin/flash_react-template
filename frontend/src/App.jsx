import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from './hooks/useAuth'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import Protected from './pages/Protected'
import Error from './pages/Error'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/login" exect={true} element={<Login />} />
          <Route path="/register" exect={true} element={<Register />} />
          <Route path="/" element={<Protected />}>
            <Route path="/" element={<Home />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
