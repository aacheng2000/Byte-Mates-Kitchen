import React, { Component } from "react";
import { connect } from "react-redux";
import { myCart } from '../store';
import AllProducts from "./AllProducts";
import Cart from "./Cart";

/**
 * COMPONENT
 */

class Home extends Component {
  componentDidMount() {
    // this.props.loadCartData(
    //   this.props.username
    // )
  }

  render() {
    const { username } = this.props;
    const token = window.localStorage.getItem("token");

    return (
      <div>
      <h3>Welcome, {username}</h3>

      <table id="homeTableCategory">
        <thead>
          <tr id = "homeTableFirstRow">
            <td>Knives               </td>
            <td>Forks                </td>
            <td>Spoons               </td>
          </tr>
        </thead>
      </table>
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
