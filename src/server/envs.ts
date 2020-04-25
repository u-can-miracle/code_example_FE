import * as dotenv from 'dotenv'

dotenv.config()

export default {
  serverProtocol: process.env.PROTOCOL,
  serverUrl: process.env.URL,
  serverPort: process.env.PORT,
  apiUrl: process.env.API_URL,
  apiPort: process.env.API_PORT,
  apiProtocol: process.env.API_PROTOCOL,
  apiPreloadState: process.env.API_PRELOAD_STATE
}
