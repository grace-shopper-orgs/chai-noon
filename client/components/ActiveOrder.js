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
                  </div>
                  <button type="button">Delete Item</button>
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
