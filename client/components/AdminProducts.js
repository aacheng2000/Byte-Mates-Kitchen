import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllProductsTotal,
  deleteSingleProduct,
} from "../store/allProducts";

class AdminProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  async componentDidMount() {
    await this.props.fetchAllProductsTotal();
  }

  render() {
    console.log("Admin Products props!!~~~~~~~~", this.props);
    if (!this.props.products) return <h4>Loading...</h4>;
    return (
      <div>
        <h2>All Products (Admin View) </h2>
        <button>
          <Link to="/addproducts">Add Products</Link>
        </button>
        <div id="productContainer">
          {this.props.products.map((product) => {
            return (
              <div key={product.id}>
                <div>
                  <div id="productName">
                    <div>{product.id}</div>
                    <div>{product.name}</div>
                    {/* <div>{product.description}</div>
                    <div>{product.price}</div>
                    <div>{product.size}</div>
                    <div>{product.picture}</div>
                    <div>{product.funId}</div> */}
                  </div>
                </div>
                <div>
                  <button className="editProduct">
                    <Link to={`/products/${product.id}`}>Edit Product</Link>
                  </button>
                  <button
                    onClick={() => this.props.deleteSingleProduct(product.id)}
                    className="deleteProduct"
                  >
                    Delete Product
                  </button>
                </div>
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
const mapDispatchToProps = { fetchAllProductsTotal, deleteSingleProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
