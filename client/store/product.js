import axios from "axios";
import history from "../history";

const initialState = {
  products: [],
};

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
    const { data } = await axios.get("/api/products");
    return dispatch(setProducts);
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
