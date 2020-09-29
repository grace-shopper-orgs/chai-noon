import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserOrder, updateProductInCart} from '../store/activeOrder'
import Footer from './Footer'

class ActiveOrder extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.getOrder()
  }

  handleChange(product, e) {
    const count = e.target.value
    this.props.updateCart(this.props.order, product, count)
  }

  handleDelete(product) {
    this.props.updateCart(this.props.order, product, 0)
  }

  render() {
    const {order} = this.props

    if (!Object.keys(order).length) {
      order.products = []
      order.totalPrice = 0
      order.totalProducts = 0
    }
    const products = order.products || []
    products.sort((a, b) => a.id - b.id)
    const totalPrice = order.totalPrice
    return (
      <div className="container">
        <div className="section-title">
          <h2>Cart</h2>
        </div>
        <div className="cart">
          {products !== undefined && !products.length
            ? 'No Products'
            : products.map(product => {
                return (
                  <div key={product.id}>
                    <img className="cart-img" src={product.imageUrl} />
                    <h2>
                      <b>{product.name}</b>
                    </h2>
                    <h4>{product.description}</h4>
                    <h4>Price: ${product.price / 100}</h4>
                    <div>
                      <select
                        onChange={e => this.handleChange(product, e)}
                        defaultValue={product.OrderProducts.count}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>

                      <button
                        onClick={e => this.handleDelete(product, e)}
                        type="button"
                        className="button-delete no-text"
                      >
                        x
                      </button>
                    </div>
                  </div>
                )
              })}
          <div className="total-container">
            <h4>TOTAL: ${totalPrice ? totalPrice / 100 : '0.00'}</h4>
          </div>
          <hr />
          {totalPrice ? (
            <Link to="/checkout">
              <button type="button" className="button-default no-text">
                Checkout
              </button>
            </Link>
          ) : null}
        </div>
        <Footer />
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
