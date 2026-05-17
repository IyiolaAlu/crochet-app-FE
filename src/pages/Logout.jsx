import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { productContext } from '../context/ContextPage';
import { useContext } from 'react';

const Logout = () => {
      const {  userAuth } = useContext(productContext)
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await axios.post('https://crochet-app-backend.onrender.com/api/users/logout',{},{
                withCredentials: true
            })
            if (res.data) {
               alert(res.data.message)
               userAuth()
                navigate('/product')
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }

  return (
    <>
    <button className='btn auth-btn' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout