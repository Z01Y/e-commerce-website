import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { addToCart } from '../actions/cartActions';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">
          <div className="my-3">${product.price}</div>
        </Card.Text>

        <Button variant="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
