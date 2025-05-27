import express from 'express';
import { getWishlist, toggleWishlistItem } from '../controllers/wishlistController.js';
import authUser from '../middlewares/authUser.js';

const wishlistRouter = express.Router();

wishlistRouter.get('/get', authUser, getWishlist);
wishlistRouter.post('/toggle', authUser, toggleWishlistItem);

export default wishlistRouter; 