# MERN Food App Frontend

This repository contains the frontend code for a MERN stack-based food ordering application . The frontend is built with React, providing a responsive and user-friendly interface for browsing food items, managing carts, placing orders, and tracking payments. It integrates seamlessly with the backend via RESTful APIs.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Pages Overview](#pages-overview)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Contributing](#contributing)

## Project Overview

The frontend of the MERN food app provides an intuitive UI for users to explore menus, add items to their cart, apply coupons, place orders with Stripe payment integration, and track their order history. It leverages React for component-based architecture, React Router for navigation, and a custom context for state management. The app is styled with custom CSS for a modern and responsive design.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **React Router**: For client-side routing and navigation.
- **Axios**: For making HTTP requests to the backend API.
- **react-hot-toast**: For displaying toast notifications.
- **Vite**: Build tool and development server for fast development.
- **ESLint**: For code linting and maintaining code quality.
- **CSS**: Custom styles for responsive and visually appealing design.
- **Context API**: For global state management (e.g., cart, user authentication).
- **Stripe**: Integrated via backend for secure payment processing.

## Project Structure

```plaintext
frontend/
├── public/
│   └── images/                         # Static images (e.g., food logo)
├── src/
│   ├── assets/
│   │   └── assets.jsx                  # Exported image assets (e.g., icons, images)
│   ├── components/
│   │   ├── Contact/
│   │   │   ├── Contact.jsx             # Contact form and info component
│   │   │   └── Contact.css             # Styles for Contact component
│   │   ├── ExploreMenu/
│   │   │   ├── ExploreMenu.jsx         # Menu category display component
│   │   │   └── ExploreMenu.css         # Styles for ExploreMenu
│   │   ├── Features/
│   │   │   ├── Features.jsx            # Features showcase component
│   │   │   └── Features.css            # Styles for Features
│   │   ├── FoodDisplay/
│   │   │   ├── FoodDisplay.jsx         # Food items display component
│   │   │   └── FoodDisplay.css         # Styles for FoodDisplay
│   │   ├── FoodItem/
│   │   │   ├── FoodItem.jsx            # Individual food item component
│   │   │   └── FoodItem.css            # Styles for FoodItem
│   │   ├── Footer/
│   │   │   ├── Footer.jsx              # Footer with newsletter and links
│   │   │   └── Footer.css              # Styles for Footer
│   │   ├── Header/
│   │   │   ├── Header.jsx              # Hero header component
│   │   │   └── Header.css              # Styles for Header
│   │   ├── LoginPopup/
│   │   │   ├── LoginPopup.jsx          # Login/Sign-up popup component
│   │   │   └── LoginPopup.css          # Styles for LoginPopup
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx              # Navigation bar component
│   │   │   └── Navbar.css              # Styles for Navbar
│   ├── context/
│   │   └── StoreContext.jsx            # Context for global state management
│   ├── pages/
│   │   ├── Cart/
│   │   │   ├── Cart.jsx                # Cart page for managing items
│   │   │   └── Cart.css                # Styles for Cart page
│   │   ├── Home/
│   │   │   ├── Home.jsx                # Home page with main sections
│   │   │   └── Home.css                # Styles for Home page
│   │   ├── MyOrders/
│   │   │   ├── MyOrders.jsx            # Order history page
│   │   │   └── MyOrders.css            # Styles for MyOrders
│   │   ├── PlaceOrder/
│   │   │   ├── PlaceOrder.jsx          # Order placement and payment page
│   │   │   └── PlaceOrder.css          # Styles for PlaceOrder
│   │   ├── Verify/
│   │   │   ├── Verify.jsx              # Payment verification page
│   │   │   └── Verify.css              # Styles for Verify page
│   ├── App.jsx                         # Main app component with routes
│   ├── index.css                       # Global styles
│   └── main.jsx                        # Entry point for React app
│── index.html                          # Main HTML file
├── package.json                        # Project dependencies and scripts
├── vercel.json                         # Vercel deployment configuration
├── vite.config.js                      # Vite configuration
└── .gitignore                          # Git ignore file
```

## Components Overview

Below is a summary of the main components and their functionality:

- **Contact (`Contact.jsx`)**: Displays a contact form and info (phone, email, social links). Submits messages with toast feedback.
- **ExploreMenu (`ExploreMenu.jsx`)**: Shows food categories with clickable images to filter dishes by category (e.g., Main Course, Desserts).
- **Features (`Features.jsx`)**: Highlights app features like fast delivery, fresh ingredients, and eco-friendly packaging with animated cards.
- **FoodDisplay (`FoodDisplay.jsx`)**: Lists food items based on selected category, with skeleton loaders for better UX during data fetching.
- **FoodItem (`FoodItem.jsx`)**: Renders individual food items with details (name, price, image, discount) and cart controls (Add/Remove).
- **Footer (`Footer.jsx`)**: Includes newsletter subscription, contact info, social links, and navigation links with copyright notice.
- **Header (`Header.jsx`)**: Hero section with a call-to-action button to scroll to the food menu.
- **LoginPopup (`LoginPopup.jsx`)**: Modal for login/sign-up with guest login option, integrating with backend authentication APIs.
- **Navbar (`Navbar.jsx`)**: Responsive navigation bar with links to Home, Menu, Top Dishes, Features, and Contact. Includes cart, orders, and profile/logout options.

## Pages Overview

- **Home (`Home.jsx`)**: Main page combining Header, ExploreMenu, FoodDisplay, Features, and Contact components.
- **Cart (`Cart.jsx`)**: Displays cart items with quantity controls, coupon application, and order summary (subtotal, delivery, taxes, discounts).
- **PlaceOrder (`PlaceOrder.jsx`)**: Handles shipping details input, displays order summary, and initiates Stripe payment via backend.
- **Verify (`Verify.jsx`)**: Verifies payment status after Stripe redirection and displays order items during processing.
- **MyOrders (`MyOrders.jsx`)**: Shows user’s order history with item details, status, and tracking option.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saksham2882/mern-food-app.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables [see below](#environment-variables).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the `frontend/` directory with the following variable:

```plaintext
VITE_API_URL=<backend_url>
```

This points to the backend API URL. Ensure the backend server is running and accessible.

## How It Works

- **State Management**: The `StoreContext.jsx` provides a global context for managing food list, cart items, user token, discounts, and loading states. It handles API calls for cart operations and authentication.
- **Routing**: `App.jsx` uses React Router to define routes for Home (`/`), Cart (`/cart`), PlaceOrder (`/order`), Verify (`/verify`), and MyOrders (`/myorders`).
- **API Integration**: Axios is used to communicate with the backend for user authentication (`/api/user`), food listing (`/api/food`), cart operations (`/api/cart`), and order management (`/api/order`).
- **Authentication**: User tokens are stored in localStorage and validated via backend APIs. Protected routes (e.g., `/order`, `/myorders`) redirect to login if no token is present.
- **Cart & Discounts**: The cart supports dynamic quantity updates, coupon codes (e.g., SAVE10, PERCENT10), and calculated fees (delivery, platform, taxes).
- **Payment**: Orders are placed via `/api/order/place`, redirecting to Stripe’s checkout. Payment status is verified on `/verify`.
- **Responsive Design**: CSS ensures the app is mobile-friendly, with hamburger menus and adaptive layouts.
- **Notifications**: `react-hot-toast` provides user feedback for actions like adding to cart, applying coupons, and login/logout.

### Example Workflow
1. **Browse Menu**: User selects a category in `ExploreMenu` to filter dishes in `FoodDisplay`.
2. **Add to Cart**: Clicking “Add” on a `FoodItem` updates the cart via `StoreContext` and backend API.
3. **Checkout**: User navigates to `Cart`, applies a coupon, and proceeds to `PlaceOrder` to enter shipping details.
4. **Payment**: Submitting the order redirects to Stripe. Post-payment, `Verify` confirms the order and redirects to `MyOrders`.
5. **Track Orders**: User views order history and status in `MyOrders`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

---
