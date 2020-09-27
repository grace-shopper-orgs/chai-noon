import axios from 'axios'

// action types
export const GET_USER_ORDER = 'GET_USER_ORDER'
export const ADD_TO_CART = 'ADD_TO_CART'
export const UPDATE_PRODUCT_IN_ORDER = 'UPDATE_PRODUCT_IN_ORDER'

// action creators
export const getUserOrder = order => ({type: GET_USER_ORDER, order})
export const addToCart = order => ({type: ADD_TO_CART, order})
export const updateProductInOrder = order => ({
  type: UPDATE_PRODUCT_IN_ORDER,
  order
})

// Thunk Creators
export const fetchUserOrder = () => {
  return async dispatch => {
    let order = {}
    // Get current user
    const userRes = await axios.get('/auth/me')
    const user = userRes.data
    // check to make sure user is not empty
    if (user.id) {
      const orderRes = await axios.get(`/api/orders/user/${user.id}`)
      order = orderRes.data
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (cart) {
        order = cart
      }
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
    console.log(cart)
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
    } else {
      cart = {products: [], totalPrice: 0, totalProducts: 0}
      product.OrderProducts = {count: count}
      cart.products.push(product)
      cart.totalPrice = product.price * count
    }
    cart.totalProducts += count
    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(addToCart(cart))
  }
}

export const updateProductInCart = (
  order,
  product,
  count
) => async dispatch => {
  const userRes = await axios.get('/auth/me')
  if (userRes.data.id) {
    let res = await axios.put(`/api/orders/update`, {
      order: order,
      product: product,
      count: count
    })
    dispatch(updateProductInOrder(res.data))
  } else {
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log('first', cart)
    count = Number(count)

    const productIndex = cart.products.findIndex(
      currProduct => currProduct.id === product.id
    )
    const productToUpdate = cart.products[productIndex]

    let previousCount = Number(productToUpdate.OrderProducts.count)
    let countDifference = count - previousCount

    let newPrice = countDifference * product.price + cart.totalPrice

    productToUpdate.OrderProducts.count = count
    cart.totalPrice = newPrice
    cart.totalProducts = cart.totalProducts + countDifference

    if (count === 0) {
      cart.products.splice(productIndex, 1)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(updateProductInOrder(cart))
  }
}

// reducer
export default function singleOrderReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_ORDER:
      return action.order
    case ADD_TO_CART:
      return action.order
    case UPDATE_PRODUCT_IN_ORDER:
      return action.order
    default:
      return state
  }
}
