import getSingletoneStore from '../redux/store/get.singletone.store'
import {
  disableNotifier,
  showLoading,
} from '../redux/notifier/actions'
import getTranslationById from './getTranslationById'

const store = getSingletoneStore()

export default async function request(
  url: string,
  payload?,
  method = 'POST',
){
  const apiUrl = `/api${url}`
  try {
    let fetchResponse

    store.dispatch(showLoading(30))

    if(method.toLowerCase() === 'delete'){
      fetchResponse = await fetch(apiUrl, {
        method
      })
    } else {
      const isFormData = payload instanceof FormData
      const body = isFormData ? payload : JSON.stringify(payload)
      const headers = isFormData ? {} : {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const bodyParams = method.toLowerCase() === 'get' ? {} : { body }

      fetchResponse = await fetch(apiUrl, {
        method,
        ...headers,
        credentials: 'include',
        mode: 'same-origin',
        ...bodyParams,
      })
    }

    store.dispatch(disableNotifier())

    const { ok, statusText } = fetchResponse
    const data = await fetchResponse.json()
    return {
      data,
      ok,
      statusText,
      apiUrl,
      method
    }
  } catch (err) {
    store.dispatch(disableNotifier())
    return {
      ok: false,
      apiUrl,
      method
    }
  }
}

interface IResponseResult {
  isOk: boolean
  isAccountDisabled: boolean
  isSchemaError: boolean
  data: {
    message?: string
  }
}
export function getErrorMessage(responseResult: IResponseResult) {
  if (responseResult.isAccountDisabled) {
    return getTranslationById('youAreDisabled')
  } else if(responseResult.isSchemaError && responseResult.data.message) {
    return responseResult.data.message
  } else {
    return getTranslationById('requestError')
  }
}
