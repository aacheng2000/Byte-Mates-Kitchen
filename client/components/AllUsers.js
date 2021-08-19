import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store';
import { Link } from "react-router-dom";

/**
* COMPONENT
*/

class AllUsers extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const { users } = this.props
        console.log(this.props)

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

const mapStateToProps = ({ users }) => {
    return {
        users
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchUsers() {
            dispatch(fetchUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);