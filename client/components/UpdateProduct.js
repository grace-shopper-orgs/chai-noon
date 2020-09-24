import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'

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
      <div>
        <main>
          <h1>UPDATE PRODUCT</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Product Name:</label>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
              required
            />

            <button type="submit">UPDATE:</button>
          </form>
        </main>
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