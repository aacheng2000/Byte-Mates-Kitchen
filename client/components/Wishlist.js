import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWishlists, wishlists, deleteWishlistItem } from "../store/allWishlists"
import { products } from "../store/allProducts"
import { addOrder, myCart } from "../store";

class Wishlists extends React.Component {
  constructor() {
    super();
    this.state = {wishlists:null}
  }

  async addToCart(_productId) {
    await this.props.myCart(this.props.auth.username);
    this.props.addOrder({ cartId: this.props.cart.id, productId: _productId });
  }

  componentDidMount() {
    this.props.fetchWishlists(this.props.auth.username);
    console.dir(this.state)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wishlists.length !== this.props.wishlists.length) {
    this.props.fetchWishlists(this.props.auth.username)

    }
  }

  render() {

    return (
      <div>
        <h2>Wishlist</h2>
        {  
        (this.props.wishlists).map(x=>(
        <ul key = {x.id}>
        <li>{x.product.name}</li>
        <li>{x.product.price}</li>
        <li><img src = {x.product.picture}></img></li>
        <button className="Delete"
          onClick={() => this.props.deleteWishlistItem(x.id)}>
        Delete
        </button>
        <button className="Add to Cart"
          onClick={() => this.addToCart(x.productId)}>
        Add to Cart
        </button>
        </ul>))    }</div>
    );
  }
}

const mapStateToProps = (state) => {return state;};
const mapDispatchToProps = { fetchWishlists, deleteWishlistItem, wishlists, products, addOrder, myCart  };
export default connect(mapStateToProps, mapDispatchToProps)(Wishlists);

