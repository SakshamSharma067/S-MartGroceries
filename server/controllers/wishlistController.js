import Wishlist from "../models/Wishlist.js";

// Get user's wishlist : /api/wishlist/get
export const getWishlist = async (req, res) => {
    try {
        const { userId } = req.body;
        const wishlist = await Wishlist.findOne({ userId }).populate('products');
        
        if (!wishlist) {
            return res.json({ 
                success: true, 
                wishlist: [] 
            });
        }

        res.json({ 
            success: true, 
            wishlist: wishlist.products 
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Toggle product in wishlist : /api/wishlist/toggle
export const toggleWishlistItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        let wishlist = await Wishlist.findOne({ userId });
        
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        const productIndex = wishlist.products.indexOf(productId);
        
        if (productIndex > -1) {
            // Remove product
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
            res.json({ 
                success: true, 
                message: "Removed from wishlist",
                inWishlist: false 
            });
        } else {
            // Add product
            wishlist.products.push(productId);
            await wishlist.save();
            res.json({ 
                success: true, 
                message: "Added to wishlist",
                inWishlist: true 
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

        
