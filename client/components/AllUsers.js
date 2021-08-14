import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store';
import { Link } from "react-router-dom";

/**
* COMPONENT
*/
//({ users }) => 
class AllUsers extends Component {
    componentDidMount() {
        this.props.loadUsers();
    }
    render() {
        const { users } = this.props
        return (
            <ul>
                {users.map(user => {
                    return (
                        <Link key={user.id} to={`/users/${user.id}`}>
                            <li>
                                {user.username}
                            </li>
                        </Link>
                    ) 
                })}
            </ul>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users
});

const mapDispatch = dispatch => {
    return {
        loadUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatch)(AllUsers);