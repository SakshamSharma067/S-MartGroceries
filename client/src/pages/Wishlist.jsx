import React from 'react'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { assets } from '../assets/assets'

const Wishlist = () => {
    const { products, wishlistItems } = useAppContext()
    
    const wishlistProducts = products.filter(product => wishlistItems[product._id])

    return (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> / <span className="text-primary">Wishlist</span>
            </p>

            <h1 className="text-2xl font-semibold mt-4">My Wishlist ({wishlistProducts.length})</h1>

            {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16">
                    <img src={assets.empty_wishlist} alt="Empty Wishlist" className="w-64 opacity-50" />
                    <p className="mt-6 text-gray-500">Your wishlist is empty</p>
                    <Link to="/products" className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
                    {wishlistProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist 