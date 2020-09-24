import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store/singleOrder'

class ActiveOrder extends React.Component {
  componentDidMount() {
    this.props.getOrder()
  }

  render() {
    const {order} = this.props
    const products = order.products || []
    return (
      <div className="container">
        {!products.length
          ? 'No Products'
          : products.map(product => {
              return (
                <div key={product.id}>
                  <h3>{product.name}</h3>
                  <p>Description: {product.description}</p>
                  <p>Price: ${product.price / 100}</p>
                  <p>Quantity in Cart: {product.OrderProducts.count}</p>
                  <p>In Stock: {product.numOfItems}</p>
                </div>
              )
            })}
        <p>TOTAL: ${order.totalPrice / 100}</p>
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
    getOrder: () => {
      dispatch(fetchUserOrder())
    }
  }
}

export default connect(mapState, mapDispatch)(ActiveOrder)
