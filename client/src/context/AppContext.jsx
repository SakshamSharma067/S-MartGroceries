import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : {};
    })
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // Fetch User Auth Status, User Data and Cart Items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('api/user/is-auth');
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
                // Fetch wishlist from server if user is logged in
                fetchWishlist()
            } else {
                // Load wishlist from localStorage if not logged in
                const savedWishlist = localStorage.getItem('wishlist');
                if (savedWishlist) {
                    setWishlistItems(JSON.parse(savedWishlist));
                }
            }
        } catch (error) {
            setUser(null)
            // Load wishlist from localStorage on error
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlistItems(JSON.parse(savedWishlist));
            }
        }
    }

    // Fetch wishlist from server
    const fetchWishlist = async () => {
        try {
            const { data } = await axios.get('/api/wishlist/get');
            if (data.success) {
                const wishlistObj = {};
                data.wishlist.forEach(product => {
                    wishlistObj[product._id] = 1;
                });
                setWishlistItems(wishlistObj);
                // Save to localStorage
                localStorage.setItem('wishlist', JSON.stringify(wishlistObj));
            }
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
            // Load from localStorage on error
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlistItems(JSON.parse(savedWishlist));
            }
        }
    }

    const toggleWishlist = async (productId) => {
        try {
            if (!user) {
                // Handle wishlist locally if user is not logged in
                const newWishlist = { ...wishlistItems };
                if (newWishlist[productId]) {
                    delete newWishlist[productId];
                    toast.success("Removed from wishlist");
                } else {
                    newWishlist[productId] = 1;
                    toast.success("Added to wishlist");
                }
                setWishlistItems(newWishlist);
                localStorage.setItem('wishlist', JSON.stringify(newWishlist));
                return;
            }

            const { data } = await axios.post('/api/wishlist/toggle', { productId });
            
            if (data.success) {
                const newWishlist = { ...wishlistItems }
                if (data.inWishlist) {
                    newWishlist[productId] = 1
                    toast.success("Added to wishlist")
                } else {
                    delete newWishlist[productId]
                    toast.success("Removed from wishlist")
                }
                setWishlistItems(newWishlist)
                localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Failed to update wishlist")
        }
    }

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const getWishlistCount = () => {
        return Object.keys(wishlistItems).length
    }

    // Fetch All Products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Add Product to Cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    // Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
    }, [])

    // Update Database Cart Items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        if (user) {
            updateCart()
        }
    }, [cartItems])

    const value = {
        navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems,
        wishlistItems, toggleWishlist, getWishlistCount
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}
