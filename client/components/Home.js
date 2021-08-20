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
        <h1 className="homeTitle">Welcome {username}!</h1>
        <div id="homeTableCategory">
          <div id="homeTableFirstRow">
            <div>
              <Link to="/category/knives"className='homeItem'>
                <div>Shop Knives</div>
                <img src="knifie.png"/>
              </Link>
            </div>
            <div>
              <Link to="/category/forks" className='homeItem'>
              <div>Shop Forks</div>
              <img src="forkie.png"/>
              </Link>
            </div>
              <div>
                <Link to="/category/spoons" className='homeItem'>
                <div>Shop Spoons</div>
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
