import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_SINGLEPRODUCT = "SET_SINGLEPRODUCT";

/**
 * ACTION CREATORS
 */

const setSingleProduct = (singleProduct) => ({
  type: SET_SINGLEPRODUCT,
  singleProduct,
});
/**
 * THUNK CREATORS
 */

export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    return dispatch(setSingleProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_SINGLEPRODUCT:
      return action.singleProduct;

    default:
      return state;
  }
}
