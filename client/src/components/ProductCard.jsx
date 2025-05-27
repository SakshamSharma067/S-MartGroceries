import React from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate, wishlistItems, toggleWishlist, updateCartItem} = useAppContext()

    const handleWishlistClick = (e) => {
        e.stopPropagation()
        toggleWishlist(product._id)
    }

    const handleQuantityChange = (e, action) => {
        e.stopPropagation()
        const currentQty = cartItems[product._id] || 0
        
        if (action === 'increase') {
            updateCartItem(product._id, currentQty + 1)
        } else if (action === 'decrease') {
            if (currentQty === 1) {
                removeFromCart(product._id)
            } else {
                updateCartItem(product._id, currentQty - 1)
            }
        }
    }

    const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100)
   
    return product && (
        <div 
            onClick={()=> {
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); 
                scrollTo(0,0)
            }} 
            className="group bg-white rounded-2xl p-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
            <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                    <img 
                        src={product.image[0]} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                    />
                </div>
                <button 
                    onClick={handleWishlistClick}
                    className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer duration-200"
                >
                    <img 
                        src={wishlistItems[product._id] ? assets.heart_filled_icon : assets.heart_icon} 
                        alt="wishlist" 
                        className="w-5 h-5"
                    />
                </button>
                {discount > 0 && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        {discount}% OFF
                    </span>
                )}
            </div>

            <div className="mt-3 space-y-2">
                <div className="flex items-center gap-1">
                    {Array(5).fill('').map((_, i) => (
                        <img 
                            key={i} 
                            className="w-3.5" 
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                            alt=""
                        />
                    ))}
                    <span className="text-xs text-gray-400">(4)</span>
                </div>

                <div>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-primary">{currency}{product.offerPrice}</p>
                    {product.price !== product.offerPrice && (
                        <p className="text-sm text-gray-400 line-through">{currency}{product.price}</p>
                    )}
                </div>

                {cartItems[product._id] ? (
                    <div className="flex items-center justify-between bg-gray-50 rounded-full p-1">
                        <button 
                            onClick={(e) => handleQuantityChange(e, 'decrease')}
                            className="w-8 h-8 flex items-center justify-center cursor-pointer text-primary hover:bg-gray-100 rounded-full transition-colors"
                        >
                            -
                        </button>
                        <span className="text-gray-900 font-medium">{cartItems[product._id]}</span>
                        <button 
                            onClick={(e) => handleQuantityChange(e, 'increase')}
                            className="w-8 h-8 flex items-center justify-center text-primary hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={(e)=>{
                            e.stopPropagation()
                            addToCart(product._id)
                        }} 
                        className="w-full py-2 text-primary border-2 border-primary rounded-full hover:bg-primary cursor-pointer transition-colors font-medium"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductCard