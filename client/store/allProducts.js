import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_FORKS = "SET_FORKS";
/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const setForks = (forks) => ({ type: SET_FORKS, forks });

/**
 * THUNK CREATORS
 */
export const fetchAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    return dispatch(setProducts(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllForks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/category/forks");
    return dispatch(setForks(res.data));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case SET_FORKS:
      return action.forks;
    default:
      return state;
  }
}
