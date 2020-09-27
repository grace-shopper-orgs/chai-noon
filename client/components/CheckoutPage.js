import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store/activeOrder'
import {completePurchase, authAndOrder} from '../store/checkout'
import Footer from './footer'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getOrder()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.completePurchase()
    alert('Thanks for your Purchase!!!')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignUp(event) {
    event.preventDefault()
    console.log('I made it to the submit')
    this.props.signUpAndCompleteOrder(
      this.state.email,
      this.state.password,
      this.state.firstName,
      this.state.lastName
    )
    alert('Thanks for your Purchase!!!')
  }

  render() {
    const {products, totalPrice} = this.props.order

    return (
      <div className="container">
        <div className="section-title">
          <h2>Complete Your Order</h2>
        </div>
        <div className="product">
          {products &&
            products.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.imageUrl} width="300" height="225" />
                  <div className="item-div">
                    <b>{item.name}</b>
                    <h4>${item.price / 100}</h4>
                    <h4>Qty:{item.OrderProducts.count}</h4>
                  </div>
                </div>
              )
            })}
          <div className="total-container">
            <h4>TOTAL: ${totalPrice / 100 || '0.00'}</h4>
          </div>
        </div>
        <hr />
        <br />
        <div>
          {this.props.user.id ? (
            <div className="section-title">
              <h2>Confirm Order Details and Checkout</h2>
              <button
                className="button-default"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit Order
              </button>
            </div>
          ) : (
            <div>
              <div className="section-title">
                <h2>Become a Member and Checkout</h2>
              </div>
              <form onSubmit={this.handleSignUp}>
                <div>
                  <label htmlFor="firstName">
                    <small>First Name</small>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName">
                    <small>Last Name</small>
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">
                    <small>Email</small>
                  </label>
                  <input
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  />
                </div>
                <button className="button-default">Create an Account</button>
              </form>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: () => {
      dispatch(fetchUserOrder())
    },
    completePurchase: () => {
      dispatch(completePurchase())
    },
    signUpAndCompleteOrder: (email, password, firstName, lastName) => {
      dispatch(authAndOrder(email, password, firstName, lastName))
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
