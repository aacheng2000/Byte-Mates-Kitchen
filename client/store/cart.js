import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

/**
 * ACTION CREATORS
 */
const setCart = user => ({type: SET_CART, user})

/**
 * THUNK CREATORS
 */
export const myCart = (userName) => async dispatch => {
    const token = window.localStorage.getItem('token')
  if (token) {
    const res = await axios.get(`/api/carts/${userName}`)
    return dispatch(setCart(res.data))
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.user
    default:
      return state
  }
}
