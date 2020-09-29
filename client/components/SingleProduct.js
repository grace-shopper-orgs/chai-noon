import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {ErrorPage} from './ErrorPage'
import {Link} from 'react-router-dom'
import {PurchaseForm} from './PurchaseForm'
import {addToOrder} from '../store/activeOrder'
import Footer from './Footer'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.product !== nextProps.product) {
      this.setState({loading: false})
      return true
    }
    if (this.state.loading !== nextState.loading) {
      return true
    }
    return false
  }
  async handleSubmit(event, product) {
    event.preventDefault()
    const count = event.target.quantity.value
    await this.props.addToOrder(product, count)
  }
  render() {
    if (this.state.loading) {
      return <div className="container">🍵 Brewing.... 🍵</div>
    } else if (!this.props.product.name) {
      return (
        <div>
          <ErrorPage error={{status: 404, message: 'Not Found'}} />
        </div>
      )
    } else {
      const {name, description, price, imageUrl, id} = this.props.product
      const {isAdmin} = this.props.user
      return (
        <div>
          {!isAdmin ? (
            <div className="container">
              <div className="product">
                <div className="display-row">
                  <div className="single-img">
                    <img src={imageUrl} width="450" height="345" />
                  </div>
                  <div className="colr-md">
                    <div>
                      <h2>{name}</h2>
                      <h2>${price / 100}</h2>
                      <h4>{description}</h4>
                      <PurchaseForm
                        product={this.props.product}
                        onSubmit={this.handleSubmit}
                      />
                      <Link to="/products" className="highlighted-link">
                        <p>Back to Products</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="container">
                <div className="product">
                  <div className="display-row">
                    <div className="single-img">
                      <img src={imageUrl} width="450" height="345" />
                    </div>
                    <div className="colr-md">
                      <div>
                        <h2>{name}</h2>
                        <h2>${price / 100}</h2>
                        <h4>{description}</h4>
                        <Link to={`/products/${id}/update`} className="link">
                          <button
                            type="button"
                            className="button-default no-text"
                          >
                            UPDATE PRODUCT
                          </button>
                        </Link>
                        <PurchaseForm
                          product={this.props.product}
                          onSubmit={this.handleSubmit}
                        />
                        <Link to="/products" className="highlighted-link">
                          <p>Back to Products</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
      )
    }
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
