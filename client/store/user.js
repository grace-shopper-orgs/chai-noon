import axios from 'axios'
import history from '../history'
import {GET_USER_ORDER} from './activeOrder'

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
const getUser = user => dispatch => dispatch({type: GET_USER, user})
const removeUser = order => dispatch => {
  dispatch({type: REMOVE_USER})
  dispatch({type: GET_USER_ORDER, order: order})
}
const syncUser = (user, order = nullOrder) => dispatch => {
  dispatch({type: GET_USER_ORDER, order: order})
  return dispatch({type: GET_USER, user})
}
/**
 * HELPER FUNCTIONS
 */
const localToDbCart = async (userId, cart) => {
  try {
    let currOrder = await axios.get(`/api/orders/user/${userId}`)
    if (cart.products !== undefined) {
      for (let i = 0; i < cart.products.length; i++) {
        const each = cart.products[i]
        each.count = each.OrderProducts.count
        await axios.put(`/api/orders/${currOrder.data.id}`, each)
        await axios.put('/api/orders/update', {
          order: currOrder.data,
          product: each,
          count: each.count
        })
      }
    }
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
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const syncCart = cart => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    await localToDbCart(res.data.id, cart)
    const order = await axios.get(`/api/orders/user/${res.data.id}`)
    dispatch(syncUser(res.data, order.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  firstName,
  lastName,
  cart
) => async dispatch => {
  let res
  let order
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
  if (cart) {
    await localToDbCart(res.data.id, cart)
  }
  order = await axios.get(`/api/orders/user/${res.data.id}`)
  try {
    dispatch(syncUser(res.data, order.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authLogin = (email, password, cart) => async dispatch => {
  let res
  let order
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  if (cart) {
    await localToDbCart(res.data.id, cart)
  }
  order = await axios.get(`/api/orders/user/${res.data.id}`)
  try {
    dispatch(syncUser(res.data, order.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
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
