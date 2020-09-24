import axios from 'axios'

// action types
export const GET_USER_ORDERS = 'GET_USER_ORDERS'

// action creators
export const getUserOrders = orders => ({type: GET_USER_ORDERS, orders})

// Thunk Creators
export const fetchOrders = userId => async dispatch => {
  const {data: orders} = await axios.get(`/api/users/${userId}/orders`)
  dispatch(getUserOrders(orders))
}

const orders = []

// reducer
export default function userOrderReducer(state = orders, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders
    default:
      return state
  }
}
