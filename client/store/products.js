import axios from 'axios'

//----------- action types ------------//
export const SET_PRODUCTS = 'SET_ROBOTS'

//----------- action creators -----------//
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products: products
  }
}

//---------- thunk creators ----------//
export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/products')
    const products = response.data
    dispatch(setProducts(products))
  } catch (err) {
    console.log(err)
  }
}

//----------- initial state ----------//
const products = []

//---------- reducer ----------//
export default function productsReducer(state = products, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products]
    default:
      return state
  }
}
