import axios from 'axios'
import history from '../history'
import {GET_USER_ORDER} from './activeOrder'
import {completeOrder} from './checkout'
/**
 * ACTION TYPES
 */

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
const nullOrder = {products: [], totalProducts: 0, totalPrice: 0}
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
//removing a user both removes a user(logout) and gets a new empty cart
const removeUser = order => dispatch => {
  dispatch({type: REMOVE_USER})
  dispatch({type: GET_USER_ORDER, order: order})
}
//syncUser is for when login occurs and you have an existing local cart.
const syncUser = (user, order = nullOrder) => dispatch => {
  dispatch({type: GET_USER_ORDER, order: order})
  dispatch({type: GET_USER, user})
}
/**
 * HELPER FUNCTIONS
 */

// converts local cart data into database cart items
const localToDbCart = async (userId, cart) => {
  try {
    //get the existing user order
    let currOrder = await axios.get(`/api/users/order/${userId}`)
    // checks whether passed-in cart has products
    if (cart) {
      for (let i = 0; i < cart.products.length; i++) {
        const each = cart.products[i]

        // assigns the count of items to the product stored in "each"
        each.count = each.OrderProducts.count

        //first uses api routes to add the product in its entirety
        await axios.put(`/api/orders/${currOrder.data.id}`, each)
        //then adjusts the count to match the final count we want
        await axios.put('/api/orders/update', {
          order: currOrder.data,
          product: each,
          count: each.count
        })
      }
    }
    //after merging the data from local cart, we delete the item from localStorage
    localStorage.removeItem('cart')
  } catch (err) {
    console.error(err)
  }
}
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    //get the current user and dispatch either that information or a defaultUser
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
//used for matching existing OAuth user carts with localStorage Carts
export const syncCart = cart => async dispatch => {
  try {
    //gets the currently logged in user
    const res = await axios.get('/auth/me')

    //processes the conversion helper function
    if (res.data) {
      await localToDbCart(res.data.id, cart)
      const order = await axios.get(`/api/users/order/${res.data.id}`)
      dispatch(syncUser(res.data, order.data))
    } else return
    // gets the amended order after the update and sends it
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  firstName,
  lastName,
  cart,
  checkout
) => async dispatch => {
  let res
  let order
  //first the received information is submitted for signup
  try {
    res = await axios.post('/auth/signup', {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  //check and merge local cart information
  if (cart) {
    await localToDbCart(res.data.id, cart)
  }
  //get most up to date order
  order = await axios.get(`/api/users/order/${res.data.id}`)

  try {
    // send the user and order data to redux store!
    dispatch(syncUser(res.data, order.data))
    // If you're checking out, then it'll take additional steps:
    if (checkout) {
      //change the existing order to purchased
      const {data: ordered} = await axios.put(
        `/api/users/order/checkout/${res.data.id}`
      )

      // submit the finalized order & empty the cart view.
      await dispatch(completeOrder(ordered))
      await dispatch({
        type: GET_USER_ORDER,
        order: {products: [], totalProducts: 0, totalPrice: 0}
      })

      //send user to successful checkout
      history.push('/confirmation')
    } else {
      //send the user to the home page on successful signup
      history.push('/home')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authLogin = (email, password, cart) => async dispatch => {
  let res
  //first try logging in with provided credentials
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  //then sync local cart to user cart
  if (cart) {
    await localToDbCart(res.data.id, cart)
  }
  //get most up to date order
  const order = await axios.get(`/api/users/order/${res.data.id}`)
  try {
    //send user & order data to store && redirect to homepage
    dispatch(syncUser(res.data, order.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    //after logout, remove current user from store
    dispatch(removeUser(nullOrder))
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
