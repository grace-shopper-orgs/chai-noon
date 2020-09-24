import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import SingleProduct from './components/SingleProduct'
import {me} from './store'
import AllProducts from './components/AllProducts'
import UpdateProduct from './components/UpdateProduct'
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import WelcomePage from './components/WelcomePage'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* We may want to organize our new routes differently? Do we want to show a login/signup on every page? */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={WelcomePage} />

        <Route exact path="/products/add" component={AddProduct} />

        <Route exact path="/products" component={AllProducts} />

        <Route path="/products/:id/update" component={UpdateProduct} />

        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/users/:id/cart" component={Cart} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
