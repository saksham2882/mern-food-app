import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children, setShowLogin }) => {
    const [cartItems, setCartItems] = useState({});
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const url = process.env.VITE_APP_API_URL || "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (token) {
            if (!cartItems[itemId]) {
                setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            } else {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            const itemInfo = food_list.find((product) => product._id === itemId);
            if (itemInfo) {
                toast.success(`${itemInfo.name} added to cart`, {
                    duration: 3000,
                    position: 'top-center',
                });
            }
        } else {
            toast.error("Please log in or create an account to add items to your cart", {
                duration: 4000,
                position: 'top-center',
            });
            setShowLogin(true);
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    const saveCartBeforeLogout = async () => {
        if (token && Object.keys(cartItems).length > 0) {
            try {
                const response = await axios.post(url + "/api/cart/save", { cartItems }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message, {
                        duration: 3000,
                        position: 'top-center',
                    });
                } else {
                    toast.error(response.data.message || "Failed to save cart", {
                        duration: 4000,
                        position: 'top-center',
                    });
                }
            } catch (error) {
                toast.error("Error saving cart to server", {
                    duration: 4000,
                    position: 'top-center',
                });
            }
        }
    };

    const customSetToken = async (newToken) => {
        if (!newToken && token) {
            await saveCartBeforeLogout();
            setCartItems({});
        }
        setToken(newToken);
        if (newToken) {
            await loadCartData(newToken);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken: customSetToken,
        setShowLogin,
        discount,
        setDiscount,
        appliedCoupon,
        setAppliedCoupon
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;