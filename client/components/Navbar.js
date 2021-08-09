import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <h4 className='image-with-link-to-main-page'>
        image 'Byte mates kitchen' with link to main page
      </h4>
      <div className='nav-btn' id='all-products'>
        All products
      </div>
      <div className='search-bar'>
      <input
            type="text"
            id="header-search"
            placeholder="Search product.."
            name="s" 
        />
        <button type="submit">Search</button>
      </div>
      <div className='logged-or-not'>
        {isLoggedIn ? (
          <div id='logged-nav'>
            {/* The navbar will show these links after you log in */}
            <Link className='nav-btn' to="/home">Home</Link>
            <a className='nav-btn' href="#" onClick={handleClick}>Logout</a>
          </div>
        ) : (
          <div id='unlogged-nav'>
            {/* The navbar will show these links before you log in */}
            <Link className='nav-btn' to="/login">Login</Link>
            <Link className='nav-btn' to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
      <div>
        Cart img 0
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
