import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import cart from "./cart";
import products from "./allProducts";
import singleProduct from "./singleProduct";
import order from "./order";
import users from "./users";
import user from "./singleUser";
import wishlists from "./allWishlists";
import pastOrders from './pastOrders';
import catalog from './catalog'
import axios from "axios";

const totalReducer = (state = 0, action) => {
  if (action.type === "SET_TOTAL") {
    return action.total;
  }
  return state;
};

export const fetchTotal = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");
    dispatch({ type: "SET_TOTAL", total: response.data.total });
  };
};


const reducer = combineReducers({
  auth,
  cart,
  products,
  singleProduct,
  users,
  order,
  user,
  wishlists,
  total: totalReducer,
  pastOrders,
  catalog
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./cart";
export * from "./allProducts";
export * from "./singleProduct";
export * from "./order";
export * from "./users";
export * from "./singleUser";
export * from "./allWishlists";
export * from "./pastOrders"
export * from "./catalog"