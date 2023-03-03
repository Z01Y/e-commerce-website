// import {
//   CART_ADD_ITEM,
//   CART_REMOVE_ITEM,
//   EMPTY_CART,
// } from '../constants/cartConstants';

// export const cartReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;
//       const existItem = state.cartItems.find((x) => x.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }

//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };

//     case EMPTY_CART:
//       return {
//         ...state,
//         cartItems: [],
//       };
//     default:
//       return state;
//   }
// };

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CART,
  UPDATE_CART_ITEM,
  INITIALIZE_CART,
  GET_CART,
} from '../constants/cartConstants';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: Array.isArray(state.cart)
          ? [...state.cart, action.payload]
          : [action.payload],
      };

    case UPDATE_CART_ITEM:
      const { productId, qty } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.product._id === productId) {
          return {
            ...item,
            qty: qty,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
      };

    case INITIALIZE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product._id !== action.payload),
      };
    case FETCH_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case GET_CART:
      localStorage.setItem('cartItems', JSON.stringify(action.data));
      console.log(action);
      return {
        ...state,
        cart: action.data,
      };

    default:
      return state;
  }
};
