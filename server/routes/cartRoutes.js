import express from 'express';

const router = express.Router();
import { addToCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addToCart);
// router.post('/login', authUser);
// router.route('/profile').get(protect, getUserProfile);

export default router;
