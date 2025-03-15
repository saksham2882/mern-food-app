import React from 'react'
import './Header.css'

const Header = () => {
  const handleScrollToFoodDisplay = () => {
    const foodDisplaySection = document.getElementById('food-display');
    if (foodDisplaySection) {
      foodDisplaySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here... 😍</h2>
        <p>Get your food delivered at your doorstep.</p>
        <button onClick={handleScrollToFoodDisplay} aria-label="View Menu">
          View Menu
        </button>
      </div>
    </div>
  )
}

export default Header