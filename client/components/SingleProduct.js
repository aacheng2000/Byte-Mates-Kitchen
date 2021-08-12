import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addOrder } from "../store/order";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = { singleProduct: null };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    console.log("SingleProduct Component Mounted!!");
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
  }

  addToCart(_cartId, _productId) {
    this.props.addOrder({cartId: _cartId, productId: _productId});
    console.log("product added to cart!!");
  }

  render() {
    if (!this.props.singleProduct) return <h4>Loading...</h4>;

    return (
      <div>
        <ul key={this.props.singleProduct.id}>
          <li>Name: {this.props.singleProduct.name}</li>
          <li>Description: {this.props.singleProduct.description}</li>
          <li>Price: ${this.props.singleProduct.price}</li>
          {/* {this.props.singleProduct.color === "N/A" ? } */}
        </ul>
        <button
          type="submit"
          onClick={() =>
            this.addToCart(this.props.cart[0].id, this.props.singleProduct.id)
          }
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { fetchSingleProduct, addOrder };

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
