import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {ErrorPage} from './ErrorPage'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    const {name, description, price, imageUrl} = this.props.product
    return (
      <div>
        {this.props.product.name ? (
          <div>
            <h2>{name}</h2>
            <h4>{price}</h4>
            <img src={imageUrl} />
            <p>{description}</p>
          </div>
        ) : (
          <ErrorPage error={{status: 404, message: 'Not Found'}} />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => {
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
