import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @description: fetch all products
// @route  GET /api/products
// @access public route
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @description: fetch single products
// @route  GET /api/products/:id
// @access public route

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

export { getProducts, getProductById };
