import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
        <div className="product">
          {!products.length
            ? 'No Products'
            : products.map(product => {
                return (
                  <div key={product.id}>
                    <img src={product.imageUrl} width="300" height="225" />
                    <h4>
                      <b>{product.name}</b>
                    </h4>
                    <h4>{product.description}</h4>
                    <h4>Price: ${product.price / 100}</h4>
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
                    <button type="button" className="bg-transparent">
                      Delete
                    </button>

                    <h4>In Stock: {product.numOfItems}</h4>
                  </div>
                )
              })}
          <div className="total-container">
            <h4>TOTAL: ${totalPrice ? totalPrice / 100 : '0.00'}</h4>
          </div>
          <hr />
          {totalPrice ? (
            <Link to="/checkout">
              <button className="button-default">Checkout</button>
            </Link>
          ) : null}
        </div>
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
