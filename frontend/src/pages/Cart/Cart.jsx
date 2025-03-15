import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url, discount, setDiscount, appliedCoupon, setAppliedCoupon } = useContext(StoreContext);
  const navigate = useNavigate();

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
  const taxAmount = subtotal * taxRate;
  const totalBeforeDiscount = subtotal + deliveryFee + platformFee + taxAmount;
  const totalAfterDiscount = totalBeforeDiscount - discount;

  const coupons = {
    'SAVE10': { discount: 10, type: 'flat', description: '₹10 off on orders above ₹99', minAmount: 99 },
    'SAVE20': { discount: 20, type: 'flat', description: '₹20 off on orders above ₹199', minAmount: 199 },
    'PERCENT10': { discount: 0.10, type: 'percent', description: '10% off on orders above ₹299', minAmount: 299 },
    'FREESHIP': { discount: deliveryFee, type: 'flat', description: 'Free delivery on orders above ₹350', minAmount: 350 },
  };

  const applyPromoCode = (code) => {
    const coupon = coupons[code];
    if (coupon) {
      if (subtotal < coupon.minAmount) {
        toast.error(`Order must be above ₹${coupon.minAmount} to use ${code}`, { duration: 3000, position: 'top-center' });
        setDiscount(0);
        setAppliedCoupon(null);
        return;
      }
      let appliedDiscount = coupon.type === 'flat' ? coupon.discount : subtotal * coupon.discount;
      setDiscount(appliedDiscount);
      setAppliedCoupon(code);
      toast.success(`Coupon "${code}" applied! ₹${appliedDiscount.toFixed(2)} off`, {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    if (appliedCoupon) {
      const coupon = coupons[appliedCoupon];
      if (subtotal < coupon.minAmount) {
        setDiscount(0);
        setAppliedCoupon(null);
        toast.error(`Coupon "${appliedCoupon}" removed as order is below ₹${coupon.minAmount}`, {
          duration: 3000,
          position: 'top-center',
        });
      } else {
        const newDiscount = coupon.type === 'flat' ? coupon.discount : subtotal * coupon.discount;
        setDiscount(newDiscount);
      }
    }
  }, [subtotal, appliedCoupon]);

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-left">
          <h2>Your Cart</h2>
          {subtotal === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              <div className="cart-header">
                <span>Image</span>
                <span>Name</span>
                <span>Quantity</span>
                <span>Total Price</span>
                <span>Add</span>
                <span>Remove</span>
              </div>
              <hr />
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div className="cart-item animate-slide-in">
                      <img src={`${url}/images/${item.image}`} alt={item.name} className="cart-item-image" />
                      <span>{item.name}</span>
                      <span>{cartItems[item._id]}</span>
                      <span>₹{item.price * cartItems[item._id]}</span>
                      <button onClick={() => addToCart(item._id)} className="action-btn">+</button>
                      <button onClick={() => removeFromCart(item._id)} className="action-btn">-</button>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>

        <div className="cart-right animate-slide-in">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="summary-row">
              <span>CGST + SGST (12%)</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{totalAfterDiscount.toFixed(2)}</span>
            </div>
          </div>

          <div className="coupon-list">
            <h4>Available Coupons</h4>
            {Object.entries(coupons).map(([code, { description }]) => (
              <div className="coupon-item">
                <div>
                  <strong>{code}</strong>: {description}
                </div>
                <button className="animate-btn" onClick={() => applyPromoCode(code)}>Apply</button>
              </div>
            ))}
          </div>

          <button
            className="checkout-btn animate-btn"
            onClick={() => navigate('/order')}
            disabled={subtotal === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;