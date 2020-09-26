import axios from 'axios'

// action types
export const MAKE_AN_ORDER = 'MAKE_AN_ORDER'

// action creators
export const completeOrder = ordered => ({type: MAKE_AN_ORDER, ordered})

// thunk creators
export const completePurchase = () => async dispatch => {
  // console.log('thunk user')
  const {data: user} = await axios.get('/auth/me')
  console.log('thunk user', user, user.id)
  const {data: ordered} = await axios.put(`/api/orders/user/${user.id}/ordered`)
  console.log(ordered)
  dispatch(completeOrder(ordered))
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
