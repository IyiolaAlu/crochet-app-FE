import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { productContext } from '../context/ContextPage';
import { useContext } from 'react';
import './Auth.css'

const Login = () => {
  const [error, seterror] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setform] = useState({ email: '', password: '' })
  const { userAuth } = useContext(productContext)

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email, password: form.password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      })
      const data = await res.json()
      if (!res.ok) { setLoading(false); seterror(data.errors) }
      if (res.ok) { setLoading(false); seterror(null) }
      if (data.user) {
        await userAuth()
        navigate('/product')
        setLoading(false)
        seterror(null)
      } else {
        navigate('/login')
      }
    } catch (error) {
      setLoading(false)
      seterror(error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="auth-brand">Fiks Crochet</h1>
        <p className="auth-brand-tagline">Curated pieces for the modern wardrobe.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          <form onSubmit={login} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                value={form.email}
                onChange={(e) => setform({ ...form, email: e.target.value })}
                type="email"
                className="auth-input"
                placeholder="name@example.com"
              />
              {error?.email && <p className="auth-error">{error.email}</p>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                value={form.password}
                onChange={(e) => setform({ ...form, password: e.target.value })}
                type="password"
                className="auth-input"
                placeholder="Enter your password"
              />
              {error?.password && <p className="auth-error">{error.password}</p>}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login