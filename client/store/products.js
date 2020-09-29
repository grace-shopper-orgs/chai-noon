import axios from 'axios'

//----------- action types ------------//
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

//----------- action creators -----------//
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products: products
  }
}

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product: product
  }
}

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id: id
  }
}

//---------- thunk creators ----------//
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    const products = res.data
    dispatch(setProducts(products))
  } catch (err) {
    console.log(err)
  }
}

export const createProduct = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
    dispatch(fetchProducts())
  } catch (err) {
    console.log(err)
  }
}

export const removeProduct = id => async dispatch => {
  try {
    await axios.delete(`api/products/${id}`)
    dispatch(deleteProduct(id))
    dispatch(fetchProducts())
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
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      const filteredProducts = state.filter(product => product.id !== action.id)
      return filteredProducts
    default:
      return state
  }
}
