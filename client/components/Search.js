import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCatalog } from "../store";
import { addOrder } from "../store/order";
import { myCart } from "../store";
import { addWishlistItem } from "../store/allWishlists";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    console.log('search component did mount happened')
    this.props.fetchCatalog();
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
    console.log("this is the search props!!~~~~~~~~", this.props);
    if (!this.props.catalog) return <h4>Loading...</h4>;
    return (
      <div>
        <h2>Products Search</h2>
        <h2>
          Search Results:{" "}
          {
            this.props.catalog.filter((z) =>
              z.name
                .toUpperCase()
                .includes(this.props.match.params.id.toUpperCase())
            ).length
          }
        </h2> 
        <div id="navBar"></div>
        <div id="productContainer">
          {this.props.match.params.id === "undefined"
            ? null
            : this.props.catalog
                .filter((z) =>
                  z.name
                    .toUpperCase()
                    .includes(this.props.match.params.id.toUpperCase())
                )
                .map((product) => {
                  return (
                    <div id="productItem" key={product.id}>
                      <center>
                        <div>
                          <div id="productName">
                            <Link to={`/products/${product.id}`}>
                              {product.name}
                            </Link>
                            <Link to={`/products/singleproduct/${product.id}`}>
                              ${product.price}
                            </Link>
                          </div>
                          <div>
                            <a href={`/products/${product.id}`}>
                              <div id="picSquare">
                                <img
                                  id="productImage"
                                  src={product.picture}
                                ></img>
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
                          <button
                            onClick={() => this.addToWishlist(product.id)}
                            className="addToWishList"
                          >
                            Add to Wishlist
                          </button>
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
const mapDispatchToProps = {
  fetchCatalog,
  addOrder,
  myCart,
  addWishlistItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
