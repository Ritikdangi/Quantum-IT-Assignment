import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { loadAuth, clearAuth } from './api/auth.js'

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { user } = loadAuth()
    if (user) setUser(user)
  }, [])

  function handleAuth(authUser) {
    setUser(authUser)
  }

  function handleLogout() {
    clearAuth()
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" replace /> : <Signup onAuth={handleAuth} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login onAuth={handleAuth} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
