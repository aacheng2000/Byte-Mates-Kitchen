import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className='signInFormDiv'>
      <form className='authSignUpForm' onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <h3>{displayName==='Login'? 'Username': 'Create New Username'}</h3>
          </label>
          <input className='authSignInput' name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <h3>{displayName==='Login'? 'Password': 'Create New Password'}</h3>
          </label>
          <input className='authSignInput' name="password" type="password" />
        </div>
        <div>
          <button className='loginBtn' type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> <h3 className='authSignErr'>{error.response.data}</h3> </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
