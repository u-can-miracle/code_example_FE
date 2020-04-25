import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'

import middlewares from '../middlewares'
import rootReducer from '../rootReducer'
import isBrowser from '../../services/isBrowser'

export default function configureStore(initialState?) {
  const composeEnhancers =
    isBrowser() &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  )
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
