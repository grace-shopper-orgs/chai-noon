import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      totalProducts: '',
      totalPrice: ''
    }
  }

  componentDidMount() {
    this.props.getOrders(this.props.match.params.id)
  }

  render() {
    const {orders} = this.props
    console.log(orders)
    return (
      <div className="container">
        <h3>Product</h3>
        <p>Tea</p>
        <p>Price</p>
        <p>Qty</p>
        <p>Amount</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: userId => dispatch(fetchOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)

//grab userId from orders and use it to grab all orders from user
