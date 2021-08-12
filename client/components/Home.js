import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import AllProducts from "./AllProducts";
import AllUsers from "./AllUsers";

/**
 * COMPONENT
 */

export const Home = (props) => {
  const { username } = props;
  //do we need this? const token = window.localStorage.getItem("token");

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AllUsers />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
