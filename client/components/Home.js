import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { myCart } from "../store";

/**
 * COMPONENT
 */

class Home extends Component {
  
  componentDidMount() {

    this.props.loadCartData(this.props.username)
    
   // const myName =  this.props.match.params.id
  //  this.props.loadOrderData(myName)
    
      //      const allOrders2 = this.props.orders
       //     alert('==' + allOrders2.length)
  }


    this.props.loadCartData(this.props.username);
    // this.props.loadCartData(
    //   this.props.username
    // )
  }

    
    
    
  render() {
    const { username, isLoggedIn } = this.props;
    const token = window.localStorage.getItem("token");

    return (
      <div>
        <h3>Welcome, {username}</h3>
        <div id="homeTableCategory">
          <div id="homeTableFirstRow">
            <Link to="/category/knives">All Knives</Link>
            <Link to="/category/forks">All Forks</Link>
            <Link to="/category/spoons">All Spoons</Link>
          </div>
        </div>
        {/* 
        <table id="homeTableCategory">
          <thead>
            <tr id="homeTableFirstRow">
              <td>Knives </td>
              <td>Forks </td>
              <td>Spoons </td>
            </tr>
          </thead>
        </table> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    order: state.order
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCartData(username) {
      dispatch(myCart(username));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
