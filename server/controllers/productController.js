import asyncHandler from 'express-async-handler';
import pkg from 'nodemon';
const { restart } = pkg;
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

// @description: Delete a product
// @route  Delete /api/products/:id
// @access Admin/Private

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

// @description: Create a product
// @route  POST /api/products
// @access Admin/Private

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    description: 'sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @description: Update a product
// @route  PUT /api/products/:id
// @access Admin/Private

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    restart.status(404);
    throw new Error('Product not Found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
