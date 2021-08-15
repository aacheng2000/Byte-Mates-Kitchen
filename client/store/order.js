import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/**
 * ACTION CREATORS
 */
const setOrders = (cart) => ({ type: SET_ORDERS, cart });
const setAddOrder = (orderDetails) => ({ type: ADD_ORDER, orderDetails });
const setDeleteOrder = (orderId) => ({ type: DELETE_ORDER, orderId });
const setQuantityUpdate = (details) => ({ type: DELETE_ORDER, details });

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

export const updateQuantity = (orderId, num) => async (dispatch) => {
  await axios.put(`/api/orders/quantity/${orderId}`, {quantity: `${num}`});
  const details = {orderId, num}
  return dispatch(setQuantityUpdate(details));
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.cart;
    case ADD_ORDER:
      return [...state, action.orderDetails];
    case DELETE_ORDER:
      return [...state].filter((order) => order.id !== action.orderId)
    case UPDATE_QUANTITY:
      return [...state].map((order) => {
        if(order.id === action.details.id) order.quantity = action.details.num
        return order
      })
    default:
      return state;
  }
}