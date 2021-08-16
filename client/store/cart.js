import axios from "axios";
import order from "./order";

/**
 * ACTION TYPES
 */
const SET_CART = "SET_CART";
const SET_NEWCART = "SET_NEWCART"

/**
 * ACTION CREATORS
 */
const setCart = (cart) => ({ type: SET_CART, cart });
const setNewCart = (data) => ({ type: SET_NEWCART, data})

/**
 * THUNK CREATORS
 */
export const myCart = (userName) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await axios.get(`/api/carts/${userName}`);
    return dispatch(setCart(res.data));
  }
};

export const placeOrder = (cartId, username) => async (dispatch) => {
  await axios.put(`/api/carts/${cartId}`)
  const {data} = await axios.post(`/api/carts/${username}`)
  return dispatch(setNewCart(data))
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  console.log(`the action is RIGHT HERE~!~!~!~!~!~!`, action)
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case SET_NEWCART:
      return action.data
    default:
      return state;
  }
}
