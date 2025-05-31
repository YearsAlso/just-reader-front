import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.less'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import Login from './pages/auth/index.tsx'
import LayoutWrapper from './layout/index.tsx'

function App() {
  const token = localStorage.getItem('authToken')
  const authenticated = localStorage.getItem('authenticated')
  const currentLocation = window.location.pathname

  const getElement = () => {
    return token && authenticated === 'true' ? (
      currentLocation === '/register' || currentLocation === '/login' ? (
        <Navigate to="/" />
      ) : (
        <ProtectedRoute>
          <LayoutWrapper />
        </ProtectedRoute>
      )
    ) : currentLocation === '/register' ? (
      <Navigate to="/register" />
    ) : (
      <Navigate to="/login" />
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={getElement()} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
