import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
/**
 * COMPONENT
 */
class GuestCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        storageProduct: []
    }
  }

  componentDidMount() {
    this.props.fetchAllProducts();
    const storageList = JSON.parse(window.localStorage.getItem('cart'))
    this.setState({storageProduct: storageList.product});
  }

  deleteItem(productId) {
    const storageList = JSON.parse(window.localStorage.getItem('cart'))
    const newList = storageList.product.filter((item) => {
        return item !== productId
    })
    window.localStorage.setItem('cart', JSON.stringify({product: newList}))
    this.setState({storageProduct: newList})
  }

  render() {
    console.log("My carts component props~~~", this.state);
    const stateProducts = this.state.storageProduct
    const cartList = this.props.productCatalog.filter((product) => {
        return stateProducts.includes(product.id)
    })
    const totalPrice = cartList.reduce((acc, cur) => {
        return acc + cur.price * 1;
      }, 0)
      .toLocaleString("en-US")
    return (
      <div>
        <div className="cartBar">
            <div>
                <h3>Welcome to your cart</h3>
                <h3>Contents of your cart:</h3>
            </div>
            <div>
                <div>
                Subtotal ({stateProducts.length} items): $
                {totalPrice}
                </div>
                {stateProducts ? (
                <Link to={`/signup`}>
                    <button className="cartBtn">Signup to Checkout</button>
                </Link>
                ) : (
                <button>Add Items to Proceed</button>
                )}
            </div>
        </div>
        <div className="cartStyle">
          {cartList[0] ? (
            cartList.map((cartItem) => {
              return (
                <div key={cartItem.id} className="cartItemStyle">
                  <div>
                    <img src={cartItem.picture} />
                  </div>
                  <div className="cartItemDetails">
                    <div>
                      <Link to={`/products/${cartItem.id}`}>
                        {cartItem.name}
                      </Link>
                    </div>
                    <div>${cartItem.price}</div>
                    <div>
                      <button
                        className="cartBtn"
                        onClick={() => this.deleteItem(cartItem.id)}>
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
      productCatalog: state.products
  };
}

const mapDispatch = { fetchAllProducts };

export default connect(mapState, mapDispatch)(GuestCart);