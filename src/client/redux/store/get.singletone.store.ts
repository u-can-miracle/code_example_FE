import configureStore from './configureStore'
import isBrowser from '../../services/isBrowser'

let store

function getSingletoneStore(serverPreloadedState?) {
  if (store) {
    return store
  }

  if(isBrowser()){
    const preloadedState = window['__INITIAL_STATE__']

    store = configureStore(preloadedState)

    delete window['__INITIAL_STATE__']
  } else {
    store = configureStore(serverPreloadedState)
  }

  return store
}

export default getSingletoneStore
