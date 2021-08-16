import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.setState({
                username: this.props.user.username,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                email: this.props.user.email,
                phoneNumber: this.props.user.phoneNumber,
                address: this.props.user.address
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user.id && this.props.user.id) {
            this.setState({
                username: this.props.user.username,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                email: this.props.user.email,
                phoneNumber: this.props.user.phoneNumber,
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
        const { username, firstName, lastName, email, phoneNumber, address } = this.state;
        const { handleSubmit, handleChange } = this;

        return (
            <div>
                <form id='user-form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input name='username' onChange={handleChange} value={username} />

                    <label htmlFor='firstName'>First name:</label>
                    <input name='firstName' onChange={handleChange} value={firstName} />

                    <label htmlFor='lastName'>Last name:</label>
                    <input name='lastName' onChange={handleChange} value={lastName} />

                    <label htmlFor='email'>Email:</label>
                    <input name='email' onChange={handleChange} value={email} />

                    <label htmlFor='phoneNumber'>Phone number:</label>
                    <input name='phoneNumber' onChange={handleChange} value={phoneNumber} />

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
  updateUser: (user) => dispatch(updateUser(user, history)),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);