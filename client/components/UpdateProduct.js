import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'
import Footer from './footer'

export class UpdateProduct extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.id
    this.setState({
      id: productId
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateProduct(this.state.id, this.state)
    this.props.history.push(`/products/${this.state.id}`)
    this.setState({
      id: '',
      name: ''
    })
  }

  render() {
    console.log(this.state.id)
    return (
      <div className="container">
        <main>
          <div className="section-title">
            <h2>UPDATE PRODUCT</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Product Name:</label>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
              required
            />
            <button type="submit" className="button-default">
              UPDATE:
            </button>
          </form>
        </main>
        <Footer />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateProduct: (id, product) => {
      dispatch(updateProduct(id, product))
    }
  }
}

export default connect(null, mapDispatch)(UpdateProduct)
