import axios from 'axios'

// ACTION TYPES

const GET_PRODUCT = 'GET_PRODUCT'

// ACTION CREATORS

const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

// THUNK CREATORS

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
