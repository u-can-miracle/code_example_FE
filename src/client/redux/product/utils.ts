import { put } from 'redux-saga/effects'

import request, { getErrorMessage } from '../../services/request'
import getTranslationById from '../../services/getTranslationById'
import {
  showError,
  showNotification,
} from '../notifier/actions'
import { IAsset } from '../../interfaces/product'

const apiUpload = '/upload'

interface IParams {
  successAction: (params: IAsset) => any
  successMsg: string
}

interface IAction {
  type: string
  payload: {
    file: Blob
    onSuccess: (asset: IAsset) => void | undefined
    onError: (err: Error) => void | undefined
  }
}

export function sagaWrapper(params: IParams) {
  const { successAction, successMsg } = params

  return function* uploadSaga(action: IAction) {
    try {
      const formData = new FormData()
      formData.append('file', action.payload.file)

      const { data: response } = yield request(apiUpload, formData)
      const { isOk, data: { location, mimetype, originalname, key } } = response

      if(isOk){
        const result = { location, mimetype, originalname, key }
        yield put(successAction(result))
        yield put(showNotification(getTranslationById(successMsg)))

        if(!!action.payload.onSuccess){
          action.payload.onSuccess(result)
        }
      } else {
        const msg = getErrorMessage(response)
        yield put(showError(msg))
        if(action.payload.onError){
          action.payload.onError(new Error(msg))
        }
      }
    } catch (err) {
      // TODO: add logger
      yield put(showError(getTranslationById('requestError')))
      if(action.payload.onError){
        action.payload.onError(err)
      }
    }
  }
}
