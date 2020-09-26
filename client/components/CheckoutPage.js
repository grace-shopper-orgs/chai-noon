import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store/activeOrder'
import {completePurchase} from '../store/checkout'

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getOrder()
  }

  handleSubmit(event) {
    console.log('handle submit')
    event.preventDefault()
    this.props.completePurchase()
    alert('Thanks for your Purchase!!!')
    this.props.history.push('/')
  }

  render() {
    console.log(this.props.user)
    const {products, totalPrice} = this.props.order
    // console.log('item', products)
    // console.log('props', this.props)

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
                  <img src={item.imageUrl} width="300" height="250" />
                  <div className="item-div">
                    <h4>{item.name}</h4>
                    <h4>{item.price / 100}</h4>
                    <h4>{item.OrderProducts.count}</h4>
                  </div>
                </div>
              )
            })}
          <div className="container">
            <h4>TOTAL: ${totalPrice / 100 || 0}</h4>
          </div>
        </div>
        <hr />
        <br />
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
              <form>
                <div>
                  <label htmlFor="firstName">
                    <small>First Name</small>
                  </label>
                  <input name="firsttName" type="text" />
                </div>
                <div>
                  <label htmlFor="lastName">
                    <small>Last Name</small>
                  </label>
                  <input name="lastName" type="text" />
                </div>
                <div>
                  <label htmlFor="email">
                    <small>Email</small>
                  </label>
                  <input name="email" type="text" />
                </div>
                <div>
                  <label htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input name="password" type="text" />
                </div>
                <button className="button-default">Submit Order</button>
              </form>
            </div>
          )}
        </div>
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
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
