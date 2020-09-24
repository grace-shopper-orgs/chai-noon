import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import WelcomePage from './WelcomePage'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar">
      <div className="navbar-center">
        <span className="nav-icon">
          <i className="fa fa-bars" aria-hidden="true" />
        </span>
        <Link to="/home" className="link">
          <b>BREW TEA</b>
        </Link>
        <div className="cart-btn">
          <span className="nav-icon">
            <i className="fa fa-cart-plus" aria-hidden="true" />
          </span>
          <div className="cart-items">0</div>
        </div>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="link">
            Home
          </Link>
          <a href="#" onClick={handleClick} className="link">
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
