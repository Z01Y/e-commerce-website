import Cart from '../models/cartModel.js';

import asyncHandler from 'express-async-handler';
// @description: Add to Cart
// @route  POST /api/cart/
// @access private
const addToCart = asyncHandler(async (req, res) => {
  // get existing items;

  console.log(req.body.user);
  // const cartItems = Cart.find({ user: req.body.user });
  const items = [];
  items.push(req.body.product);

  console.log('items', cartItems);

  //
  const updated = await Cart.update(
    { user: req.body.user },
    { $set: { cartItems: items } }
  );

  console.log(updated);
  res.status(200).json({
    success: true,
    data: updated,
  });

  // const { email, password } = req.body;
  // const user = await User.findOne({ email });

  // if (user && (await user.matchPassword(password))) {
  // 	res.json({
  // 		_id: user._id,
  // 		name: user.name,
  // 		email: user.email,
  // 		isAdmin: user.isAdmin,
  // 		token: generateToken(user._id),
  // 	});
  // } else {
  // 	res.status(401);
  // 	throw new Error('Invalid email or password');
  // }
});

export { addToCart };
