import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  EMPTY_CART,
} from '../constants/cartConstants';

export const addToCart =
  (id, user, qty = 1) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        qty,
      },
    });

    if (!user) {
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
      // } else {
      //   // save into database
      //   const response = await axios.post('/api/cart', {
      //     product: {
      //       id: product._id,
      //       name: product.name,
      //       image: product.image,
      //       price: product.price,
      //     },
      //     qty: qty,
      //     user: user._id,
      //   });
    }
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const emptyLocalCart = () => (dispatch, getState) => {
  dispatch({
    type: EMPTY_CART,
  });
  // let items = [];
  // localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.removeItem('cartItems');
};
