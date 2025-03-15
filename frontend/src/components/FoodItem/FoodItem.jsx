import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  const originalPrice = price / 0.8;
  const discountPercent = 20;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className='food-item-desc'>{description}</p>

        <div className="food-item-price-container">
          <p className='food-item-price'>
            ₹{price} <span className="original-price">₹{originalPrice.toFixed(0)}</span>
            <span className="discount-tag">{discountPercent}% OFF</span>
          </p>
        </div>
        <p className='food-item-serving'>Serves 2 persons</p>

        <div className="food-item-counter-container">
          {!cartItems[id] ? (
            <button className='add-btn' onClick={() => addToCart(id)} aria-label="Add item to cart">
              Add
            </button>
          ) : (
            <div className='food-item-counter'>
              <button className='remove-btn' onClick={() => removeFromCart(id)} aria-label="Remove one item">
                Remove
              </button>
              <p>{cartItems[id]}</p>
              <button className='add-more-btn' onClick={() => addToCart(id)} aria-label="Add one more item">
                More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodItem