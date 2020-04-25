import { takeEvery, put } from 'redux-saga/effects'
import {
  UPLOAD_MODEL_REQUEST,
  uploadModelSuccess,

  UPLOAD_IMAGE_REQUEST,
  uploadImageSuccess,

  UPLOAD_TEXTURE_REQUEST,
  uploadTextureSuccess,

  CREATE_PRODUCT_REQUEST,
  createProduct,

  EDIT_PRODUCT_REQUEST,
  IEditRequest,

  editProductSuccess,

  REMOVE_PRODUCT_REQUEST,
  removeProductSuccess,

  IPaginationAction,
  PRODUCT_PAGINATION_REQUEST,
  productPaginationSuccess,
} from './actions'
import {
  showNotification,
  showError,
} from '../notifier/actions'
import { sagaWrapper } from './utils'
import request, { getErrorMessage } from '../../services/request'
import getTranslationById from '../../services/getTranslationById'
import history from '../../containers/App/history'

const uploadModelSaga = sagaWrapper({
  successAction: uploadModelSuccess,
  successMsg: 'productModelUploaded',
})
export function* watchUploadModel() {
  yield takeEvery(UPLOAD_MODEL_REQUEST, uploadModelSaga)
}

const uploadImageSaga = sagaWrapper({
  successAction: uploadImageSuccess,
  successMsg: 'productImageUploaded',
})
export function* watchUploadImage() {
  yield takeEvery(UPLOAD_IMAGE_REQUEST, uploadImageSaga)
}

const uploadTextureSaga = sagaWrapper({
  successAction: uploadTextureSuccess,
  successMsg: 'productTextureUploaded',
})
export function* watchUploadTexture() {
  yield takeEvery(UPLOAD_TEXTURE_REQUEST, uploadTextureSaga)
}

interface IAsset {
  location: string
  mimetype: string
  originalname: string
}
// interface IFile {
// 	uid: string
// 	name: string
// 	status: 'done'
// 	url: string
// 	size: number
// 	type: string
// }
interface IProductCreate {
  name: string
  images: IAsset[]
  categoryId: number
  description: string
  model: IAsset
}
interface ICreateProdAction {
  type: 'CREATE_PRODUCT_REQUEST'
  payload: IProductCreate
}
const apiProduct = '/product'
function* createProductSaga(action: ICreateProdAction) {
  try {
    const { data: response } = yield request(apiProduct, action.payload)
    const { isOk, data } = response
    if(isOk){
      yield put(showNotification(getTranslationById('productCreateSuccess')))
      yield put(createProduct(data))
      history.push('/dashboard/products')
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchCreateProduct() {
  yield takeEvery(CREATE_PRODUCT_REQUEST, createProductSaga)
}

interface IEditAction {
  type: 'EDIT_PRODUCT_REQUEST'
  payload: IEditRequest
}
function* editProductSaga(action: IEditAction) {
  try {
    const {
      payload: { id, ...other }
    } = action
    const { data: response } = yield request(
      `${apiProduct}/${id}`,
      other,
      'PUT',
    )
    const { isOk, data } = response

    if(isOk) {
      yield put(showNotification(getTranslationById('productUpdateSuccess')))
      yield put(editProductSuccess(data))
      history.push('/dashboard/products')
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchEditProduct() {
  yield takeEvery(EDIT_PRODUCT_REQUEST, editProductSaga)
}

interface IActionRemove {
  type: 'REMOVE_PRODUCT_REQUEST',
  payload: {
    id: number
  }
}
function* removeProductSaga(action: IActionRemove) {
  try {
    const {
      payload: { id }
    } = action

    const { data: response } = yield request(
      `${apiProduct}/${id}`,
      undefined,
      'DELETE',
    )
    const { isOk, data } = response

    if(isOk) {
      yield put(showNotification(getTranslationById('productRemoveSuccess')))
      yield put(removeProductSuccess(data.id))
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchRemoveProduct() {
  yield takeEvery(REMOVE_PRODUCT_REQUEST, removeProductSaga)
}

function* paginationProductSaga(action: IPaginationAction) {
  const { payload: { categoryId, limit, offset, name } } = action

  try {
    let url: string
    const commonQuery = `limit=${limit}&offset=${offset}&name=${name}`

    if (!!categoryId) {
      const params = `?categoryId=${categoryId}&${commonQuery}`
      url = `${apiProduct}/nested-categories${params}`
    } else {
      url = `${apiProduct}?${commonQuery}`
    }

    const result = yield request(url, action.payload, 'GET')
    const { data: response } = result
    const { isOk, data: products, count } = response

    if(isOk){
      const currentPageNumber = (offset && limit) ? (offset/limit + 1) : 1
      yield put(productPaginationSuccess({ products, count, currentPageNumber }))
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchProductPagination() {
  yield takeEvery(PRODUCT_PAGINATION_REQUEST, paginationProductSaga)
}
