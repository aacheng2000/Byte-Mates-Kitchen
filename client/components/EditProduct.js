import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateSingleProduct } from "../store/allProducts";

class EditProduct extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    if (this.props.product.id) {
      this.setState({
        name: this.props.product.name,
        description: this.props.product.description,
        price: this.props.product.price,
        color: this.props.product.color,
        size: this.props.product.size,
        funId: this.props.product.funId,
        themeId: this.props.product.themeId,
      });
    }
  }
  componentDidUpdate(prevProps) {
    console.log("EDIT PRODCT PROPS~~", this.props);
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        id: this.props.id,
        name: this.props.product.name,
        description: this.props.product.description,
        price: this.props.product.price,
        color: this.props.product.color,
        size: this.props.product.size,
        funId: this.props.product.funId,
        themeId: this.props.product.themeId,
      });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateSingleProduct(this.state, this.props.product.id);
  }

  render() {
    const { name, description, price, color, size, funId, themeId } =
      this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <form id="product-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input value={name} onChange={handleChange} name="name" />
          <label htmlFor="description">Description: </label>
          <input
            value={description}
            onChange={handleChange}
            name="description"
          />
          <label htmlFor="price">Price: </label>
          <input value={price} onChange={handleChange} name="price" />
          <label htmlFor="color">Color: </label>
          <input value={color} onChange={handleChange} name="color" />
          <label htmlFor="size">Size: </label>
          <input value={size} onChange={handleChange} name="size" />
          <label htmlFor="funId">Functional ID: </label>
          <input value={funId} onChange={handleChange} name="funId" />
          <label htmlFor="themeId">Thematic ID: </label>
          <input value={themeId} onChange={handleChange} name="themeId" />
          <button type="submit">Submit Update</button>
          <button>
            <Link to="/adminproducts">Cancel</Link>
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSingleProduct: (singleProduct, id) =>
    dispatch(updateSingleProduct(singleProduct, id)),
});

export default connect(null, mapDispatchToProps)(EditProduct);
