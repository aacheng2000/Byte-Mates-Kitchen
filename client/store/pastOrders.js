import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_PAST_ORDERS = 'SET_PAST_ORDERS';

/**
 * ACTION CREATORS
 */
 const setPastOrders = (pastOrders) => ({ type: SET_PAST_ORDERS, pastOrders });

 /**
 * THUNK CREATORS
 */
export const myPastOrders = (username) => async (dispatch) => {
    const data = (await axios.get(`/api/carts/history/${username}`)).data
    //const res = await axios.get(`/api/orders/${data.id}`);
    console.log('past orders store data: ', data)
    return dispatch(setPastOrders(data));
  };

  /**
 * REDUCER
 */
export default function (state = [], action) {
    switch (action.type) {
      case SET_PAST_ORDERS:
        return {...state, pastOrders: action.pastOrders};
      default:
        return state;
    }
  }