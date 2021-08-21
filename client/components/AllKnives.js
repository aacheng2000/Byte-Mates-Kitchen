import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllKnives } from "../store/allProducts";
import { addOrder } from "../store/order";
import { addWishlistItem } from "../store/allWishlists";
import { myCart } from "../store";

class AllKnives extends React.Component {
  constructor() {
    super();
    this.state = { knives: null };
  }

  componentDidMount() {
    console.log("All Knives Component Mounted!!");
    this.props.fetchAllKnives();
  }

  async addToCart(_productId) {
    await this.props.myCart(this.props.auth.username);

    this.props.addOrder({ cartId: this.props.cart.id, productId: _productId });
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
        <h1 className="homeTitle">Our Knives Selection</h1>
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
                <img src="http://localhost:8080/knifie.png" />
              </Link>
            </div>
            <div>
              <Link to="/category/forks" className="homeItem">
                <div>Shop Forks</div>
                <img src="http://localhost:8080/forkie.png" />
              </Link>
            </div>
            <div>
              <Link to="/category/spoons" className="homeItem">
                <div>Shop Spoons</div>
                <img src="http://localhost:8080/spoonie.png" />
              </Link>
            </div>
          </div>
        </div>

        <div id="productContainer">
          {this.props.products.map((knife) => {
            return (
              <div id="productItem" key={knife.id}>
                <center>
                  <div>
                    <div id="productName">
                      <Link to={`/products/singleproduct/${knife.id}`}>
                        {knife.name}
                      </Link>
                    </div>
                    <div>
                      <a href={`/products/singleproduct/${knife.id}`}>
                        <div id="picSquare">
                          <img id="productImage" src={knife.picture}></img>
                        </div>
                      </a>
                    </div>
                    <div id="productPrice">
                      <Link to={`/products/singleproduct/${knife.id}`}>
                        ${knife.price}
                      </Link>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.addToCart(knife.id)}
                      className="addToCart"
                    >
                      Add to Cart
                    </button>
                    {this.props.auth.username ? (
                      <button
                        onClick={() => this.addToWishlist(knife.id)}
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
const mapDispatchToProps = {
  addWishlistItem,
  fetchAllKnives,
  addOrder,
  myCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllKnives);
