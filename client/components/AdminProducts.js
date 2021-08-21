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
              <div id="adminproductItem" key={product.id}>
                <center>
                  <div id="adminproductBox">
                    <div>
                      <div id="productName">
                        <div>Product ID: {product.id}</div>
                        <div>Name: {product.name}</div>
                        <div id="productPrice">
                          <div>Price: ${product.price}</div>
                          {/* <div>{product.description}</div>
                    <div>{product.size}</div>
                    <div>{product.picture}</div>
                    <div>{product.funId}</div> */}
                        </div>
                        <div>
                          <button>
                            <Link to={`/products/singleproduct/${product.id}`}>
                              Edit Product
                            </Link>
                          </button>
                          <button
                            onClick={() =>
                              this.props.deleteSingleProduct(product.id)
                            }
                          >
                            Delete Product
                          </button>
                        </div>
                      </div>
                    </div>
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
const mapDispatchToProps = { fetchAllProductsTotal, deleteSingleProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
