import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/products'
import {Link} from 'react-router-dom'
import Footer from './Footer'
import Pagination from './Pagination'
import {addToOrder} from '../store'

export class AllProductsAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProducts: [],
      currentPage: null,
      totalPages: null
    }
    // this.deleteTea = this.deleteTea.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  onPageChanged = productsView => {
    const {products} = this.props
    const {currentPage, totalPages, pageLimit} = productsView
    const offset = (currentPage - 1) * pageLimit
    const currentProducts = products.slice(offset, offset + pageLimit)
    this.setState({currentPage, currentProducts, totalPages})
  }

  deleteTea(id) {
    const filtered = this.state.currentProducts.filter(tea => tea.id !== id)
    this.setState({
      currentProducts: filtered
    })
  }

  render() {
    const {products} = this.props

    const {currentProducts} = this.state
    const totalProducts = products.length

    products.sort((a, b) => a.id - b.id)

    if (totalProducts === 0) return null
    return (
      <div>
        <div>
          <section className="products">
            <div className="section-title">
              <h2>Products</h2>
            </div>
            <div className="button-alignment">
              <Link to="/products/add">
                <button type="button" className="button-default no-text">
                  Add Product
                </button>
              </Link>
            </div>
            <div>
              <Pagination
                totalProducts={totalProducts}
                pageLimit={9}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
            <div className="product-section">
              {!products.length
                ? 'No Products'
                : currentProducts.map(product => {
                    return (
                      <div className="products-center" key={product.id}>
                        <article className="product">
                          <Link to={`/products/${product.id}`} className="link">
                            <img src={product.imageUrl} />
                            <h2>
                              {' '}
                              <b>{product.name}</b>
                            </h2>
                          </Link>
                          <div className="desc">
                            <h4>{product.description}</h4>
                          </div>

                          <h4>Price: ${product.price / 100}</h4>
                          <h4>In Stock: {product.numOfItems}</h4>
                          <div className="product-button">
                            <button
                              type="button"
                              onClick={() => this.props.addToCart(product)}
                              className="button-default submit"
                            >
                              Add to Cart
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                this.deleteTea(product.id)
                                this.props.deleteProduct(product.id)
                              }}
                              className="button-default big-delete"
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
    },
    addToCart: product => {
      dispatch(addToOrder(product))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProductsAdmin)
