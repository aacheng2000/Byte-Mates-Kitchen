import React, {Component} from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import AllProducts from "./AllProducts";
import {myCart} from '../store'
import AllUsers from "./AllUsers";


/**
 * COMPONENT
 */



class Home extends Component  {
  componentDidMount(){
    this.props.loadCartData(
      this.props.username
      )
  }

  render(){
  const { username } = this.props;
  const token = window.localStorage.getItem("token");


  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AllUsers />
    </div>
  );
};
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};
const mapDispatch = dispatch => {
  return {
    loadCartData(username) {
      dispatch(myCart(username))
    }
  }
}

export default connect(mapState, mapDispatch)(Home);
