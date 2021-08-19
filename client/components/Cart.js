import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { myCart, myOrders, deleteOrder } from "../store";
import { Link } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
/**
 * COMPONENT
 */
class Cart extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const myName = this.props.match.params.id;
    await this.props.loadOrderData(myName);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.orders.length !== this.props.orders.length) {
      const myName = this.props.match.params.id;
      await this.props.loadOrderData(myName);
    }
  }

  async deleteFunc(orderId) {
    await this.props.deleteOrderThunk(orderId);
  }

  render() {
    console.log("My carts component props~~~", this.props);
    console.log('look here!!!!', window.localStorage.getItem('token'))
    const username = this.props.match.params.id;
    const allOrders = this.props.orders;
    return (
      <div>
      <div className="cartBar">
        <div>
          <h3>Welcome to your cart, {username}</h3>
          <h3>Contents of your cart:</h3>
        </div>
        <div>
          <div>
            <div>
              Subtotal ({allOrders[0] ? allOrders.length : "0"} items): $
              {allOrders
                .reduce((acc, cur) => {
                  return acc + cur.product.price * 1 * cur.quantity;
                }, 0)
                .toLocaleString("en-US")}
            </div>
            {allOrders[0] ? (
              <Link to={`/checkout/${username}`}>
                <button className="cartBtn">Proceed to Checkout</button>
              </Link>
            ) : (
              <button>Add Items to Proceed</button>
            )}
          </div>
        </div>
        </div>
        <div className="cartStyle">
          {allOrders[0] ? (
            allOrders.map((order) => {
              return (
                <div key={order.id} className="cartItemStyle">
                  <div>
                    <img src={order.product.picture} />
                  </div>
                  <div className="cartItemDetails">
                    <div>
                      <Link to={`/products/${order.product.id}`}>
                        {order.product.name}
                      </Link>
                    </div>
                    <div>${order.product.price}</div>
                    <QuantityCounter
                      quantity={order.quantity}
                      orderId={order.id}
                      username={username}
                    />
                    <div>
                      <button
                        className="cartBtn"
                        onClick={() => this.deleteFunc(order.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Your cart is empty</div>
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
    cart: state.cart,
    orders: state.order,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadCartData(username) {
      dispatch(myCart(username));
    },
    loadOrderData(username) {
      dispatch(myOrders(username));
    },
    deleteOrderThunk(orderId) {
      dispatch(deleteOrder(orderId));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
