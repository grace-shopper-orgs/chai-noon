import axios from 'axios'
import history from '../history'
import {getUserOrder} from './activeOrder'

// action types
export const MAKE_AN_ORDER = 'MAKE_AN_ORDER'

// action creators
export const completeOrder = ordered => ({type: MAKE_AN_ORDER, ordered})

// thunk creators
export const completePurchase = () => async dispatch => {
  console.log('thunk user')
  try {
    const {data: user} = await axios.get('/auth/me')
    console.log('thunk user', user, user.id)
    const {data: ordered} = await axios.put(
      `/api/orders/user/${user.id}/ordered`
    )
    console.log(ordered)
    await dispatch(completeOrder(ordered))
    await dispatch(
      getUserOrder({products: [], totalProducts: 0, totalPrice: 0})
    )
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

// reducer
export default function completeOrderReducer(state = {}, action) {
  switch (action.type) {
    case MAKE_AN_ORDER:
      return action.ordered
    default:
      return state
  }
}
