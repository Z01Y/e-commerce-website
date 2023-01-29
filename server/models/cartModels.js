import mongoose from 'mongoose';

const cartSch = new mongoose.Schema({
  items: [Object],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Cart = mongoose.model('Cart', cartSch);
export default Cart;
