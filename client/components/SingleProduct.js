import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { addOrder } from "../store/order";
import { myCart } from "../store";
import EditProduct from "./EditProduct";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = { singleProduct: null };
    this.addToCart = this.addToCart.bind(this);
    this.singleStyle = {
      display: "flex",
      padding: "10px",
      justifyContent: "space-around",
      alignItems: "center",
      margin: "100px",
    };
  }

  componentDidMount() {
    console.log("SingleProduct Component Mounted!!");
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
  }

  async addToCart(_productId) {
    const loggedIn = this.props.auth.username;
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    if (loggedIn) {
      await this.props.myCart(this.props.auth.username);
      this.props.addOrder({
        cartId: this.props.cart.id,
        productId: _productId,
      });
    } else {
      if (cart) {
        window.localStorage.setItem(
          "cart",
          JSON.stringify({ product: [...cart.product, _productId] })
        );
      } else {
        window.localStorage.setItem(
          "cart",
          JSON.stringify({ product: [_productId] })
        );
      }
    }
    console.log("new cart~~~", JSON.parse(window.localStorage.getItem("cart")));
  }

  render() {
    const { isAdmin } = this.props.auth;

    if (!this.props.singleProduct) return <h4>Loading...</h4>;
    console.log("my single product props~~~~~~~~", this.props);
    return (
      <div>
        <div style={this.singleStyle}>
          <div className="singleProdImage">
            <img src={this.props.singleProduct.picture} />
          </div>
          <div className="singleItemBox" key={this.props.singleProduct.id}>
            <div>Name: {this.props.singleProduct.name}</div>
            <div className="descriptionBox">
              Description: {this.props.singleProduct.description}
            </div>
            <div>Price: ${this.props.singleProduct.price}</div>
            <div>Color: {this.props.singleProduct.color}</div>
            <div className="singleItemBtn">
              <button
                type="submit"
                onClick={() => this.addToCart(this.props.singleProduct.id)}
              >
                Add to Cart
              </button>
              <button>
                <Link to="/products/:idx?">Back to all products</Link>
              </button>
            </div>
          </div>
        </div>

        {isAdmin ? (
          <div>
            <h3>Edit Product Details Below (Admin View) </h3>
            <EditProduct product={this.props.singleProduct} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { fetchSingleProduct, addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
