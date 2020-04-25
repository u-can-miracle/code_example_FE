import * as express from 'express'

import envs from './envs'
import expressConfig from './config'
import renderPageHtml from './renderPageHtml'

const { serverPort } = envs

const app = express()

expressConfig(app)

app.get(
  [
    '/dashboard/confirm/:hash',
    '/dashboard/set-password/:newPassword',
    '/dashboard/registration/:hashedEmail',
    /^(?:(?!(_|\.)).)*$/,
  ],
  async(req, res) => {
    const pageHtml = await renderPageHtml(
      req,
      req.params.hash,
      req.params.newPassword,
      req.params.hashedEmail,
    )

    res.send(pageHtml)
  }
)

app.listen(serverPort, () => {
  // tslint:disable-next-line
	console.log('dev1.server starts')
})
