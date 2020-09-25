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
    const {user} = this.props

    return (
      <div>
        {user.isAdmin ? (
          <div>
            <button type="button">
              <Link to="/products/add">ADD PRODUCT</Link>
            </button>
            <section className="products">
              <div className="section-title">
                <h2>Products</h2>
              </div>
              {!products.length
                ? 'No Products'
                : products.map(product => {
                    return (
                      <div className="products-center" key={product.id}>
                        <article className="product">
                          <div className="img-container">
                            <Link
                              to={`/products/${product.id}`}
                              className="link"
                            >
                              <img
                                src={product.imageUrl}
                                width="375"
                                height="275"
                              />
                            </Link>
                          </div>
                          <h2>
                            {' '}
                            <b>{product.name}</b>
                          </h2>
                          <h4>{product.description}</h4>
                          <h4>Price: ${product.price / 100}</h4>
                          <h4>In Stock: {product.numOfItems}</h4>
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
                        </article>
                      </div>
                    )
                  })}
            </section>
          </div>
        ) : (
          <section className="products">
            <div className="section-title">
              <h2>Products</h2>
            </div>
            {!products.length
              ? 'No Products'
              : products.map(product => {
                  return (
                    <div className="products-center" key={product.id}>
                      <article className="product">
                        <div className="img-container">
                          <Link to={`/products/${product.id}`} className="link">
                            <img
                              src={product.imageUrl}
                              width="375"
                              height="275"
                            />
                          </Link>
                        </div>
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
          </section>
        )}
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
