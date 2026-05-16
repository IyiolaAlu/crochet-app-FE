import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import './Headerr.css'

const Header = () => {
  return (
    <> 
      <NavBar/>
      <div className='header-background'>
        <div className='header-message'>
          <p className='message-subtitle'>HANDCRAFTED WITH LOVE</p>
          <h1 className='message-title'>Crochet with warmth, <br/>worn with heart.</h1>
          <Link className="productBtn" to={'/product'}>SHOP THE COLLECTION</Link>
        </div>
      </div>
    </>
  )
}

export default Header