import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */

class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    console.log(this.props);

    return (
      <div>
        <h2>All User Profiles (Admin View) </h2>
        <div className="adminUsers">
          {users.map((user) => {
            return (
              <div id="adminUsers">
                <Link key={user.id} to={`/users/${user.id}`}>
                  <div>{user.username}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers() {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
