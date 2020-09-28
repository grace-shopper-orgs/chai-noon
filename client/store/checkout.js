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
    // find auth user and then use userId to dispatch and confirm the order
    const {data: user} = await axios.get('/auth/me')
    const {data: ordered} = await axios.put(
      `/api/orders/user/${user.id}/ordered`
    )

    // now update it in our system as purchased: true. cart will them be empty
    await dispatch(completeOrder(ordered))
    await dispatch(
      getUserOrder({products: [], totalProducts: 0, totalPrice: 0})
    )

    // if no errors, send user to confirmation page.
    history.push('/confirmation')
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
