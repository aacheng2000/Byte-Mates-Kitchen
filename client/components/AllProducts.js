import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = { products: null };
  }

  componentDidMount() {
    console.log("AllProducts Component Mounted!!");
  }

  render() {
    console.log(this.state.products);
    if (!this.props.products) return <h4>Loading...</h4>;

    return (
      <div>
        <h1>Byte-Mates-Kitchen</h1>
        <h2>All Products</h2>

        {/* {this.props.products.map((product) => {
          return (
            <ul key={product.id}>
              <li>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
              <li>
                <Link to={`/products/${product.id}`}>{product.picture}</Link>
              </li>
              <button
                className="remove"
                // onClick={() =>
                //   this.props.deleteSingleCampus(
                //     this.props.campus,
                //     this.props.campus.id
                //   )
                // }
              >
              Add to Cart
              </button>
            </ul>
          );
        })} */}
      </div>
    );
  }
}

export default AllProducts;
