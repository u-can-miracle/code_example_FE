import { put, takeEvery } from 'redux-saga/effects'
import {
  COMPANY_CREATE_REQUEST,
  ICompanyRequestAction,
  companyCreate,

  COMPANY_UPDATE_REQUEST,
  ICompanyUpdateRequestAction,
  companyUpdate,

  IInviteToCompanyAction,
  INVITE_TO_COMPANY_REQUEST,
} from '../actions'
import {
  showError,
  showNotification,
} from '../../notifier/actions'
import { ICompanyCreated } from '../../../interfaces/contact'
import request, { getErrorMessage } from '../../../services/request'
import getTranslationById from '../../../services/getTranslationById'
import getSingletoneStore from '../../store/get.singletone.store'
import { companySelector, firstCompanyContactsSelector } from '../selector'

const apiCompany = '/company'
export function* sendCompanyCreateRequest(action: ICompanyRequestAction) {
  try {
    const { data: response } = yield request(apiCompany, action.payload)
    const { isOk } = response
    const data: ICompanyCreated = response.data

    if (isOk) {
      yield put(companyCreate(data))
      yield put(showNotification(getTranslationById('companyCreated')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchCompanyCreate() {
  yield takeEvery(COMPANY_CREATE_REQUEST, sendCompanyCreateRequest)
}

export function* sendCompanyUpdateRequest(action: ICompanyUpdateRequestAction) {
  const { payload: { ...params } } = action
  const store = getSingletoneStore()
  const state = store.getState()

  try {
    const { companyId } = companySelector(state)
    const { contactId } = firstCompanyContactsSelector(state)
    const { data: response } = yield request(
      `${apiCompany}/${companyId}`,
      { ...params, contactId },
      'PUT',
    )
    const { isOk } = response
    const data: ICompanyCreated = response.data

    if (isOk) {
      yield put(companyUpdate(data))
      yield put(showNotification(getTranslationById('companyUpdated')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchCompanyUpdate() {
  yield takeEvery(COMPANY_UPDATE_REQUEST, sendCompanyUpdateRequest)
}

const apiCompanyInvite = `${apiCompany}/invite`
export function* sendInviteToCompany(action: IInviteToCompanyAction) {
  const { payload: { email } } = action

  try {
    const { data: response } = yield request(apiCompanyInvite, { email })
    const { isOk } = response

    if (isOk) {
      yield put(showNotification(getTranslationById('invitationWasSent')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchInviteToCompany() {
  yield takeEvery(INVITE_TO_COMPANY_REQUEST, sendInviteToCompany)
}
