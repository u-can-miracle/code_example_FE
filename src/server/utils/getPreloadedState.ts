import getSingletoneStore from '../../client/redux/store/get.singletone.store'
import postJsonToUrl from './postJsonToUrl'
import envs from '../envs'

const { apiProtocol, apiUrl, apiPort, apiPreloadState } = envs

export default async function getPreloadState(
  headers,
  hash: string,
  newPassword: string,
  url: string,
  hashedEmail: string,
){
  const apiFullUrl = `${apiProtocol}://${apiUrl}:${apiPort}${apiPreloadState}`
  const store = getSingletoneStore()
  const state = store.getState()
  const preloadState = await postJsonToUrl(apiFullUrl, {
    state,
    headers,
    hash,
    newPassword,
    url,
    hashedEmail,
  })

  return preloadState
}
