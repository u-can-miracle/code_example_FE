import { createStore, applyMiddleware } from 'redux'

import middlewares from '../middlewares'
import rootReducer from '../rootReducer'

export default function configureStore(initialState?){
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
}
