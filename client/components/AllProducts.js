import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import { addOrder } from "../store/order";
import { myCart } from "../store";
import { addWishlistItem } from "../store/allWishlists";
import axios from "axios";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: [], total: 0 };
  }

  computeIdx() {
    return this.props.match.params.idx ? this.props.match.params.idx * 1 : 0;
  }
  async fetchPage() {
    const products = (await axios.get(`/api/products/${this.computeIdx()}`))
      .data.products;
    this.setState({ products });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.idx !== this.props.match.params.idx) {
      this.fetchPage();
    }
  }
  componentDidMount() {
    console.log("All Product Component Mounted!!");
    this.props.fetchAllProducts();
    this.fetchPage();
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

  async addToWishlist(_productId) {
    console.dir(this.props.auth);
    await this.props.myCart(this.props.auth.username);

    const countExisting = this.props.wishlists.filter(
      (x) => x.productId === _productId
    ).length;

    console.log("coutn existing = " + countExisting);

    this.props.addWishlistItem({
      userId: this.props.cart.userId,
      productId: _productId,
    });
  }

  render() {
    console.log("all Products props!!~~~~~~~~", this.props);

    const { products } = this.state;
    const pageCount = Math.ceil(this.props.total / 8);
    const pages = new Array(pageCount).fill("-").map((_, idx) => {
      return {
        idx,
        text: idx + 1,
      };
    });

    if (!this.props.products) return <h4>Loading...</h4>;
    return (
      <div>
        <h2>All Products</h2>
        <div id="navBar">
          <div className="nav-btn">
            <Link to="/category/knives">All Knives</Link>
            <Link to="/category/forks">All Forks</Link>
            <Link to="/category/spoons">All Spoons</Link>
          </div>
        </div>
        <div id="productContainer">
          {products.map((product) => {
            return (
              <div id="productItem" key={product.id}>
                <center>
                  <div>
                    <div id="productName">
                      <Link to={`/products/singleproduct/${product.id}`}>
                        {product.name}
                      </Link>
                      <Link to={`/products/singleproduct/${product.id}`}>
                        ${product.price}
                      </Link>
                    </div>
                    <div>
                      <a href={`/products/singleproduct/${product.id}`}>
                        <div id="picSquare">
                          <img id="productImage" src={product.picture}></img>
                        </div>
                      </a>
                    </div>
                    <div>
                      <button
                        onClick={() => this.addToCart(product.id)}
                        className="addToCart"
                      >
                        Add to Cart
                      </button>
                      {this.props.auth.username ? (
                        <button
                          onClick={() => this.addToWishlist(product.id)}
                          className="addToWishList"
                        >
                          Add to Wishlist
                        </button>
                      ) : null}
                    </div>
                  </div>
                </center>
              </div>
            );
          })}
        </div>
        <ul className="pager">
          {pages.map((page) => {
            return (
              <li key={page.idx} className="selected">
                <Link to={`/products/${page.idx}`}>{page.text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = {
  fetchAllProducts,
  addOrder,
  myCart,
  addWishlistItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
