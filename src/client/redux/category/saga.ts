import { put, takeEvery } from 'redux-saga/effects'
import {
  REMOVE_CATEGORY_REQUEST,
  removeCategory,
  EDIT_CATEGORY_REQUEST,
  editCategory,
  CREATE_CATEGORY_REQUEST,
  createCategory as createCategoryAction,
  ICreateRequestAction,
  IEditRequest,

  SEARCH_CATEGORY_REQUEST,
  ISearchCategoryRequestAction,
  setCategories,

  GET_ALL_CATEGORIES_REQUEST,
} from './actions'
import { ICategory } from '../../interfaces/category'
import request, { getErrorMessage } from '../../services/request'
import {
  showError,
  showWarning,
  showNotification,
} from '../notifier/actions'
import getTranslationById from '../../services/getTranslationById'

interface IRemoveAction {
  type: string,
  payload: { id: number }
}
const apiCategory = '/category'
export function* removeCategorySaga(action: IRemoveAction) {
  try {
    const { payload: { id }} = action
    const {
      data: response
    } = yield request(`${apiCategory}/${id}`, undefined, 'delete')

    if(response.isOk){
      yield put(removeCategory(id))
      yield put(showNotification(getTranslationById('categoryNotifyRemove')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchRemoveCategory() {
  yield takeEvery(REMOVE_CATEGORY_REQUEST, removeCategorySaga)
}

export function* editCategorySaga(action: IEditRequest) {
  try {
    const { payload: { id, categoryUpdateData } } = action
    const {
      data: response
    } = yield request(`${apiCategory}/${id}`, categoryUpdateData, 'put')
    const editedCategory: ICategory = response.data

    if(response.isOk){
      yield put(editCategory(editedCategory))
      yield put(showNotification(getTranslationById('categoryUpdated')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchEditCategory() {
  yield takeEvery(EDIT_CATEGORY_REQUEST, editCategorySaga)
}

export function* createCategory(action: ICreateRequestAction) {
  try {
    const {
      data: response
    } = yield request(`${apiCategory}`, action.payload)
    const createdCategory: ICategory = response.data

    if(response.isOk){
      yield put(createCategoryAction(createdCategory))
      yield put(showNotification(getTranslationById('categoryCreated')))
    } else {
      if(response.data.isCategoryExists) {
        yield put(showWarning(getTranslationById('categoryAlreadyExist')))
      } else {
        yield put(showError(getErrorMessage(response)))
      }
    }
   } catch (err) {
    // TODO: add logger
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchCreateCategory() {
  yield takeEvery(CREATE_CATEGORY_REQUEST, createCategory)
}

export function* searchCategory(action: ISearchCategoryRequestAction) {
  try {
    const query = `name=${action.payload.name}`
    const {
      data: response
    } = yield request(`${apiCategory}/search?${query}`, {}, 'GET')
    const categories: ICategory[] = response.data

    if(response.isOk){
      yield put(setCategories(categories))
    } else {
      yield put(showError(getErrorMessage(response)))
    }
   } catch (err) {
    // TODO: add logger
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchSearchCategory() {
  yield takeEvery(SEARCH_CATEGORY_REQUEST, searchCategory)
}

export function* getAllCategories() {
  try {
    const query = 'parentCategoryId=null'
    const {
      data: response
    } = yield request(`${apiCategory}?${query}`, {}, 'GET')
    const categories: ICategory[] = response.data

    if(response.isOk){
      yield put(setCategories(categories))
    } else {
      yield put(showError(getErrorMessage(response)))
    }
   } catch (err) {
    // TODO: add logger
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchGetAllCategories() {
  yield takeEvery(GET_ALL_CATEGORIES_REQUEST, getAllCategories)
}
