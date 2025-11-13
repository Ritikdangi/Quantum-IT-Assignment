import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, saveAuth } from '../api/auth.js'
import AuthLayout from '../components/AuthLayout.jsx'

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login({ email, password })
      if (data.token && data.user) {
        saveAuth({ token: data.token, user: data.user })
        onAuth && onAuth(data.user)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      tabLabel="SIGN IN"
      footer={<span>Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign up</Link></span>}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-input">
          <span className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25Z" opacity="0.4" />
              <path d="M3.7 6.636 11.28 12.2a1.2 1.2 0 0 0 1.44 0l7.58-5.564" />
            </svg>
          </span>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username"
            type="email"
            autoComplete="email"
          />
        </label>
        <label className="auth-input">
          <span className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10V8.5a5 5 0 0 1 10 0V10" opacity="0.35" />
              <rect x="4.75" y="10" width="14.5" height="9.5" rx="2" />
              <path d="M12 14.25a1 1 0 1 1-1 0v-1.5a1 1 0 1 1 2 0Z" fill="#36eff2" opacity="0.9" />
            </svg>
          </span>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
          />
        </label>
        <div className="auth-remember">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#36eff2]" />
            Remember me
          </label>
          <a href="#" onClick={(e) => e.preventDefault()}>Forgot your password?</a>
        </div>
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Signing in...' : 'LOGIN'}
        </button>
        {error && <div className="text-center text-red-300 text-sm">{error}</div>}
      </form>
    </AuthLayout>
  )
}
