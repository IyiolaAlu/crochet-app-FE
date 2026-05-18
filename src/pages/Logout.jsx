import React from 'react'
import { useNavigate } from 'react-router-dom'
import { productContext } from '../context/ContextPage'
import { useContext } from 'react'

const Logout = () => {
  const { setuser, setIsLoggedIn } = useContext(productContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setuser(null)
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <button className='btn auth-btn' onClick={handleLogout}>Logout</button>
  )
}

export default Logout