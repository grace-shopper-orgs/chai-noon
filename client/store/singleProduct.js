import axios from 'axios'
import {fetchProducts} from './products'

// ACTION TYPES

const GET_PRODUCT = 'GET_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// ACTION CREATORS

const getProduct = (product = {}) => {
  return {
    type: GET_PRODUCT,
    product
  }
}

export const changeProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product: product
  }
}

// THUNK CREATORS

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      if (res.data) dispatch(getProduct(res.data))
      else dispatch(getProduct({name: null}))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = (id, updatedProductInfo) => async dispatch => {
  try {
    const response = await axios.put(`/api/products/${id}`, updatedProductInfo)
    const data = response.data
    dispatch(changeProduct(data))
    dispatch(fetchProducts())
  } catch (err) {
    console.log(err)
  }
}

//---------- reducer ----------//

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}
