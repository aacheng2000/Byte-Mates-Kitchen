import React, {Component, Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../store';

/**
* COMPONENT
*/
//({ users }) => 
class AllUsers extends Component {
    componentDidMount() {
        this.props.loadUsers()
    }
    render() {
        const {users} = this.props
        return (
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.id}>
                        {user.username}
                        </li>
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