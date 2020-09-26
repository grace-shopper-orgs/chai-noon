import React from 'react'
import {connect} from 'react-redux'

const CheckoutPage = props => {
  const {products} = props.order
  console.log('hello')
  console.log('item', products)
  // console.log(props.user)

  return (
    <div className="container">
      <h4>Complete Your Order</h4>
      <div className="row">
        {/* <div className="col-md-4">
          {products.length && products.map(item => {
              return (
                <div key={item.id}> 
                  <img src={item.imageUrl} />
                  <p>{item.name}</p>
                  <p>{item.price / 100}</p>
                  <p>{item.OrderProducts.count}</p>
                </div> 
              )
            })
        </div> */}
      </div>
      <div>
        <h4>Become a Member and Checkout</h4>
      </div>
      <form>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firsttName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="text" />
        </div>
        <button className="button-default">Submit Order</button>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    order: state.order
  }
}

// const mapDispatch = (dispatch) => {
//   return {}
// }

export default connect(mapState, null)(CheckoutPage)
