import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux/es';

const Product = ({ product, qty }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandler = (product) => {
    dispatch(addToCart(product, userInfo, 1));
  };

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

        {/* <Button
          variant="primary"
          onClick={() => dispatch(addToCart(product._id, 1))}
        >
          Add to Cart
        </Button> */}
        {!qty ? (
          <Button
            variant="primary"
            onClick={() => addToCartHandler(product._id, 1)}
          >
            Add to Cart
          </Button>
        ) : (
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: '.5rem' }}
          >
            <div
              className="d-flex align-items-center justify-content-column"
              style={{ gap: '.5rem' }}
            >
              <Button> -</Button>
              <div>
                <span className="fs-3">{qty}</span>
              </div>
              <Button>+</Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
