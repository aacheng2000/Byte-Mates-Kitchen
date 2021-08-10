import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { logout } from "../store";
import AllProducts from "./AllProducts";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Byte-Mates-Kitchen</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          {/* <Link to="/products">All Products</Link> */}
          <Router>
            <Link to="/products">All Products</Link>
            <Switch>
              <Route path="/products" exact component={AllProducts} />
            </Switch>
          </Router>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
