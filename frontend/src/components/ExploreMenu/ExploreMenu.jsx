import React from 'react'
import './ExploreMenu.css'
import { menu_list_1, menu_list_2 } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Discover Our Delicious Offerings</h1>
      
      <p className='explore-menu-text'>
        Dive into a world of flavors with our carefully crafted dishes, perfect for every taste and occasion.
      </p>
      
      <div className="explore-menu-list">
        {menu_list_1.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>

      <div className="explore-menu-list">
        {menu_list_2.map((item, index) => { 
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu