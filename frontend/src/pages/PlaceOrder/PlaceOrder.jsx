import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, discount } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const applyDummyAddress = () => {
    const dummyAddress = {
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@example.com',
      street: '456 Sample Rd',
      city: 'Delhi',
      state: 'Delhi',
      zipcode: '110001',
      phone: '9123456789',
    };
    setData(dummyAddress);
    toast.success('Dummy address applied', { duration: 3000, position: 'top-center' });
  };

  const calculateDeliveryFee = (subtotal) => {
    if (subtotal === 0) return 0;
    if (subtotal < 200) return 50;
    if (subtotal < 350) return 30;
    return 0;
  };

  const subtotal = getTotalCartAmount();
  const platformFee = subtotal > 0 ? 10 : 0;
  const taxRate = 0.12;
  const deliveryFee = calculateDeliveryFee(subtotal);
  const taxAmount = Number((subtotal * taxRate).toFixed(2));
  const totalBeforeDiscount = Number((subtotal + deliveryFee + platformFee + taxAmount).toFixed(2));
  const total = Number((totalBeforeDiscount - discount).toFixed(2));

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: localStorage.getItem('userId'),
      address: data,
      items: orderItems,
      amount: total,
      discount: discount,
      deliveryFee: deliveryFee,
      platformFee: platformFee,
      taxAmount: taxAmount,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error('Failed to place order', { duration: 3000, position: 'top-center' });
      }
    } catch (error) {
      toast.error('Error placing order', { duration: 3000, position: 'top-center' });
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-container">
        <div className="place-order-left animate-slide-in">
          <h2>Shipping Details</h2>
          <div className="form-grid">
            <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" required />
            <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required className="span-full" />
            <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required className="span-full" />
            <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" required />
            <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" required />
            <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" required />
            <input name="phone" onChange={onChangeHandler} value={data.phone} type="tel" placeholder="Phone Number" required className="span-full" />
          </div>
          <div className="dummy-address-container animate-slide-in">
            <h3>Saved Address</h3>
            <div className="dummy-address-details">
              <p><strong>Name:</strong> Guest User</p>
              <p><strong>Email:</strong> guest@example.com</p>
              <p><strong>Street:</strong> 456 Sample Rd</p>
              <p><strong>City:</strong> Delhi</p>
              <p><strong>State:</strong> Delhi</p>
              <p><strong>Zip Code:</strong> 110001</p>
              <p><strong>Phone:</strong> 9123456789</p>
            </div>
            <button type="button" className="use-address-btn animate-btn" onClick={applyDummyAddress}>
              Use This Address
            </button>
          </div>
        </div>

        <div className="place-order-right animate-slide-in">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
            <div className="summary-row"><span>Platform Fee</span><span>₹{platformFee}</span></div>
            <div className="summary-row"><span>CGST + SGST (12%)</span><span>₹{taxAmount}</span></div>
            {discount > 0 && <div className="summary-row discount"><span>Discount</span><span>-₹{discount.toFixed(2)}</span></div>}
            <hr />
            <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
          </div>
          <button type="submit" className="submit-btn animate-btn">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;