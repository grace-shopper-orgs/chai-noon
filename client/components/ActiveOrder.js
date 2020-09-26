import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store/activeOrder'

class ActiveOrder extends React.Component {
  componentDidMount() {
    this.props.getOrder()
  }

  render() {
    const {order} = this.props
    let localCart = JSON.parse(localStorage.getItem('cart'))
    if (!localCart) {
      localCart = {}
      localCart.products = []
      localCart.totalPrice = 0
    }
    const products = order.products || localCart.products
    const totalPrice = order.totalPrice || localCart.totalPrice

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
        <p>TOTAL: ${totalPrice ? totalPrice / 100 : '0.00'}</p>
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
