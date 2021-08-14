import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      <h4 className="image-with-link-to-main-page">
        <Link to="/home">
          image 'Byte mates kitchen' with link to main page
        </Link>
      </h4>
      <div className="nav-btn" id="all-products">
        <Link to="/products">All Products</Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          id="header-search"
          placeholder="Search product.."
          name="s"
        />
        <button type="submit">Search</button>
      </div>
      <div className="logged-or-not">
        {isLoggedIn ? (
          <div id="logged-nav">
            {/* The navbar will show these links after you log in */}
            
            <div className="dropdown">
              <Link to="/home"><button className="nav-btn">Home</button></Link>
                <div className="dropdown-content">
                  <a href="#">Profile settings</a>
                  <a href="#">Order</a>
                  <a href="#">History</a>
                  <a href="#">Wishlist</a>
                </div>
            </div>
            
            <Link className="nav-btn" to="/cart">
              Cart
            </Link>
            <a className="nav-btn" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div id="unlogged-nav">
            {/* The navbar will show these links before you log in */}

            <Link className="nav-btn" to="/cart">
              Cart
            </Link>
            <Link className="nav-btn" to="/login">
              Login
            </Link>
            <Link className="nav-btn" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
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
