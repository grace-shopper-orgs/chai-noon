import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store/activeOrder'

const CheckoutPage = props => {
  const {order, user} = props
  const products = order.products || []
  console.log('products', products.OrderProducts)
  console.log('user', user)

  return (
    <div className="container">
      <h4>Complete Your Order</h4>
      <div className="row">
        <div className="col-md-4">
          {/* {!cart.length && cart.map(item => {
              return (
                <div key={item.id}> 
                  <img src={item.imageUrl} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.name}</p>
                  <p>{item.OrderProducts.count}</p>
                </div> 
              )
            })} */}
        </div>
      </div>

      <form />
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: () => {
      dispatch(fetchUserOrder())
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
