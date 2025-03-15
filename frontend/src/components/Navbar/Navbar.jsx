import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-hot-toast'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully", {
      duration: 4000,
      position: 'top-center',
    });
    navigate("/");
  }

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={"/food logo (4).png"} alt="" className="logo" /></Link>

      <ul className='navbar-menu'>
        <li><Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link></li>
        <li><a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
        <li><a href='#food-display' onClick={() => setMenu("food-display")} className={menu === "food-display" ? "active" : ""}>Top Dishes</a></li>
        <li><a href='#features' onClick={() => setMenu("features")} className={menu === "features" ? "active" : ""}>Features</a></li>
        <li><a href='#contact-us' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a></li>
      </ul>

      <div className="navbar-right">
        {token && (
          <button className="orders-btn" onClick={() => navigate('/myorders')}>
            <img src={assets.bag_icon} alt="" /> Orders
          </button>
        )}
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button className="sign-in-btn" onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <button className="logout-btn" onClick={logout}>
              <img src={assets.logout_icon} alt="" /> Logout
            </button>
          </div>
        )}

        <div className={`hamburger ${mobileMenuOpen ? 'hidden' : ''}`} onClick={() => setMobileMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="close-btn" onClick={() => setMobileMenuOpen(false)}>×</div>
        <ul>
          <li><Link to='/' onClick={() => handleMenuClick("Home")} className={menu === "Home" ? "active" : ""}>Home</Link></li>
          <li><a href='#explore-menu' onClick={() => handleMenuClick("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
          <li><a href='#food-display' onClick={() => handleMenuClick("food-display")} className={menu === "food-display" ? "active" : ""}>Top Dishes</a></li>
          <li><a href='#features' onClick={() => handleMenuClick("features")} className={menu === "features" ? "active" : ""}>Features</a></li>
          <li><a href='#contact-us' onClick={() => handleMenuClick("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a></li>
        </ul>
        {token && (
          <button className="mobile-logout-btn" onClick={logout}>
            <img src={assets.logout_icon} alt="" /> Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar