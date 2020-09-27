import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/products'
import {Link} from 'react-router-dom'
import Footer from './footer'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    const {user} = this.props

    return (
      <div>
        {user.isAdmin ? (
          <div>
            <section className="products">
              <div className="section-title">
                <h2>Products</h2>
              </div>
              <div className="button-alignment">
                <Link to="/products/add">
                  <button type="button" className="button-default">
                    Add Product
                  </button>
                </Link>
              </div>
              <div className="product-section">
                {!products.length
                  ? 'No Products'
                  : products.map(product => {
                      return (
                        <div className="products-center" key={product.id}>
                          <article className="product">
                            <Link
                              to={`/products/${product.id}`}
                              className="link"
                            >
                              <img
                                src={product.imageUrl}
                                width="400"
                                height="280"
                              />
                              <h2>
                                {' '}
                                <b>{product.name}</b>
                              </h2>
                            </Link>
                            <h4>{product.description}</h4>
                            <h4>Price: ${product.price / 100}</h4>
                            <h4>In Stock: {product.numOfItems}</h4>
                            <div className="button-delete">
                              <button
                                type="button"
                                onClick={() =>
                                  this.props.deleteProduct(product.id)
                                }
                                className="button-default"
                              >
                                Delete
                              </button>
                            </div>
                          </article>
                        </div>
                      )
                    })}
              </div>
            </section>
          </div>
        ) : (
          <section className="products">
            <div className="section-title">
              <h2>Products</h2>
            </div>
            <div className="product-section">
              {!products.length
                ? 'No Products'
                : products.map(product => {
                    return (
                      <div className="products-center" key={product.id}>
                        <article className="product">
                          <Link to={`/products/${product.id}`} className="link">
                            <img
                              src={product.imageUrl}
                              width="400"
                              height="280"
                            />
                          </Link>
                          <h2>
                            {' '}
                            <b>{product.name}</b>
                          </h2>
                          <h4>{product.description}</h4>
                          <h4>Price: ${product.price / 100}</h4>
                          <h4>In Stock: {product.numOfItems}</h4>
                        </article>
                      </div>
                    )
                  })}
            </div>
          </section>
        )}
        <Footer />
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
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
