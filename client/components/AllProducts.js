import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import { addOrder } from "../store/order";
import { myCart } from "../store";
import { addWishlistItem } from "../store/allWishlists";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  async addToCart(_productId) {
    const token = window.localStorage.getItem('token')
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    console.log('storagecart =>', cart)
    if(token){
    await this.props.myCart(this.props.auth.username);
    this.props.addOrder({ cartId: this.props.cart.id, productId: _productId });
    } else {
      window.localStorage.setItem('cart', JSON.stringify({product: [...cart.product, _productId]}))
      }
    console.log('new cart~~~', JSON.parse(window.localStorage.getItem('cart')))
  }
  
  async addToWishlist(_productId) {
    console.dir(this.props.auth)
    await this.props.myCart(this.props.auth.username);
    
    const countExisting = this.props.wishlists.filter(x=>x.productId === _productId).length
    
    console.log('coutn existing = ' + countExisting)
    
    this.props.addWishlistItem({ userId: this.props.cart.userId, productId: _productId });
  }
  
  
  
  

  render() {
    console.log("all Products props!!~~~~~~~~", this.props);
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
                    >Add to Cart
                    </button>
                    <button 
                      onClick={() => this.addToWishlist(product.id)}
                    className="addToWishList"
                    >Add to Wishlist
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
const mapDispatchToProps = { fetchAllProducts, addOrder, myCart, addWishlistItem };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
