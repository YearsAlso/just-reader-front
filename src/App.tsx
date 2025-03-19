import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import Login from './pages/Login/index.tsx'
import LayoutWrapper from './layout/index.tsx'
import ConnectionStatusPage from './pages/Result/ConnectionStatus/index.tsx'
import RegisterPage from './pages/Register'

function App() {
  const token = localStorage.getItem('authToken')
  const authenticated = localStorage.getItem('authenticated')
  const currentLocation = window.location.pathname

  const getElement = () => {
    return token && authenticated === 'true' ? (
      <ProtectedRoute>
        <LayoutWrapper />
      </ProtectedRoute>
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/connection-status" element={<ConnectionStatusPage />} />
      </Routes>
    </Router>
  )
}

export default App
