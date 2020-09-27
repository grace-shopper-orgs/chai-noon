import axios from 'axios'
import history from '../history'
import {getUserOrder} from './activeOrder'

/**
 * ACTION TYPES
 */

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
/**
 * HELPER FUNCTIONS
 */
const localToDbCart = async (userId, cart) => {
  try {
    let currOrder = await axios.get(`/api/orders/user/${userId}`)
    await cart.products.forEach(async each => {
      each.count = each.OrderProducts.count
      await axios.put(`/api/orders/${currOrder.data.id}`, each)
      await axios.put('/api/orders/update', {
        order: currOrder.data,
        product: each,
        count: each.count
      })
    })
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

export const auth = (
  email,
  password,
  firstName,
  lastName,
  cart
) => async dispatch => {
  let res
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
    localToDbCart(res.data.id, cart)
  }
  const {data} = await axios.get(`/api/orders/user/${res.data.id}`)
  dispatch(getUserOrder(data))
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authLogin = (email, password, cart) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  if (cart) {
    localToDbCart(res.data.id, cart)
  }
  const {data} = await axios.get(`/api/orders/user/${res.data.id}`)
  dispatch(getUserOrder(data))
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(getUserOrder({products: [], totalProducts: 0, totalPrice: 0}))
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
