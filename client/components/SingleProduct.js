import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = { singleProduct: null };
  }

  componentDidMount() {
    console.log("SingleProduct Component Mounted!!");
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
    console.log("check singleProduct", this.props);
  }

  render() {
    if (!this.props.singleProduct) return <h4>Loading...</h4>;

    return (
      <div>
        <ul key={this.props.singleProduct.id}>
          <li>Name: {this.props.singleProduct.name}</li>
        </ul>
        <button>Add to Cart</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { fetchSingleProduct };

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
