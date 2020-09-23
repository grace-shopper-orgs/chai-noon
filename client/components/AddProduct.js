import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/products'
import {Link} from 'react-router-dom'

export class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: '',
      numOfItems: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProduct(this.state)
    this.props.history.push('/products')
    this.setState({
      name: '',
      description: '',
      price: '',
      numOfItems: ''
    })
  }

  render() {
    return (
      <div>
        <main>
          <h1>ADD NEW PRODUCT</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Product Name:</label>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
              required
            />

            <label htmlFor="Description">Product Description:</label>
            <input
              onChange={this.handleChange}
              name="description"
              type="text"
              value={this.state.description}
              required
            />

            <label htmlFor="price">Product Price:</label>
            <input
              onChange={this.handleChange}
              name="price"
              type="number"
              value={this.state.price}
              required
            />

            <label htmlFor="numberOfItems">Amount:</label>
            <input
              onChange={this.handleChange}
              name="numOfItems"
              type="number"
              value={this.state.numOfItems}
              required
            />

            <button type="submit">Submit:</button>
          </form>
        </main>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: product => {
      dispatch(createProduct(product))
    }
  }
}

export default connect(null, mapDispatch)(AddProduct)
