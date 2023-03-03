// import React, { useEffect } from 'react';
// import { Link, useLocation, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
//   Card,
//   Modal,
// } from 'react-bootstrap';
// import Message from '../components/Message';
// import { addToCart, removeFromCart } from '../actions/cartActions';

// const Cart = () => {
//   const params = useParams();
//   const productId = params.id;

//   const { search } = useLocation();

//   const qty = search ? Number(search.split('=')[1]) : 1;

//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart(productId, qty));
//     }
//   }, [dispatch, productId, qty]);

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const navigate = useNavigate();

//   const checkoutHandler = () => {
//     navigate(`/login?redirect=${'/cart'}`);
//   };

//   return (
//     <>
//       <Col>
//         {cart.length === 0 ? (
//           <Message>Your cart is empty</Message>
//         ) : (
//           <ListGroup variant="flush">
//             {cart.map((item) => (
//               <ListGroup.Item key={item.product}>
//                 <Row>
//                   <Col>
//                     <Image src={item.image} alt={item.name} fluid rounded />
//                   </Col>
//                   <Col>
//                     <Link to={`/product/${item.product}`}>{item.name}</Link>
//                   </Col>
//                   <Col>${item.price}</Col>
//                   <Col>
//                     <Form.Control
//                       as="select"
//                       value={item.qty}
//                       onChange={(e) =>
//                         dispatch(
//                           addToCart(item.product, Number(e.target.value))
//                         )
//                       }
//                     >
//                       {[...Array(10).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Col>
//                   <Col md={2}>
//                     <Button
//                       type="button"
//                       variant="light"
//                       onClick={() => removeFromCartHandler(item.product)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Col>
//       <Col>
//         <Card>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>
//                 Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)}) items
//               </h2>
//               $
//               {(<i class="fa fa-cart-plus" aria-hidden="true"></i>)
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Button
//                 type="button"
//                 className="btn-block"
//                 disabled={cart.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed to Checkout
//               </Button>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </Col>
//     </>
//   );
// };

// export default Cart;

import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = () => {
  const params = useParams();
  const productId = params.id;
  const { search } = useLocation();
  const qty = search ? Number(search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    if (Array.isArray(state.cart)) {
      return state.cart;
    } else {
      return state.cart.cart;
    }
  });
  // => {
  //   if (state.cart.cart) {
  //     return state.cart.cart;
  //   }
  //   return state.cart;
  // });
  console.log('cart model cart', cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate(`/login?redirect=${'/cart'}`);
  };

  return (
    <>
      <Col>
        {cart.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroup.Item key={item.product._id}>
                <Row>
                  <Col>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product._id}`}>
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col>${item.product.price}</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item._id, Number(e.target.value)))
                      }
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              $
              <i className="fa fa-cart-plus" aria-hidden="true">
                {cart
                  .reduce((acc, item) => {
                    console.log(item);
                    return acc + item.qty * item.product.price;
                  }, 0)
                  .toFixed(2)}
              </i>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </>
  );
};

export default Cart;
