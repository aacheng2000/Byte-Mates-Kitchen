import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_KNIVES = "SET_KNIVES";
const SET_FORKS = "SET_FORKS";
const SET_SPOONS = "SET_SPOONS";
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EDIT_SINGLEPRODUCT = "EDIT_SINGLEPRODUCT";

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const setKnives = (knives) => ({ type: SET_KNIVES, knives });
const setForks = (forks) => ({ type: SET_FORKS, forks });
const setSpoons = (spoons) => ({ type: SET_SPOONS, spoons });
const addProduct = (newProduct) => ({ type: ADD_PRODUCT, newProduct });
const deleteProduct = (singleProductId) => ({
  type: DELETE_PRODUCT,
  singleProductId,
});
const editSingleProduct = (singleProduct) => ({
  type: EDIT_SINGLEPRODUCT,
  singleProduct,
});
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

export const fetchAllKnives = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/category/knives");
    return dispatch(setKnives(res.data));
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

export const fetchAllSpoons = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/category/spoons");
    return dispatch(setSpoons(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const addNewProduct = (newProduct) => async (dispatch) => {
  try {
    const res = (await axios.post("/api/products", newProduct)).data;
    return dispatch(addProduct(res));
  } catch (err) {
    console.log(err);
  }
};

export const deleteSingleProduct = (singleProductId) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${singleProductId}`);
    return dispatch(deleteProduct(singleProductId));
  } catch (err) {
    console.log(err);
  }
};

export const updateSingleProduct = (singleProduct, id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/${id}`, singleProduct);
    return dispatch(editSingleProduct(res.data));
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
    case SET_KNIVES:
      return action.knives;
    case SET_FORKS:
      return action.forks;
    case SET_SPOONS:
      return action.spoons;
    case ADD_PRODUCT:
      return [...state, action.newProduct];
    case DELETE_PRODUCT:
      return [...state].filter(
        (product) => product.id !== action.singleProductId
      );
    case EDIT_SINGLEPRODUCT:
      return state.map((product) =>
        product.id === action.singleProduct.id ? action.singleProduct : product
      );
    default:
      return state;
  }
}
