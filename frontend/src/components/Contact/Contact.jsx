import React from 'react'
import './Contact.css'
import { assets } from '../../assets/assets'
import { Toaster, toast } from 'react-hot-toast'

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.', {
      duration: 4000,
      position: 'top-center',
    });
    e.target.reset();
  };

  return (
    <div className='contact-us' id='contact-us'>
      <h2>Get in Touch</h2>
      <p className='subtitle'>We’re here to assist you with your food ordering needs!</p>
      <div className="contact-container">

        {/* Contact Info Section */}
        <div className="contact-info">
          <h3>Contact Details</h3>
          <p><strong>Phone:</strong> +91 123-456-7890</p>
          <p><strong>Email:</strong> support@flavorhub.com</p>
          <p><strong>Address:</strong> 123 Flavor Street, Foodie City, India</p>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.x} alt="X" className="social-icon" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.whatsapp} alt="Whatsapp" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.email} alt="Gmail" className="social-icon" />
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required aria-label="Name" />
            <input type="email" placeholder="Your Email" required aria-label="Email" />
            <textarea placeholder="Your Message" required aria-label="Message" rows="5"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default ContactUs