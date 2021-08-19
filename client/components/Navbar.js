import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { myCart } from "../store";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn, username, handleClick, usernameId, user } = this.props;
    console.log('my user:', user);
    return (
      <div id="wholeBar">
        <div id="leftColumn" className="image-with-link-to-main-page">
          <Link to="/home">
            <img src="/group.png" id="pic4"></img>
          </Link>
        </div>

        <span id="rightColumn">
          <div id="navTitle">Byte-Mates-Kitchen</div>

          <nav id="navBar">
            <div className="nav-btn" id="all-products">
              <Link to="/products">
                All Products
                <img src="/square.png" className="imgNav"></img>
              </Link>
            </div>

            <div className="search-bar">
              <input
                type="text"
                id="header-search"
                placeholder="Search product.."
                name="s"
              />
              <button id="searchButton" type="submit">
                Search
              </button>
            </div>

            <div className="logged-or-not">
              {isLoggedIn ? (
                <div id="logged-nav">
                  {/* The navbar will show these links after you log in */}
                  <div className="dropdown">
                    <Link to="/home">
                      <button className="nav-btn">Home</button>
                    </Link>

                    <div className="dropdown-content">

                      <Link to={`/users/${usernameId}`} >
                        Profile details
                      </Link>

                      <a >Orders</a>
                      
                      <Link to={`/wishlist/${username}`} >
                        Wishlist
                      </Link>
                      
                    </div>
                  </div>

                  <Link className="nav-btn" to={`/cart/${username}`}>
                    Cart
                    <img src="/cart.png" className="imgNav"></img>
                  </Link>

                  {user.isAdmin ? (
                    <div className="dropdown">
                      <button className="nav-btn">Admin settings</button>

                      <div className="dropdown-content">
                        <Link to={"/users"}>User profiles</Link>

                        <Link to={"/adminproducts"}>All products (Admin)</Link>

                        <a>All orders</a>
                      </div>
                    </div>
                  ) : null}

                  <a className="nav-btn" onClick={handleClick}>
                    Logout
                    <img src="admin.png" className="imgNav"></img>
                  </a>
                </div>
              ) : (
                <div id="unlogged-nav">
                  {/* The navbar will show these links before you log in */}
                  <div className="nav-btn" id="all-products">
                    <Link to="/login">
                      Sign In / Track Order
                      <img src="admin.png" className="imgNav"></img>
                    </Link>
                  </div>

                  <div className="nav-btn" id="all-products">
                    <Link to="/signup">
                      Sign Up
                      <img src="/arrow.png" className="imgNav"></img>
                    </Link>
                  </div>

               {/*   <div className="nav-btn">
                    <Link to="/wishlist">
                      Wishlist
                      <img src="/heart.png" className="imgNav"></img>
                    </Link>
                  </div>     */}

                  <div className="nav-btn">
                    <Link to="/cart">
                      Cart
                      <img src="/cart.png" className="imgNav"></img>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </span>
        <hr />
      </div>
    );
  }
}



/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    order: state.order,
    usernameId: state.auth.id,
    user: state.auth,
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