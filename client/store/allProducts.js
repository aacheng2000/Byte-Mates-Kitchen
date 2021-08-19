import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_KNIVES = "SET_KNIVES";
const SET_FORKS = "SET_FORKS";
const SET_SPOONS = "SET_SPOONS";
const ADD_PRODUCT = "ADD_PRODUCT";
/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const setKnives = (knives) => ({ type: SET_KNIVES, knives });
const setForks = (forks) => ({ type: SET_FORKS, forks });
const setSpoons = (spoons) => ({ type: SET_SPOONS, spoons });
const addProduct = (newProduct) => ({ type: ADD_PRODUCT, newProduct });

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
    default:
      return state;
  }
}
