import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {ErrorPage} from './ErrorPage'
import {Link} from 'react-router-dom'
import {PurchaseForm} from './PurchaseForm'
import {addToOrder} from '../store/activeOrder'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  async handleSubmit(event, product) {
    event.preventDefault()
    const count = event.target.quantity.value
    await this.props.addToOrder(product, count)
  }
  render() {
    const {name, description, price, imageUrl, id} = this.props.product
    const {isAdmin} = this.props.user
    return (
      <div>
        {!isAdmin ? (
          <div>
            <h2>{name}</h2>
            <h4>${price / 100}</h4>
            <img src={imageUrl} />
            <p>{description}</p>
            <PurchaseForm
              product={this.props.product}
              onSubmit={this.handleSubmit}
            />
          </div>
        ) : (
          <div>
            {this.props.product.name ? (
              <div>
                <h2>{name}</h2>
                <h4>${price / 100}</h4>
                <img src={imageUrl} />
                <p>{description}</p>
                <button>
                  <Link to={`/products/${id}/update`}>UPDATE PRODUCT</Link>
                </button>
                <PurchaseForm
                  product={this.props.product}
                  onSubmit={this.handleSubmit}
                />
              </div>
            ) : (
              <ErrorPage error={{status: 404, message: 'Not Found'}} />
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => {
      dispatch(fetchProduct(productId))
    },
    addToOrder: (product, count) => {
      dispatch(addToOrder(product, count))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
