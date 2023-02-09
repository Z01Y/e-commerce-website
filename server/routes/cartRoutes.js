import express from 'express';

const router = express.Router();
import { addToCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.use(protect);

router.route('/').post(addToCart);
router.route('/').delete(removeFromCart);

export default router;
