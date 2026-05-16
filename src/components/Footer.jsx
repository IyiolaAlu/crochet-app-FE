import React from 'react'
import { Link } from 'react-router-dom'
import './Footerr.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo">Fiks Crochet</h2>
          <p className="footer-tagline">Curated pieces for the modern wardrobe.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4 className="footer-col-title">Shop</h4>
            <ul>
              <li><Link to="/product">All Products</Link></li>
              {/* <li><Link to="/product">New Arrivals</Link></li>
              <li><Link to="/product">Bestsellers</Link></li>
              <li><Link to="/product">Limited Edition</Link></li> */}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Help</h4>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              
            </ul>
          </div>

          <div className="footer-col">
            {/* <h4 className="footer-col-title">Stay in touch</h4>
            <p className="footer-newsletter-text">Get the latest drops and offers.</p>
            <div className="footer-newsletter">
              <input type="email" placeholder="Your email" className="footer-input" />
              <button className="footer-subscribe-btn">Subscribe</button>
            </div> */}
            {/* <div className="footer-socials">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Pinterest</a>
            </div> */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Fiks Crochet. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer