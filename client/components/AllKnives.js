import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllKnives } from "../store/allProducts";
import { addOrder } from "../store/order";
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

  render() {
    if (!this.props.products) return <h4>Loading...</h4>;

    return (
      <div>
        <h2>Our Knives Selection</h2>
        <div id="productContainer">
          {this.props.products.map((knife) => {
            return (
              <div id="productItem" key={knife.id}>
                <center>
                  <div>
                    <div id="productName">
                      <Link to={`/products/${knife.id}`}>{knife.name}</Link>
                    </div>
                    <div>
                      <a href={`/products/${knife.id}`}>
                        <div id="picSquare">
                          <img id="productImage" src={knife.picture}></img>
                        </div>{" "}
                        {/* Zoe, added image tag - not sure if you like this */}
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.addToCart(fork.id)}
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
const mapDispatchToProps = { fetchAllKnives, addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(AllKnives);
