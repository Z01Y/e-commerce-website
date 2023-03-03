import express from 'express';

const router = express.Router();
import {
  addToCart,
  removeFromCart,
  getCartData,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.use(protect);

router.route('/').post(addToCart);
router.route('/').delete(removeFromCart);
router.route('/').get(getCartData);

export default router;
