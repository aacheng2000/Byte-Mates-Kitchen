import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchAllForks } from "../store/allProducts";
import { addOrder } from "../store/order";
import { myCart } from "../store";

class AllKnives extends React.Component {
  constructor() {
    super();
    this.state = { forks: null };
  }

  componentDidMount() {
    console.log("All Spoons Component Mounted!!");
    // this.props.fetchAllForks();
  }

  async addToCart(_productId) {
    await this.props.myCart(this.props.auth.username);

    this.props.addOrder({ cartId: this.props.cart.id, productId: _productId });
  }

  render() {
    return <div>ALL SPOONS</div>;
    // console.log("all forks props!!~~~~~~~~", this.props);
    // if (!this.props.forks) return <h4>Loading...</h4>;
    // return (
    //   <div>
    //     <h2>Our Forks Selection</h2>
    //     <div id="productContainer">
    //       {this.props.forks.map((fork) => {
    //         return (
    //           <div id="productItem" key={fork.id}>
    //             <center>
    //               <div>
    //                 <div id="productName">
    //                   <Link to={`/products/${product.id}`}>{product.name}</Link>
    //                 </div>
    //                 <div>
    //                   <a href={`/products/${product.id}`}>
    //                     <div id="picSquare">
    //                       <img id="productImage" src={product.picture}></img>
    //                     </div>{" "}
    //                     {/* Zoe, added image tag - not sure if you like this */}
    //                   </a>
    //                 </div>
    //               </div>
    //               <div>
    //                 <button
    //                   onClick={() => this.addToCart(fork.id)}
    //                   className="addToCart"
    //                 >
    //                   Add to Cart
    //                 </button>
    //                 <button className="addToWishList">Add to Wishlist</button>
    //               </div>
    //             </center>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { addOrder, myCart };

export default connect(mapStateToProps, mapDispatchToProps)(AllKnives);
