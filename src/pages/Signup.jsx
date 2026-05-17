import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import './Auth.css'

const Signup = () => {
  const [error, seterror] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setform] = useState({
    firstName: '', lastName: '', email: '', password: ''
  })

  const signUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://crochet-app-backend.onrender.com/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          firstName: form.firstName, lastName: form.lastName,
          email: form.email, password: form.password
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      })
      const data = await res.json()
      if (!res.ok) { setLoading(false); seterror(data.errors) }
      if (data.user) { navigate('/product'); setLoading(false); seterror(null) }
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
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us today</p>

          <form onSubmit={signUp} className="auth-form">
            <div className="auth-row">
              <div className="auth-field">
                <label className="auth-label">First Name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => setform({ ...form, firstName: e.target.value })}
                  type="text" className="auth-input" placeholder="John"
                />
                {error?.firstName && <p className="auth-error">{error.firstName}</p>}
              </div>
              <div className="auth-field">
                <label className="auth-label">Last Name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => setform({ ...form, lastName: e.target.value })}
                  type="text" className="auth-input" placeholder="Doe"
                />
                {error?.lastName && <p className="auth-error">{error.lastName}</p>}
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                value={form.email}
                onChange={(e) => setform({ ...form, email: e.target.value })}
                type="email" className="auth-input" placeholder="name@example.com"
              />
              {error?.email && <p className="auth-error">{error.email}</p>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                value={form.password}
                onChange={(e) => setform({ ...form, password: e.target.value })}
                type="password" className="auth-input" placeholder="At least 6 characters"
              />
              {error?.password && <p className="auth-error">{error.password}</p>}
              <p className="auth-hint">Must be at least 6 characters</p>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup