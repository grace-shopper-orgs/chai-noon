import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/products'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    console.log('products', products)
    return (
      <div>
        <button>
          <Link to="/products/add">ADD PRODUCT</Link>
        </button>
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
                      <button
                        type="button"
                        onClick={() => this.props.deleteProduct(product.id)}
                      >
                        Delete
                      </button>
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
    },
    deleteProduct: id => {
      dispatch(removeProduct(id))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
