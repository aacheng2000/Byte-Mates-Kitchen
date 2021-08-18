import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_WISHLIST = "SET_WISHLIST";
const DELETE_ITEM = "DELETE_ITEM";
const ADD_ITEM = "ADD_ITEM"

/**
 * ACTION CREATORS
 */
const setWishlists = (wishlists) => ({ type: SET_WISHLIST, wishlists });
const deleteItem = (itemId) => ({ type: DELETE_ITEM, itemId})
const addItem = (itemInfo) => ({ type: ADD_ITEM, itemInfo})


/**
 * THUNK CREATORS (STARTS HERE)
 */
export const fetchWishlists = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/wishlists/${username}`);
    return dispatch(setWishlists(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteWishlistItem = (itemId) => async (dispatch) => {
  try {  
    await axios.delete(`/api/wishlists/delete/${itemId}`);
    return dispatch(deleteItem(itemId));
  } catch (err) {
    console.log(err)
  }
};

export const addWishlistItem = (itemInfo) => async (dispatch) => {
  const res = await axios.post(`/api/wishlists/add`, itemInfo);
  return dispatch(addItem(res.data));
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_WISHLIST: return action.wishlists;
    case DELETE_ITEM: return [...state].filter((item) => item.id !== action.itemId)
    case ADD_ITEM: return [...state,action.itemInfo]
    default: return state;
  }
}
