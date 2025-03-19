import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext)

  if (loading) {
    return (
      <div className="food-display" id="food-display">
        <h2>Featured Dishes</h2>
        <div className="food-display-list skeleton-food-list">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="skeleton-food-item">
              <div className="skeleton-food-image"></div>
              <div className="skeleton-food-info">
                <div className="skeleton-food-name"></div>
                <div className="skeleton-food-desc"></div>
                <div className="skeleton-food-price"></div>
                <div className="skeleton-food-counter"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Featured Dishes</h2>

      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            )
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay