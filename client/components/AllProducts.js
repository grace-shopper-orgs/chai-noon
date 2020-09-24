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
        <button type="button">
          <Link to="/products/add">ADD PRODUCT</Link>
        </button>
        <div className="container">
          <div className="row">
            <div className="col-">
              <ul>
                {!products.length
                  ? 'No Products'
                  : products.map(product => {
                      return (
                        <div key={product.id}>
                          <img
                            src={product.imageUrl}
                            width="350"
                            height="275"
                          />
                          <th>{product.name}</th>
                          <li>Description: {product.description}</li>
                          <li>Price: {product.price}</li>
                          <li>In Stock:{product.numOfItems}</li>
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                this.props.deleteProduct(product.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    })}
              </ul>
            </div>
          </div>
        </div>
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
