import React from 'react'
import './Features.css'
import { assets } from '../../assets/assets'

const Features = () => {
  const features = [
    {
      image: assets['delivery_boy'],
      title: 'Lightning-Fast Delivery',
      description: 'Enjoy your meals delivered to your door in record time with our efficient delivery team.'
    },
    {
      image: assets['spices'],
      title: 'Premium Quality Spices',
      description: 'Savor the flavor with our hand-selected, top-tier spices sourced from the finest regions.'
    },
    {
      image: assets['vegetables_fresh'],
      title: 'Freshly Chopped Vegetables',
      description: 'Every dish is crafted with crisp, freshly cut vegetables for maximum taste and nutrition.'
    },
    {
      image: assets['real_time_tracking'],
      title: 'Real-Time Tracking',
      description: 'Track your order live on the map, ensuring you know exactly when it’ll arrive.'
    },
    {
      image: assets['customer_review'],
      title: 'Top Customer Reviews',
      description: 'Join thousands of satisfied customers who rave about our exceptional service and food.'
    },
    {
      image: assets['eco_friendly'],
      title: 'Eco-Friendly Packaging',
      description: 'We use sustainable, biodegradable packaging to keep your food fresh and the planet green.'
    }
  ];

  return (
    <div className='app-features' id='features'>
      <h2>Why Choose Us?</h2>
      
      <div className="features-list">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-item ${index % 2 === 0 ? 'image-left' : 'image-right'}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="feature-image">
              <img src={feature.image} alt={feature.title} />
            </div>
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div> 
  )
}

export default Features