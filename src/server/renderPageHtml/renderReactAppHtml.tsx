import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { hot } from 'react-hot-loader/root'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import IntlWrapper from '../../client/containers/IntlWrapper'
import Routes from '../../client/containers/Routes'
import getSingletoneStore from '../../client/redux/store/get.singletone.store'
import { NOT_AUTH_PAGE_REDIRECT } from '../../client/constants'
import { isUrlAllowed } from '../../client/services/utils'
import { isLoggedSelector } from '../../client/redux/user/selector'

let store

function renderReactAppHtml(url: string, preloadedState): string {
  if (!store) {
    store = getSingletoneStore(preloadedState)
  }
  let location: string

  const isAllowed = isUrlAllowed(url)
  const isLogged = isLoggedSelector(store.getState())

  if (url === '/') {
    location = '/'
  } else if (isAllowed) {
    location = url
  } else {
    location = isLogged ? url : NOT_AUTH_PAGE_REDIRECT
  }

  const context = {}
  const reactApp = (
    <div className="app-wrapper">
      <Provider store={store}>
        <IntlWrapper>
          <StaticRouter location={location} context={context}>
            <Routes />
          </StaticRouter>
        </IntlWrapper>
      </Provider>
    </div>
  )
  const HotReactApp = hot(reactApp)

  return ReactDOMServer.renderToString(HotReactApp)
}

export default renderReactAppHtml
