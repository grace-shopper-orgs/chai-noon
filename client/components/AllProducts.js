import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    console.log('products', products)
    return (
      <div>
        <main>
          <ul>
            {!products.length
              ? 'No Products'
              : products.map(product => {
                  return (
                    <div key={product.id}>
                      <h1>{product.name}</h1>
                      <li>Description: {product.description}</li>
                      <li>Price: {product.price}</li>
                      <li>In Stock:{product.numOfItems}</li>
                      <img src={product.imageUrl} />
                    </div>
                  )
                })}
          </ul>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.products}
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
