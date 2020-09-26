import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './singleProduct'
import users from './users'
import products from './products'
import order from './activeOrder'
import ordered from './checkout'

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  order
  // ordered
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './products'
export * from './singleProduct'
export * from './activeOrder'
export * from './checkout'

//check here if we have errors. There may be errors later
