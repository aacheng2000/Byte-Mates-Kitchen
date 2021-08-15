import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import {addOrder} from "../store/order"
import {myCart} from '../store'

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  async addToCart(_productId) {
    await this.props.myCart(this.props.auth.username)
    this.props.addOrder({cartId: this.props.cart.id, productId: _productId});
  }

  render() {
    console.log('all Products props!!~~~~~~~~', this.props)
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
                <a href={`/products/${product.id}`}>
                  <img src={product.picture}></img>
                </a>
              </li>
              <button onClick={() =>
            this.addToCart(product.id)
          } className="addToCart">Add to Cart</button>
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
const mapDispatchToProps = { fetchAllProducts, addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
