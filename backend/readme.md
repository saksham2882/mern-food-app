
# MERN Food App Backend

This repository contains the backend code for a MERN stack-based food ordering application. The backend is built with Node.js, Express.js, and MongoDB, providing APIs for user authentication, food item management, cart functionality, and order processing with Stripe payment integration.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Contributing](#contributing)

## Overview

The backend serves as the core of the MERN food app, handling user authentication, food item CRUD operations, cart management, and order processing with payment integration via Stripe. It connects to a MongoDB database for data persistence and uses JSON Web Tokens (JWT) for secure authentication.

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for creating **RESTful APIs**.
- **MongoDB**: NoSQL database for storing user, food, and order data.
- **Mongoose**: ODM library for MongoDB to define schemas and interact with the database.
- **jsonwebtoken**: For generating and verifying JWT tokens for authentication.
- **bcrypt**: For hashing user passwords securely.
- **validator**: For validating email and other inputs.
- **multer**: For handling file uploads (food images).
- **Stripe**: For processing payments securely.
- **cors**: For enabling cross-origin resource sharing with the frontend.
- **dotenv**: For managing environment variables.
- **nodemon**: For auto-restarting the server during development.

## Project Structure

```plaintext
backend/
├── config/
│   └── db.js                    # MongoDB connection setup
├── controllers/
│   ├── cartController.js        # Cart management logic (add, remove, get, save)
│   ├── foodControllers.js       # Food item management (add, list, remove)
│   ├── orderController.js       # Order processing and payment handling
│   └── userControllers.js       # User authentication (login, register)
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── models/
│   ├── foodModels.js            # Food item schema
│   ├── orderModel.js            # Order schema
│   └── userModels.js            # User schema with cart data
├── routes/
│   ├── cartRoutes.js            # Cart-related API routes
│   ├── foodRoutes.js            # Food-related API routes
│   ├── orderRoutes.js           # Order-related API routes
│   └── userRoutes.js            # User-related API routes
├── uploads/                     # Directory for uploaded food images
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies and scripts
└── server.js                    # Main server file
```

## API Endpoints

Below is a comprehensive list of all API endpoints, including their methods, request/response formats, and example use cases.

### User Routes (`/api/user`)

| Endpoint        | Method | Description                     | Authentication |
|-----------------|--------|---------------------------------|----------------|
| `/register`     | POST   | Register a new user             | None           |
| `/login`        | POST   | Login an existing user          | None           |

#### 1. `POST /api/user/register`

- **Description**: Registers a new user with name, email, and password.
- **Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

- **Response**:
  - Success (201):

```json
{
  "success": true,
  "token": "jwt_token",
  "message": "Registration Successfully"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "User already exists"
}
```

- **Example Use Case**: A new user signs up to access the food ordering platform.

#### 2. `POST /api/user/login`

- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "token": "jwt_token",
  "message": "Logged in Successfully"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Invalid Credentials"
}
```

- **Example Use Case**: A user logs in to view their cart and place orders.

### Food Routes (`/api/food`)

| Endpoint        | Method | Description                     | Authentication |
|-----------------|--------|---------------------------------|----------------|
| `/add`          | POST   | Add a new food item             | None           |
| `/list`         | GET    | List all food items             | None           |
| `/remove`       | POST   | Remove a food item              | None           |

#### 1. `POST /api/food/add`

- **Description**: Adds a new food item with an image upload.
- **Request Body**: Form-data with fields:

```json
{
  "name": "Pizza",
  "description": "Delicious cheese pizza",
  "price": 10.99,
  "category": "Main Course",
  "image": [file]
}
```

- **Response**:
  - Success (201):

```json
{
  "success": true,
  "message": "Food Added"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error"
}
```

- **Example Use Case**: Admin adds a new food item to the menu.

#### 2. `GET /api/food/list`

- **Description**: Retrieves all food items from the database.
- **Response**:
  - Success (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "food_id",
      "name": "Pizza",
      "description": "Delicious cheese pizza",
      "price": 10.99,
      "category": "Main Course",
      "image": "filename.jpg"
    }
  ]
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error"
}
```

- **Example Use Case**: Frontend displays all available food items to users.

#### 3. `POST /api/food/remove`

- **Description**: Removes a food item by ID.
- **Request Body**:

```json
{
  "id": "food_id"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "message": "Food Removed"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error"
}
```

- **Example Use Case**: Admin removes a discontinued food item from the menu.

### Cart Routes (`/api/cart`)

| Endpoint        | Method | Description                     | Authentication |
|-----------------|--------|---------------------------------|----------------|
| `/add`          | POST   | Add item to cart                | JWT            |
| `/remove`       | POST   | Remove item from cart           | JWT            |
| `/get`          | POST   | Get user's cart                 | JWT            |
| `/save`         | POST   | Save cart data                  | JWT            |

#### 1. `POST /api/cart/add`

- **Description**: Adds an item to the user's cart.
- **Request Body**:

```json
{
  "userId": "user_id",
  "itemId": "food_id"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "message": "Added To Cart"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error"
}
```

- **Example Use Case**: User adds a pizza to their cart.

#### 2. `POST /api/cart/remove`

- **Description**: Removes an item from the user's cart.
- **Request Body**:

```json
{
  "userId": "user_id",
  "itemId": "food_id"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "message": "Removed From Cart"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error"
}
```

- **Example Use Case**: User removes a pizza from their cart.

#### 3. `POST /api/cart/get`

- **Description**: Retrieves the user's cart data.
- **Request Body**:

```json
{
  "userId": "user_id"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "cartData": {
    "food_id": 2
  }
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error"
}
```

- **Example Use Case**: Frontend displays the user's current cart contents.

#### 4. `POST /api/cart/save`

- **Description**: Saves updated cart data for the user.
- **Request Body**:

```json
{
  "userId": "user_id",
  "cartItems": {
    "food_id": 3
  }
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "message": "Cart saved successfully"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Error saving cart"
}
```

- **Example Use Case**: Frontend syncs cart data after modifications.

### Order Routes (`/api/order`)

| Endpoint        | Method | Description                     | Authentication |
|-----------------|--------|---------------------------------|----------------|
| `/place`        | POST   | Place a new order               | JWT            |
| `/verify`       | POST   | Verify order payment            | None           |
| `/userorders`   | POST   | Get user's orders               | JWT            |
| `/list`         | GET    | List all orders                 | None           |
| `/status`       | POST   | Update order status             | None           |

#### 1. `POST /api/order/place`

- **Description**: Places a new order with Stripe payment integration.
- **Request Body**:

```json
{
  "userId": "user_id",
  "items": [
    {
      "name": "Pizza",
      "price": 10.99,
      "quantity": 2
    }
  ],
  "amount": 25.97,
  "address": {
    "street": "123 Main St",
    "city": "Mumbai"
  },
  "discount": 2.00,
  "deliveryFee": 2.99,
  "platformFee": 1.00,
  "taxAmount": 3.00
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "session_url": "stripe_checkout_url"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Failed to place order"
}
```

- **Example Use Case**: User completes checkout and is redirected to Stripe for payment.

#### 2. `POST /api/order/verify`

- **Description**: Verifies payment status and updates order.
- **Request Body**:

```json
{
  "orderId": "order_id",
  "success": "true"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "message": "Order placed successfully"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Order cancelled"
}
```

- **Example Use Case**: Stripe redirects back to verify payment success or failure.

#### 3. `POST /api/order/userorders`

- **Description**: Retrieves all orders for a specific user.
- **Request Body**:

```json
{
  "userId": "user_id"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "order_id",
      "userId": "user_id",
      "items": [],
      "amount": 25.97
    }
  ]
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Failed to fetch user orders"
}
```

- **Example Use Case**: User views their order history.

#### 4. `GET /api/order/list`

- **Description**: Retrieves all orders in the system.
- **Response**:
  - Success (200):

```json
{
  "success": true,
  "data": [
    {
      "_id": "order_id",
      "userId": "user_id",
      "items": [],
      "amount": 25.97
    }
  ]
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Failed to fetch orders"
}
```

- **Example Use Case**: Admin views all orders for management purposes.

#### 5. `POST /api/order/status`

- **Description**: Updates the status of an order.
- **Request Body**:

```json
{
  "orderId": "order_id",
  "status": "Delivered"
}
```

- **Response**:
  - Success (200):

```json
{
  "success": true,
  "message": "Order status updated"
}
```

  - Error (400):

```json
{
  "success": false,
  "message": "Failed to update order status"
}
```

- **Example Use Case**: Admin updates order status to "Delivered" after dispatch.

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/saksham2882/mern-food-app.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables [see below](#environment-variables).
4. Start the server:

```bash
npm run server
```

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```plaintext
MONGODB_KEY=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
PORT=4000
```

## How It Works

- **Database Connection**: The `config/db.js` file establishes a connection to MongoDB using Mongoose.
- **User Authentication**: Users register and log in via `/api/user/register` and `/api/user/login`. Passwords are hashed with bcrypt, and JWT tokens are issued for authentication.
- **Food Management**: Admins can add, list, and remove food items via `/api/food` routes. Images are uploaded using multer and stored in the `uploads/` directory.
- **Cart Management**: Users can add/remove items to/from their cart, stored in the `userModel.cartData` field.
- **Order Processing**: Orders are created with `/api/order/place`, integrating with Stripe for payments. The order status is updated post-payment via `/api/order/verify`.
- **Security**: JWT-based authentication middleware (`auth.js`) protects cart and order routes.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.


---
