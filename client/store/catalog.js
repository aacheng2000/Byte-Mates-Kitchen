import axios from "axios";

/**
 * ACTION TYPES
 */
const FETCH_CATALOG = "FETCH_CATALOG";

/**
 * ACTION CREATORS
 */
const setCatalog = (products) => ({ type: FETCH_CATALOG, products });

/**
 * THUNK CREATORS
 */
export const fetchCatalog = () => async (dispatch) => {
  try {
    console.log('I am being used catalog!!!!!!!!!!!!!!!!!!!')
    const res = await axios.get("/api/products/fullCatalog");
    return dispatch(setCatalog(res.data));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CATALOG:
      return action.products;
    default:
      return state;
  }
}
