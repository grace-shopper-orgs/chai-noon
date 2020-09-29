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
    //initialize an empty order
    let order = {}

    // Get current user
    const userRes = await axios.get('/auth/me')
    const user = userRes.data

    // check whether a user is signed in or not
    if (user.id) {
      const orderRes = await axios.get(`/api/users/order/${user.id}`)
      order = orderRes.data
    } else {
      //pulls locally stored cart data if not logged in
      let cart = JSON.parse(localStorage.getItem('cart'))

      //uses information in storage if available
      if (cart) {
        order = cart
      }
    }
    dispatch(getUserOrder(order))
  }
}
export const addToOrder = (product, count) => async dispatch => {
  // gets current user information
  const userRes = await axios.get('/auth/me')
  const user = userRes.data

  //casts count as a Number type
  count = Number(count)

  if (user.id) {
    //attach the item count to the product being added to the cart
    product.count = count

    //fetch the open order
    let orderRes = await axios.get(`/api/users/order/${user.id}`)

    //add the product to the open order
    await axios.put(`/api/orders/${orderRes.data.id}`, product)

    //fetch the adjusted order and sends that data
    orderRes = await axios.get(`/api/users/order/${user.id}`)
    dispatch(addToCart(orderRes.data))
  } else {
    //if a user is a guest/not logged in, get their cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart'))

    //check if cart has been initialized
    if (cart) {
      // checks cart for the product being added by comparing id
      let productIndex = cart.products.findIndex(
        currProd => currProd.id === product.id
      )
      let productToAdd = cart.products[productIndex]
      // if the product is not in the cart, the index will be -1. Add the item and create the association
      if (productIndex === -1) {
        product.OrderProducts = {count: count}
        cart.products.push(product)
      } else {
        //otherwise, adjust the existing product in the cart
        productToAdd.OrderProducts.count += count
      }
      //total price increases based on count!
      cart.totalPrice += count * product.price
    } else {
      //initialize a local cart with the product being added.
      cart = {products: [], totalPrice: 0, totalProducts: 0}
      product.OrderProducts = {count: count}
      cart.products.push(product)
      cart.totalPrice = product.price * count
    }
    //adjust the total count of products & set the cart to localStorage
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
  //get the current user's data
  const userRes = await axios.get('/auth/me')

  //if the user is signed in:
  if (userRes.data.id) {
    // submit a request to adjust their order and dispatch the resulting data
    let res = await axios.put(`/api/orders/update`, {
      order: order,
      product: product,
      count: count
    })
    dispatch(updateProductInOrder(res.data))
  } else {
    //if user is a guest- pull cart information from localStorage
    let cart = JSON.parse(localStorage.getItem('cart'))

    //cast count as a number
    count = Number(count)

    //find the index of the product in the order
    const productIndex = cart.products.findIndex(
      currProduct => currProduct.id === product.id
    )
    const productToUpdate = cart.products[productIndex]

    // use previousCount to mark #products in the old cart, and difference to determine what to add or subtract
    let previousCount = Number(productToUpdate.OrderProducts.count)
    let countDifference = count - previousCount

    //total price/total count adjustment based on countDifference and count of products determined by params
    let newPrice = countDifference * product.price + cart.totalPrice

    productToUpdate.OrderProducts.count = count
    cart.totalPrice = newPrice
    cart.totalProducts = cart.totalProducts + countDifference

    //if deleted, remove that product from the array
    if (count === 0) {
      cart.products.splice(productIndex, 1)
    }
    //store the adjusted cart and dispatch the data
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
