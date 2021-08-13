import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store';

class SingleUser extends Component {
    constructor(){
        super()
    }

    componentDidMount() {
        console.log(this.props)
        this.props.loadSingleUser(this.props.match.params.id)
    }

    render() {
        const { singleUser } = this.props
        return (
            <div className='single-user'>
                <div>
                    {singleUser.username}
                </div>
                <div>
                    {singleUser.lastName}
                </div>
                <div>
                    {singleUser.email}
                </div>
                <div>
                    {singleUser.phoneNumber}
                </div>
                <div>
                    {singleUser.isAdmin}
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ singleUser }) => {
    return {
        singleUser
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        loadSingleUser: (id) => dispatch(fetchSingleUser(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)