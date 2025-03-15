import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Toaster, toast } from 'react-hot-toast'

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing!', {
      duration: 4000,
      position: 'top-center',
    });
    e.target.reset();
  };

  return (
    <div className='footer' id='footer'>
      <div className="footer-top">

        {/* Left Section */}
        <div className="footer-left">
          <img src={'/food logo (4).png'} alt="FlavorHub Logo" className="footer-logo" />
          <div className="footer-contact">
            <p><a href="tel:+919876543210">+91-9876543210</a></p>
            <p><a href="mailto:contact@flavorhub.com">contact@flavorhub.com</a></p>
          </div>

          <p>Bringing delicious meals to your table with speed and quality.</p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.x} alt="x" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.whatsapp} alt="whatsapp" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram} alt="instagram" />
            </a>
            <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.email} alt="email" />
            </a>
            
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h3>Stay Connected</h3>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input type="email" placeholder="Your Email" required aria-label="Email for newsletter" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#delivery">Delivery</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
        </ul>
        <p className="footer-copyright">
          copyright &copy; {new Date().getFullYear()}, FlavorHub. All rights reserved.
        </p>
      </div>
      {/* <Toaster /> */}
    </div>
  )
}

export default Footer