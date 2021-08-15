import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Link } from "react-router-dom";
import { logout } from "../store";
//import UP, PUBLIC FOLDER, STYLE.CSS
//import '.../public/style.css'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="wholeBar">
      <div id="leftColumn" className="image-with-link-to-main-page">
        <a href = "/home"><img src = "./group.png" id="pic4"></img></a></div>
      <span id = "rightColumn">
      <div id="navTitle">Byte-Mates-Kitchen</div>
      <nav id = "navBar">
      <div className="nav-btn" id="all-products">
        <Link to="/products">All Products<img src = "square.png" class = "imgNav"></img></Link>
      </div>
      {/*<div><a className = "nav-btn" href = "/products">All Products<img src = "square.png" class = "imgNav"></img></a></div>*/}
      <div className="search-bar">
        <input
          type="text"
          id="header-search"
          placeholder="Search product.."
          name="s"
        />
        <button id="searchButton" type="submit">Search</button>
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

          <div className="nav-btn" id="all-products">
            <Link to="/login">Sign In / Track Order
            <img src = "admin.png" class = "imgNav">
            </img></Link>
          </div>
          
          {/*  <div><a className = "nav-btn" href = "/login">Sign In / Track Order<img src = "admin.png" class = "imgNav"></img></a></div> */}

          <div className="nav-btn" id="all-products">
            <Link to="/signup">Sign Up
            <img src = "arrow.png" class = "imgNav">
            </img></Link>
          </div>
            

          {/*  <div><a className = "nav-btn" href = "/signup">Sign up<img src = "arrow.png" class = "imgNav"></img></a></div> */}
            
            

              
          
          
      {/* this was originally here   )}          */}
      
      {/*<div>*/}
      
          <div className="nav-btn">
            <Link to="/wishlist">Wishlist
            <img src = "heart.png" class = "imgNav">
            </img></Link>
          </div>
          
          <div className="nav-btn">
            <Link to="/cart">Cart
            <img src = "cart.png" class = "imgNav">
            </img></Link>
          </div>
          
      {/* <a class = "nav-btn" href = "/wishlist">Wishlist<img src = "heart.png" class = "imgNav"></img></a>
      <a class = "nav-btn" href = "/cart">Cart<img src = "cart.png" class = "imgNav"></img></a> */}
      

      {/*</div>*/}
      </div>
   )}
   </div>

    </nav>
    </span>
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
