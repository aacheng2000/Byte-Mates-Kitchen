import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';

class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.setState({
                address: this.props.user.address
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user.id && this.props.user.id) {
            this.setState({
                address: this.props.user.address
            });
        }
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateUser({ ...this.props.user, ...this.state });
    }

    render() {
        const { address } = this.state;
        const { handleSubmit, handleChange } = this;

        return (
            <div>
                <form id='user-form' onSubmit={handleSubmit}>
                    <label htmlFor='address'>Address:</label>
                    <input name='address' onChange={handleChange} value={address} />

                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  updateUser: (user) => dispatch(updateUser(user, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);