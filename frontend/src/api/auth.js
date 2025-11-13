const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export async function register({ name, dob, email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dob, email, password }),
  })
  return res.json()
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export function saveAuth({ token, user }) {
  if (token) localStorage.setItem('token', token)
  if (user) localStorage.setItem('user', JSON.stringify(user))
}

export function loadAuth() {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  return { token, user: userStr ? JSON.parse(userStr) : null }
}

export function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
