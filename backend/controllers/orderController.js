import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://mern-food-app-zeta.vercel.app";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      discount: req.body.discount || 0,
      deliveryFee: req.body.deliveryFee || 0,
      platformFee: req.body.platformFee || 0,
      taxAmount: req.body.taxAmount || 0,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Delivery Fee
    if (req.body.deliveryFee > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Delivery Charges" },
          unit_amount: Math.round(req.body.deliveryFee * 100),
        },
        quantity: 1,
      });
    }

    // Platform Fee
    if (req.body.platformFee > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Platform Fee" },
          unit_amount: Math.round(req.body.platformFee * 100),
        },
        quantity: 1,
      });
    }

    // Tax (CGST + SGST)
    if (req.body.taxAmount > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: { name: "CGST + SGST (12%)" },
          unit_amount: Math.round(req.body.taxAmount * 100),
        },
        quantity: 1,
      });
    }

    let discountData = {};
    if (req.body.discount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(req.body.discount * 100),
        currency: "inr",
        duration: "once",
        name: "Order Discount",
      });
      discountData = { coupon: coupon.id };
    }

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      ...(req.body.discount > 0 && { discounts: [{ coupon: discountData.coupon }] }),
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to place order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to verify order" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch user orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to update order status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };