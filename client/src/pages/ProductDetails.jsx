import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {

    const {products, navigate, currency, addToCart, wishlistItems, toggleWishlist} = useAppContext()
    const {id} = useParams()
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item)=> item._id === id);

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> product.category === item.category)
            setRelatedProducts(productsCopy.slice(0,5))
        }
    },[products])

    useEffect(()=>{
        setThumbnail(product?.image[0] ? product.image[0] : null)
    },[product])


    return product && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="relative border border-gray-500/30 rounded-lg overflow-hidden max-w-96">
                        <img src={thumbnail} alt={product.name} className="w-full" />
                        <button 
                            onClick={() => toggleWishlist(product._id)}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
                        >
                            <img 
                                src={wishlistItems[product._id] ? assets.heart_filled_icon : assets.heart_icon} 
                                alt="wishlist" 
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-medium">{product.name}</h1>
                    <div className="flex items-center gap-0.5 mt-2">
                        {Array(5).fill('').map((_, i) => (
                            <img key={i} className="w-4" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt=""/>
                        ))}
                        <p className="text-sm text-gray-500">(4)</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <p className="text-3xl font-medium text-primary">{currency}{product.offerPrice}</p>
                        <p className="text-xl text-gray-500 line-through">{currency}{product.price}</p>
                    </div>

                    <button onClick={() => addToCart(product._id)} className="mt-6 px-12 py-2.5 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Add to Cart
                    </button>

                    <div className="mt-8">
                        <h2 className="text-xl font-medium">Product Description</h2>
                        <p className="mt-2 text-gray-500">{product.description || "No description available."}</p>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-medium">Related Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails