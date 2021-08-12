import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/product";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    console.log("AllProducts Component Mounted!!");
    this.props.fetchAllProducts();
  }

  render() {
    if (!this.props.products) return <h4>Loading...</h4>;

    return (
      <div>
        <h2>All Products</h2>
        {this.props.products.map((product) => {
          return (
            <ul key={product.id}>
              <li>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
              <li>
                <Link to={`/products/${product.id}`}>{product.picture}</Link>
              </li>
              <button className="addToCart">Add to Cart</button>
              <button className="addToWishList">Add to Wishlist</button>
            </ul>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { fetchAllProducts };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
