import * as express from 'express'
import * as webpack from 'webpack'
import * as bodyParser from 'body-parser'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import * as proxyMiddlware from 'http-proxy-middleware'

import config from './envs'
import filterUrls from './utils/filterUrls'
import * as webpackConfig from '../../webpack/webpack.config.dev'

const compiler = webpack(webpackConfig)
const {
  serverProtocol,
  serverUrl,
  serverPort,
  apiProtocol,
  apiUrl,
  apiPort,
} = config

const proxy = proxyMiddlware(
  filterUrls,
  {
    target: `${apiProtocol}://${apiUrl}:${apiPort}`,
    // changeOrigin: true, // needed for virtual hosted site
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      [`${serverProtocol}://${serverUrl}:${serverPort}`]: `${apiProtocol}://${apiUrl}:${apiPort}`
    }
  }
)
export default function configExpressApp(app: express.Application) {
  app.use(proxy)
  app.use(express.static('dist/')) // bundle
  app.use(express.static('src/client/assets/'))
  app.use(express.static('src/client/assets/favicons'))

  app.use((req, res, next) => {
		console.log('req.url', req.url) // tslint:disable-line
    next()
  })
  app.use(bodyParser.json())

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 750
    },
  }))

  app.use(webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2000
    }
  ))
}
