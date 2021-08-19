import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { myPastOrders } from "../store";
import { Link } from "react-router-dom";
import PastCart from "./PastCart"
/**
 * COMPONENT
 */
class History extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const myName = this.props.match.params.id;
    await this.props.loadHistoryData(myName);
  }

  render() {
    console.log("My carts component props~~~", this.props);
    const myHistory = this.props.pastOrders
    const username = this.props.match.params.id
    return (
      <div>
      <div className="cartBar">
        <div>
          <h3>{username}'s Past Orders</h3>
        </div>
        </div>
        <div className="historyCartStyle">
          {myHistory.pastOrders ? (
            myHistory.pastOrders.map((cart) => {
              return (
                <PastCart 
                cartId = {cart.id} key={cart.id} updated={cart.updatedAt}/>
              );
            })
          ) : (
            <div>You have not placed any orders</div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    pastOrders: state.pastOrders,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadHistoryData(username) {
      dispatch(myPastOrders(username));
    },
  };
};

export default connect(mapState, mapDispatch)(History);