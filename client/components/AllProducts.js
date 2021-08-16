import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import { addOrder } from "../store/order";
import { myCart } from "../store";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  async addToCart(_productId) {
    await this.props.myCart(this.props.auth.username);

    this.props.addOrder({ cartId: this.props.cart.id, productId: _productId });
  }

  render() {
    console.log("all Products props!!~~~~~~~~", this.props);
    if (!this.props.products) return <h4>Loading...</h4>;
    return (
      <div>
        <h2>All Products</h2>
        <div id="productContainer">
          {this.props.products.map((product) => {
            return (
              <div id="productItem" key={product.id}>
                <center>
                  <div>
                    <div id="productName">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </div>
                    <div>
                      <a href={`/products/${product.id}`}>
                        <div id="picSquare">
                          <img id="productImage" src={product.picture}></img>
                        </div>{" "}
                        {/* Zoe, added image tag - not sure if you like this */}
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.addToCart(product.id)}
                      className="addToCart"
                    >
                      Add to Cart
                    </button>
                    <button className="addToWishList">Add to Wishlist</button>
                  </div>
                </center>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { fetchAllProducts, addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
