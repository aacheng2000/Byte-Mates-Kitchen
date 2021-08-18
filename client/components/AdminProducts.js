import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import AddProduct from "./AddProduct";

class AdminProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    this.props.fetchAllProducts();
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
                  <button
                    onClick={() => console.log("edit product")}
                    className="editProduct"
                  >
                    Edit Product
                  </button>
                  <button
                    onClick={() => console.log("delete product")}
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
const mapDispatchToProps = { fetchAllProducts };

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
