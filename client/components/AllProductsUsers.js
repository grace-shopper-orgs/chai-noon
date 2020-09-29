import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import Footer from './Footer'
import Pagination from './Pagination'

export class AllProductsUsers extends React.Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null
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

  render() {
    const {products} = this.props
    const {currentProducts} = this.state
    const totalProducts = products.length

    if (totalProducts === 0) return null
    return (
      <div>
        <section className="products">
          <div className="section-title">
            <h2>Products</h2>
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
                        </Link>
                        <h2>
                          <b>{product.name}</b>
                        </h2>
                        <h4>{product.description}</h4>
                        <h4>Price: ${product.price / 100}</h4>
                      </article>
                    </div>
                  )
                })}
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => {
      dispatch(fetchProducts())
    }
  }
}
export default connect(mapState, mapDispatch)(AllProductsUsers)
