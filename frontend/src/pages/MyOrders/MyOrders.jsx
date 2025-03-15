import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-container">
          {data.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <img src={assets.parcel_icon} alt="Parcel Icon" className="parcel-icon" />
                <div className="order-summary">
                  <ul className="order-items">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="order-amount">₹{order.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="order-details">
                <p className="order-items-count">Items: {order.items.length}</p>
                <p className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                  <span className="status-dot"></span> {order.status}
                </p>
                <button className="track-button" onClick={fetchOrders}>
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;