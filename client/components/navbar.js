import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserOrder, logout} from '../store'

class Navbar extends React.Component {
  componentDidMount() {
    this.props.getOrder()
  }
  render() {
    const {user} = this.props

    return (
      <div>
        <nav className="navbar">
          <div className="navbar-center">
            <span className="nav-icon">
              <i className="fa fa-bars" aria-hidden="true" />
            </span>
            <Link to="/" className="link">
              <h5>
                {' '}
                <div className="main-text">
                  <b>BREW TEA</b>
                </div>
              </h5>
            </Link>
            <Link to="/cart">
              <div className="cart-btn">
                <span className="nav-icon">
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                </span>
                <div className="cart-items">{this.props.totalCartItems}</div>
              </div>
            </Link>
          </div>
          {this.props.isLoggedIn ? (
            <div>
              {user.isAdmin && (
                <Link to="/users" className="link">
                  Users
                </Link>
              )}
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="link">
                Home
              </Link>
              <a href="#" onClick={this.props.handleClick} className="link">
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
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    totalCartItems: state.order.totalProducts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => {
      dispatch(logout())
    },
    getOrder: () => {
      dispatch(fetchUserOrder())
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
