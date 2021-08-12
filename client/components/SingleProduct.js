import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllProducts } from "../store/product";

class SingleCampus extends Component {
  constructor() {
    super();
    this.state = { singleCampus: null };
  }

  componentDidMount() {
    console.log("SingleCampus Component Mounted!!");
    const campusId = this.props.match.params.campusId;
    this.props.fetchSingleCampus(campusId);
  }

  render() {
    if (!this.props.singleCampus) return <h4>Loading...</h4>;

    return (
      <div>
        <h1>Show Campus</h1>

        <ul key={this.props.singleCampus.id}>
          <li>Name: {this.props.singleCampus.name}</li>
          <li>Image: {this.props.singleCampus.imageUrl}</li>
          <li>Address: {this.props.singleCampus.address}</li>
          <li>Description: {this.props.singleCampus.description}</li>
          <li>
            Students:
            {this.props.singleCampus.students &&
              this.props.singleCampus.students.map((student) => {
                return <span key={student.id}> {student.firstName}</span>;
              })}
          </li>
        </ul>
        <EditCampus campus={this.props.singleCampus} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = { fetchSingleCampus };

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
