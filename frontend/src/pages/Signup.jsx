import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, saveAuth } from '../api/auth.js'
import AuthLayout from '../components/AuthLayout.jsx'

export default function Signup({ onAuth }) {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
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
      const data = await register({ name, dob, email, password })
      if (data.token && data.user) {
        saveAuth({ token: data.token, user: data.user })
        onAuth && onAuth(data.user)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      tabLabel="SIGN UP"
      variant="signup"
      footer={<span>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></span>}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-input">
          <span className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.9 0 5.25-2.582 5.25-5.75S14.9.5 12 .5 6.75 3.082 6.75 6.25 9.1 12 12 12Z" opacity="0.85" />
              <path d="M4 19.75c0-3.174 3.029-5.75 8-5.75s8 2.576 8 5.75C20 21.545 19.036 22.5 17.23 22.5H6.77C4.964 22.5 4 21.545 4 19.75Z" opacity="0.45" />
            </svg>
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <label className="auth-input">
          <span className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.75 4.5A2.75 2.75 0 0 1 7.5 1.75h9A2.75 2.75 0 0 1 19.25 4.5v1.25H4.75Z" opacity="0.35" />
              <rect x="3.25" y="5.75" width="17.5" height="14.5" rx="2.5" />
              <path d="M16 11h2" stroke="#36eff2" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M6 11h2" stroke="#36eff2" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <input
            required
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Date of Birth"
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
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
            placeholder="Email address"
            type="email"
            autoComplete="email"
          />
        </label>
        <label className="auth-input">
          <span className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10V8.25C7 4.798 9.686 2 12 2s5 2.798 5 6.25V10" opacity="0.35" />
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
            autoComplete="new-password"
          />
        </label>
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
        </button>
        {error && <div className="text-center text-red-300 text-sm">{error}</div>}
      </form>
    </AuthLayout>
  )
}
