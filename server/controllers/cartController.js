import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

// Add product to cart
const addToCart = async (req, res, next) => {
  try {
    // Find the product being added to cart
    const product = await Product.findById(req.body.productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Find the cart of the current user
    let cart = await Cart.findOne({ user: req.user.id });

    // If cart does not exist, create a new one
    if (!cart) {
      cart = new Cart({ user: req.user.id });
    }

    // Check if the product is already in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === product._id.toString()
    );

    // If product is already in the cart, update its quantity
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += 1;
    } else {
      // Otherwise, add the product to the cart
      cart.products.push({ product: product._id, quantity: 1 });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Remove product from cart
const removeFromCart = async (req, res, next) => {
  try {
    // Find the cart of the current user
    const cart = await Cart.findOne({ user: req.user.id });

    // Check if cart exists
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Find the index of the product to be removed
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.body.productId
    );

    // If product is not in the cart, return an error
    if (productIndex < 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    // Remove the product from the cart
    const quantity = cart.products[productIndex].quantity;
    if (quantity === 1) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity -= 1;
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// get cart and expend it as local storage format

const getCartData = async (req, res) => {
  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'product_detail',
        },
      },
      // {
      //   $project: {
      //     products: {
      //       $map: {
      //         input: '$products',
      //         as: 'product',
      //         in: {
      //           id: '$$product._id',
      //           name: '$$product.name',
      //           image: '$$product.image',
      //           brand: '$$product.brand',
      //           category: '$$product.category',
      //           description: '$$product.description',
      //           price: '$$product.price',
      //           quantity: '$products.quantity',
      //         },
      //       },
      //     },
      //   },
      // },
    ]);

    //return cart[0];
    if (!cart) {
      res.status(200).json({
        data: { products: [] },
      });
    }
    console.log(cart[0]);
    const result = cart[0].products.map((v, i) => ({
      qty: v.quantity,
      product: cart[0].product_detail[i],
    }));
    res.status(200).json({
      data: { products: result },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve cart data');
  }
};

// const getCartData = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });
//     const formattedCart = [];
//     cart.products.forEach((item) => {
//       const product = item.product;
//       formattedCart.push({
//         product: {
//           _id: product._id,
//           user: product.user,
//           name: product.name,
//           image: product.image,
//           brand: product.brand,
//           category: product.category,
//           description: product.description,
//           price: product.price,
//           createdAt: product.createdAt,
//           updatedAt: product.updatedAt,
//           __v: product.__v,
//         },
//         qty: item.quantity,
//       });
//     });
//     return res.status(200).json(formattedCart);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export { addToCart, removeFromCart, getCartData };
