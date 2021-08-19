import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */

class Home extends Component {

  render() {
    const { username, isLoggedIn } = this.props;
    const token = window.localStorage.getItem("token");

    return (
      <div>
        <h2>Welcome, {username}</h2>
        <div id="homeTableCategory">
          <div id="homeTableFirstRow">
            <div className='homeItem'>
              <Link to="/category/knives">
                <div>All Knives</div>
                <img src="knifie.png"/>
              </Link>
            </div>
            <div className='homeItem'>
              <Link to="/category/forks">
              <div>All Forks</div>
              <img src="forkie.png"/>
              </Link>
            </div>
              <div className='homeItem'>
                <Link to="/category/spoons">
                <div>All Spoons</div>
                <img src="spoonie.png"/>
                </Link>
              </div>
              
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    order: state.order,
  };
};


export default connect(mapState)(Home);
