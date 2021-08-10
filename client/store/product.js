import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = "SET_PRODUCTS";

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });

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

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
