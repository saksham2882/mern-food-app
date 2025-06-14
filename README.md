
# MERN Food Ordering App

A full-stack food ordering application built using the MERN stack. It lets users explore dynamic dishes, add them to the cart, apply coupons, and place orders with secure Stripe payments. The backend handles all operations smoothly using Node.js, Express, and MongoDB, while the React frontend delivers a fast and clean experience. It balances functionality, performance, and user experience effectively.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Contributing](#contributing)

## Project Overview

It is a complete food ordering platform where users can explore menus, manage their carts, and place orders seamlessly. The backend handles user authentication, food item management, cart operations, and order processing, while the frontend provides a modern UI with features like category filtering, real-time cart updates, and payment integration. The app is deployed with a client-server architecture, ensuring secure data handling and smooth user interactions.

### Repositories
- **Backend**: Handles API endpoints, database operations, and payment processing.
- **Frontend**: Provides the user interface and client-side logic.

## Features

- **User Authentication**: Secure sign-up, login, and guest login with JWT-based authentication.
- **Menu Exploration**: Browse food items by category (e.g., Main Course, Desserts) with image previews.
- **Cart Management**: Add/remove items, apply coupons (e.g., SAVE10, FREESHIP), and view real-time order summaries.
- **Order Placement**: Enter shipping details and pay securely via Stripe.
- **Order Tracking**: View order history and track status (e.g., Preparing, Delivered).
- **Responsive Design**: Mobile-friendly UI with hamburger menus and adaptive layouts.
- **Notifications**: Toast notifications for user actions (e.g., item added, coupon applied).
- **Admin Functionality**: Add/remove food items and update order statuses (backend-focused).
- **Additional Features**:
  - Real-time cart syncing with backend.
  - Skeleton loaders for better UX during data fetching.

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for RESTful APIs.
- **MongoDB**: NoSQL database for storing user, food, and order data.
- **Mongoose**: ODM for MongoDB schema management.
- **jsonwebtoken**: For JWT authentication.
- **bcrypt**: For password hashing.
- **multer**: For handling image uploads.
- **Stripe**: For payment processing.
- **cors, dotenv, nodemon**: For CORS, environment variables, and development.

### Frontend
- **React**: JavaScript library for UI components.
- **React Router**: For client-side routing.
- **Axios**: For API requests.
- **react-hot-toast**: For toast notifications.
- **Vite**: Build tool for fast development.
- **Context API**: For global state management.
- **CSS**: Custom styles for responsive design.

## Project Structure

```plaintext
mern-food-app/
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection setup
│   ├── controllers/                # API logic for users, food, cart, orders
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/                     # Mongoose schemas
│   ├── routes/                     # API routes
│   ├── uploads/                    # Uploaded food images
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   # Main server file
├── frontend/
│   ├── public/
│   │   ├── images/                 # Static images (e.g., logo)
│   │   └── index.html              # Main HTML file
│   ├── src/
│   │   ├── assets/                 # Image assets
│   │   ├── components/             # Reusable UI components (e.g., Navbar, Footer)
│   │   ├── context/
│   │   │   └── StoreContext.jsx    # Global state management
│   │   ├── pages/                  # Page components (e.g., Home, Cart)
│   │   ├── App.jsx                 # Main app with routes
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # React entry point
│   ├── package.json
│   ├── vercel.json                 # Vercel deployment config
│   └── vite.config.js              # Vite configuration
├── .gitignore
└── README.md                       # This file
```

For detailed structures, refer to:
- [Backend README](./backend/readme.md)
- [Frontend README](./frontend/README.md)

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment integration
- Git

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saksham2882/mern-food-app.git
   cd mern-food-app
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables** [see below](#environment-variables).

5. **Run the backend**:
   ```bash
   cd backend
   npm run server
   ```

6. **Run the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the app**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`


## Environment Variables

### Backend (`backend/.env`)
```plaintext
MONGODB_KEY=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
PORT=4000
```

### Frontend (`frontend/.env`)
```plaintext
VITE_API_URL=<backend_url>
```

## How It Works

1. **Backend**:
   - **Database**: MongoDB stores users, food items, carts, and orders. Mongoose schemas define data structures.
   - **APIs**: Express.js handles routes for authentication (`/api/user`), food management (`/api/food`), cart operations (`/api/cart`), and orders (`/api/order`).
   - **Authentication**: JWT tokens secure protected routes. Passwords are hashed with bcrypt.
   - **Payments**: Stripe processes payments, with verification handled post-checkout.
   - **File Uploads**: Multer stores food images in `uploads/`.

2. **Frontend**:
   - **UI**: React components render the UI, with pages like Home, Cart, and PlaceOrder.
   - **State Management**: `StoreContext` manages cart, user token, food list, and discounts.
   - **Routing**: React Router handles navigation between pages.
   - **API Calls**: Axios communicates with backend APIs for data fetching and updates.
   - **Features**: Includes category filtering, coupon discounts, order tracking, and responsive design.

### User Workflow
1. **Browse**: Explore food categories and items on the Home page.
2. **Cart**: Add items to the cart, apply coupons, and view the order summary.
3. **Checkout**: Enter shipping details in PlaceOrder and pay via Stripe.
4. **Verification**: Payment status is verified, and orders are updated.
5. **Track**: View order history and status in MyOrders.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a branch: `git checkout -b feature-branch`.
3. Commit changes: `git commit -m "Add feature"`. 
4. Push to branch: `git push origin feature-branch`.
5. Submit a pull request.


---

For detailed setup and API documentation:
- [Backend README](./backend/readme.md)
- [Frontend README](./frontend/README.md)

---

Happy coding! 🍔

---
