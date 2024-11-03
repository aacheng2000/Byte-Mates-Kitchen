import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllForks } from "../store/allProducts";
import { addOrder } from "../store/order";
import { addWishlistItem } from "../store/allWishlists";
import { myCart } from "../store";

class AllForks extends React.Component {
  constructor() {
    super();
    this.state = { forks: null };
  }

  componentDidMount() {
    console.log("AllForks Component Mounted!!");
    this.props.fetchAllForks();
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
    if (!this.props.products) return <h4>Loading...</h4>;

    return (
      <div>
        <h1 className="homeTitle">Our Forks Selection</h1>
        <div id="homeTableCategory">
          <Link to="/products" className="homeItem">
            <div>Shop All Products</div>
          </Link>
        </div>
        <div id="homeTableCategory">
          <div id="homeTableFirstRow">
            <div>
              <Link to="/category/knives" className="homeItem">
                <div>Shop Knives</div>
                <img src="knifie.png" />
              </Link>
            </div>
            <div>
              <Link to="/category/forks" className="homeItem">
                <div>Shop Forks</div>
                <img src="forkie.png" />
              </Link>
            </div>
            <div>
              <Link to="/category/spoons" className="homeItem">
                <div>Shop Spoons</div>
                <img src="spoonie.png" />
              </Link>
            </div>
          </div>
        </div>

        <div id="productContainer">
          {this.props.products.map((fork) => {
            return (
              <div id="productItem" key={fork.id}>
                <center>
                  <div>
                    <div id="productName">
                      <Link to={`/products/singleproduct/${fork.id}`}>
                        {fork.name}
                      </Link>
                    </div>
                    <div>
                      <a href={`/products/singleproduct/${fork.id}`}>
                        <div id="picSquare">
                          <img id="productImage" src={fork.picture}></img>
                        </div>
                      </a>
                    </div>
                    <div id="productPrice">
                      <Link to={`/products/singleproduct/${fork.id}`}>
                        ${fork.price}
                      </Link>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.addToCart(fork.id)}
                      className="addToCart"
                    >
                      Add to Cart
                    </button>
                    {this.props.auth.username ? (
                      <button
                        onClick={() => this.addToWishlist(fork.id)}
                        className="addToWishList"
                      >
                        Add to Wishlist
                      </button>
                    ) : null}
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
const mapDispatchToProps = { addWishlistItem, fetchAllForks, addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(AllForks);
