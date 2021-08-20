import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import History from "./components/History"
import GuestCart from "./components/GuestCart";
import AllProducts from "./components/AllProducts";
import AdminProducts from "./components/AdminProducts";
import AddProduct from "./components/AddProduct";
import AllForks from "./components/AllForks";
import AllKnives from "./components/AllKnives";
import AllSpoons from "./components/AllSpoons";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";
import Complete from "./components/Complete";
import { fetchTotal, me, myCart } from "./store";
import SingleUser from "./components/SingleUser";
import EditUser from "./components/EditUser";

import Wishlist from "./components/Wishlist";

import AllUsers from "./components/AllUsers";

import Search from "./components/Search";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart/:id" component={Cart} />
            <Route path="/products/:idx?" exact component={AllProducts} />
            <Route path="/history/:id" component={History} />
            <Route path="/adminproducts" exact component={AdminProducts} />
            <Route path="/addproducts" exact component={AddProduct} />
            <Route path="/category/forks" exact component={AllForks} />
            <Route path="/category/knives" exact component={AllKnives} />
            <Route path="/category/spoons" exact component={AllSpoons} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route exact path="/users/edit/:id" component={EditUser} />
            <Route
              exact
              path="/products/singleproduct/:productId"
              component={SingleProduct}
            />
            <Route exact path="/checkout/:id" component={Checkout} />
            <Route exact path="/complete" component={Complete} />
            <Route exact path="/wishlist/:id" component={Wishlist} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/cart" component={GuestCart} />
            <Route exact path="/products/:idx?" component={AllProducts} />
            <Route path="/category/forks" exact component={AllForks} />
            <Route path="/category/knives" exact component={AllKnives} />
            <Route path="/category/spoons" exact component={AllSpoons} />
            <Route path="/search/:id" component={Search} />
            <Route
              exact
              path="/products/singleproduct/:productId"
              component={SingleProduct}
            />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchTotal());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
