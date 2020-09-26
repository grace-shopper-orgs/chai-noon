import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder, updateProductInCart} from '../store/activeOrder'

class ActiveOrder extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.getOrder()
  }

  handleChange(product, event) {
    const count = event.target.value
    this.props.updateCart(this.props.order, product, count)
  }

  handleDelete() {}

  render() {
    let selectArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const {order} = this.props

    if (!Object.keys(order).length) {
      order.products = []
      order.totalPrice = 0
      order.totalProducts = 0
    }
    const products = order.products
    const totalPrice = order.totalPrice
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
                  <select onChange={e => this.handleChange(product, e)}>
                    {selectArr.map(num => {
                      return num === product.OrderProducts.count ? (
                        <option selected key={num} value={num}>
                          {num}
                        </option>
                      ) : (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      )
                    })}
                  </select>
                  <button type="button">Delete Item</button>

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
    },
    updateCart: (order, product, count) => {
      dispatch(updateProductInCart(order, product, count))
    }
  }
}

export default connect(mapState, mapDispatch)(ActiveOrder)
