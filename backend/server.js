import express from 'express'
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/FoodRoute.js"
import userRouter from './routes/userRoutes.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors({origin : 'https://mern-food-app-zeta.vercel.app'}))

// db connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res) => {
    res.send("API Working")
})


app.listen(port, () => {
    console.log("Server is running")
}) 