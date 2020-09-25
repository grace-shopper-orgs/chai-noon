import axios from 'axios'

// action types
export const GET_USER_ORDER = 'GET_USER_ORDER'
export const ADD_TO_CART = 'ADD_TO_CART'

// action creators
export const getUserOrder = order => ({type: GET_USER_ORDER, order})
export const addToCart = order => ({type: ADD_TO_CART, order})

// Thunk Creators
export const fetchUserOrder = () => {
  return async dispatch => {
    // initialize order to an empty object - if we do not have an order, we can figure out what to do in terms if localStorage
    let order = {}
    // Get current user
    const userRes = await axios.get('/auth/me')
    const user = userRes.data
    // check to make sure user is not empty
    if (user.id) {
      const orderRes = await axios.get(`/api/orders/user/${user.id}`)
      order = orderRes.data
    }
    dispatch(getUserOrder(order))
  }
}
export const addToOrder = (product, count) => async dispatch => {
  const {data} = await axios.get('/auth/me')
  count = Number(count)
  if (data.id) {
    product.count = count
    let orderRes = await axios.get(`/api/orders/user/${data.id}`)
    let order = orderRes.data
    await axios.put(`/api/orders/${order.id}`, product)
    orderRes = await axios.get(`/api/orders/user/${data.id}`)
    dispatch(addToCart(orderRes.data))
  } else {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      let isInCart = false
      for (let i = 0; i < cart.products.length; i++) {
        let currProd = cart.products[i]
        if (currProd.id === product.id) {
          currProd.OrderProducts.count += count
          cart.totalPrice += count * product.price
          isInCart = true
        }
      }
      if (!isInCart) {
        product.OrderProducts = {count: count}
        cart.totalPrice += count * product.price
        cart.products.push(product)
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart = {products: [], totalPrice: 0}
      product.OrderProducts = {count: count}
      cart.products.push(product)
      cart.totalPrice = product.price * count
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
}

// reducer
export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_ORDER:
      return action.order
    case ADD_TO_CART:
      return action.order
    default:
      return state
  }
}
