import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  UPDATE_CART_ITEM,
  INITIALIZE_CART,
} from '../constants/cartConstants';

export const initializeCart = (cart) => {
  return {
    type: INITIALIZE_CART,
    payload: cart,
  };
};

export const addToCart = (id, user, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  if (getState().cart && getState().cart.cart) {
    const existingProduct = getState().cart.cart.find(
      (product) => product.product._id === data._id
    );

    if (existingProduct) {
      // If it is, update the quantity
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: {
          productId: data._id,
          qty: existingProduct.qty + qty,
        },
      });
    } else {
      // If not, add the product to the cart
      dispatch({
        type: ADD_TO_CART,
        payload: {
          product: data,
          qty: qty,
        },
      });
    }
  } else {
    dispatch({
      type: INITIALIZE_CART,
      payload: [
        {
          product: data,
          qty: qty,
        },
      ],
    });
  }

  if (!user) {
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  } else {
    // save into database

    await axios.post(
      '/api/cart',
      {
        productId: data._id,
        user: user._id,
      },
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token,
        },
      }
    );
  }
};

export const removeFromCart = (id, user) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  if (!user) {
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  } else {
    await axios.delete(
      '/api/cart',
      {
        productId: data._id,
        user: user._id,
      },
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token,
        },
      }
    );
  }
};

export const fetchCart = (id, user) => async (dispatch, getState) => {
  const { data } = await axios.get(`api/products/${id}`);

  dispatch({
    type: FETCH_CART,
    payload: data.products,
  });
};

// export const emptyLocalCart = () => (dispatch, getState) => {
//   dispatch({
//     type: EMPTY_CART,
//   });
//   // let items = [];
//   // localStorage.setItem('cartItems', JSON.stringify(items));
//   localStorage.removeItem('cartItems');
// };

// import axios from 'axios';
// import {
//   ADD_TO_CART,
//   REMOVE_FROM_CART,
//   FETCH_CART,
// } from '../constants/cartConstants';

// // add item to local storage if the user is not logged in,
// // otherwise add it to the cart on the backend
// export const addToCart = (item) => (dispatch, getState) => {
//   const { isAuthenticated } = getState().user;

//   if (!isAuthenticated) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart = [...cart, item];
//     localStorage.setItem('cart', JSON.stringify(cart));
//   } else {
//     axios
//       .post('/api/cart', item)
//       .then((res) => {
//         dispatch({ type: ADD_TO_CART, payload: res.data });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// };

// // remove item from the local storage cart or the backend cart
// export const removeFromCart = (item) => (dispatch, getState) => {
//   const { isAuthenticated } = getState().user;

//   if (!isAuthenticated) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart = cart.filter((i) => i._id !== item._id);
//     localStorage.setItem('cart', JSON.stringify(cart));
//   } else {
//     axios
//       .delete(`/api/cart/${item._id}`)
//       .then((res) => {
//         dispatch({ type: REMOVE_FROM_CART, payload: res.data });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// };
