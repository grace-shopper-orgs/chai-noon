import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store/singleOrder'

class ActiveOrder extends React.Component {
  componentDidMount() {
    this.props.getOrder()
  }

  render() {
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
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: () => dispatch(fetchUserOrder())
  }
}

export default connect(mapState, mapDispatch)(ActiveOrder)

//grab userId from orders and use it to grab all orders from user
