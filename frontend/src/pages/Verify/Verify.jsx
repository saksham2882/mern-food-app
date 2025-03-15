import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        setTimeout(() => navigate("/myorders"), 3500);
      } else {
        setTimeout(() => navigate("/"), 3500);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => navigate("/"), 3500);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      const orders = response.data.data;
      const currentOrder = orders.find((order) => order._id === orderId);
      if (currentOrder) {
        setOrderItems(currentOrder.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="verify-container">
        <h2>Verifying Your Payment</h2>
        <div className="spinner"></div>
        {orderItems.length > 0 && (
          <div className="order-items">
            <h3>Your Order</h3>
            <div className="items-list">
              {orderItems.map((item, index) => (
                <div key={index} className="item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;