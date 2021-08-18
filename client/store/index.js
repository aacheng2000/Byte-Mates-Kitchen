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
import user from './users';
import wishlists from './allWishlists';

const reducer = combineReducers({
  auth,
  cart,
  products,
  singleProduct,
  users,
  order,
  user,
  wishlists
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
export * from "./allWishlists";
