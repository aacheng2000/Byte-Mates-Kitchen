import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER'

/**
 * ACTION CREATORS
 */
const setOrders = (cart) => ({ type: SET_ORDERS, cart });
const setAddOrder = (orderDetails) => ({ type: ADD_ORDER, orderDetails });
const setDeleteOrder = (orderId) => ({ type: DELETE_ORDER, orderId });

/**
 * THUNK CREATORS
 */
export const myOrders = (username) => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const data = (await axios.get(`/api/carts/${username}`)).data
    const res = await axios.get(`/api/orders/${data.id}`);
    return dispatch(setOrders(res.data));
  }
};

export const addOrder = (orderDetails) => async (dispatch) => {
  const res = await axios.post(`/api/orders/add`, orderDetails);
  return dispatch(setAddOrder(res.data));
};

export const deleteOrder = (orderId) => async (dispatch) => {
  await axios.delete(`/api/orders/delete/${orderId}`);
  return dispatch(setDeleteOrder(orderId));
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
      return [...state, action.orderDetails];
    case DELETE_ORDER:
      return [...state].filter((order) => order.id !== action.orderId)
    default:
      return state;
  }
}