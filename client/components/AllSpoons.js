import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllSpoons } from "../store/allProducts";
import { addOrder } from "../store/order";
import { myCart } from "../store";

class AllKnives extends React.Component {
  constructor() {
    super();
    this.state = { forks: null };
  }

  componentDidMount() {
    console.log("All Spoons Component Mounted!!");
    this.props.fetchAllSpoons();
  }

  async addToCart(_productId) {
    await this.props.myCart(this.props.auth.username);

    this.props.addOrder({ cartId: this.props.cart.id, productId: _productId });
  }

  render() {
    if (!this.props.products) return <h4>Loading...</h4>;

    return (
      <div>
        <h2>Our Spoons Selection</h2>
        <div id="homeTableCategory">
          <div id="homeTableFirstRow">
            <Link to="/home">Home</Link>
            <Link to="/category/knives">All Knives</Link>
            <Link to="/category/forks">All Forks</Link>
            <Link to="/category/spoons">All Spoons</Link>
          </div>
        </div>
        <div id="productContainer">
          {this.props.products.map((spoon) => {
            return (
              <div id="productItem" key={spoon.id}>
                <center>
                  <div>
                    <div id="productName">
                      <Link to={`/products/singleproduct/${spoon.id}`}>
                        {spoon.name}
                      </Link>
                    </div>
                    <div>
                      <a href={`/products/singleproduct/${spoon.id}`}>
                        <div id="picSquare">
                          <img id="productImage" src={spoon.picture}></img>
                        </div>{" "}
                        {/* Zoe, added image tag - not sure if you like this */}
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.addToCart(spoon.id)}
                      className="addToCart"
                    >
                      Add to Cart
                    </button>
                    {this.props.auth.username ? (
                      <button className="addToWishList">Add to Wishlist</button>
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
const mapDispatchToProps = { fetchAllSpoons, addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(AllKnives);
