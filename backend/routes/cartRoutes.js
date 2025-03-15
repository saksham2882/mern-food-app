import express from 'express'
import { addToCart, removeFromCart, getCart, saveCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/remove", authMiddleware, removeFromCart)
cartRouter.post("/get", authMiddleware, getCart)
cartRouter.post("/save", authMiddleware, saveCart);

export default cartRouter; 