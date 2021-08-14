import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_ORDERS = "SET_ORDERS";
const ADD_ORDER = "ADD_ORDER";

/**
 * ACTION CREATORS
 */
const setOrders = (cart) => ({ type: SET_ORDERS, cart });
const setAddOrder = (orderDetails) => ({ type: ADD_ORDER, orderDetails });

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

export const addOrder = (orderDetails) => async (dispatch) => {
  const res = await axios.post(`/api/orders/add`, orderDetails);
  return dispatch(setAddOrder(res.data));
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.cart;
    case ADD_ORDER:
      console.log('this is my state.orders~~~~', state)
      return { orders: [...state, action.orderDetails] };
    default:
      return state;
  }
}
