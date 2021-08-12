import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_ORDERS = "SET_ORDERS";

/**
 * ACTION CREATORS
 */
const setOrders = (cart) => ({ type: SET_ORDERS, cart });

/**
 * THUNK CREATORS
 */
export const myOrders = (cart) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await axios.get(`/api/orders/${cart}`);
    return dispatch(setOrders(res.data));
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_ORDERS:
        console.log('MY ACTION REDUCER~~~~~', action.cart[0])
      return action.cart;
    default:
      return state;
  }
}
