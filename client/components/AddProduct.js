import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addNewProduct } from "../store/allProducts";

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      price: 0,
      color: "",
      size: "",
      funId: 1,
      themeId: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(evt) {
    await this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.addNewProduct({ ...this.state });
    await this.setState({
      name: "",
      description: "",
      price: 0,
      color: "",
      size: "",
      funId: 1,
      themeId: 1,
    });
  }

  render() {
    const { name, description, price, color, size, funId, themeId } =
      this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <div>
          <h2>
            <Link to="/adminproducts">All Products (Admin View)</Link>
          </h2>
        </div>
        <div>
          <form id="new-product-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              value={name}
              onChange={handleChange}
              placeholder="New Product Name..."
              name="name"
            />
            <label htmlFor="description">Description: </label>
            <input
              value={description}
              onChange={this.handleChange}
              placeholder="New Product Description..."
              name="description"
            />
            <label htmlFor="price">Price: </label>
            <input
              value={price}
              onChange={this.handleChange}
              placeholder="New Product Price..."
              name="price"
            />
            <label htmlFor="color">Color: </label>
            <input
              value={color}
              onChange={this.handleChange}
              placeholder="Color..."
              name="color"
            />
            <label htmlFor="size">Size: </label>
            <input
              value={size}
              onChange={this.handleChange}
              placeholder="Size..."
              name="size"
            />
            <label htmlFor="funId">Functional Category: </label>
            <input
              value={funId}
              onChange={this.handleChange}
              placeholder="Functional Category, 1, 2, or 3..."
              name="funId"
            />
            <button type="submit">Add New Product</button>
            <button>
              <Link to={`/adminproducts`}>Back to Admin Products</Link>
            </button>
            <button>
              <Link to="/adminproducts">Cancel</Link>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = { addNewProduct };

export default connect(null, mapDispatchToProps)(AddProduct);
