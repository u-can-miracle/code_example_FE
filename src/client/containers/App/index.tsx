import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import history from './history'
import Routes from '../Routes'
import IntlWrapper from '../IntlWrapper'
import getSingletoneStore from '../../redux/store/get.singletone.store'
import sagaMiddleware from '../../redux/middlewares/sagaMiddleware'
import rootSaga from '../../redux/rootSaga'

const store = getSingletoneStore()

sagaMiddleware.run(rootSaga)

const App = () => (
  <div className="app-wrapper">
    <Provider store={store}>
      <IntlWrapper>
        <Router
          history={history}
        >
          <Routes />
        </Router>
      </IntlWrapper>
    </Provider>
  </div>
)

export default hot(App)
