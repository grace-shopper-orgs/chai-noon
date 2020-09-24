import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

import singleProduct from './singleProduct'
import products from './products'
import orders from './orders'

const reducer = combineReducers({
  user,
  products,
  product: singleProduct,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './singleProduct'
export * from './orders'

//check here if we have errors. There may be errors later
