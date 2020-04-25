import { put, takeEvery } from 'redux-saga/effects'
import {
  DESIGNER_PROFILE_UPDATE_REQUEST,
  IDesignerProfileUpdateAction,
  designProfileUpdate,

  IRoleUpdateAction,
  CHANGE_USER_ROLE_REQUEST,
  changeUserRole,

  IUserStatusChangeAction,
  CHANGE_USER_STATUS_REQUEST,
  changeUserStatus,

  IDeleteUserRequestAction,
  DELETE_USER_REQUEST,
  deleteUser,
} from '../actions'
import { IProfile } from '../../../interfaces/user'
import {
  showError,
  showNotification,
} from '../../notifier/actions'

import request, { getErrorMessage } from '../../../services/request'
import getTranslationById from '../../../services/getTranslationById'

const apiProfile = '/profile'
export function* sendDesignerProfileRequest(action: IDesignerProfileUpdateAction){
  const { payload: { ...params } } = action

  try {
    const { data: response } = yield request(
      apiProfile,
      { ...params },
      'PUT',
    )
    const { isOk } = response
    const data: IProfile = response.data

    if (isOk) {
      yield put(designProfileUpdate(data))
      yield put(showNotification(getTranslationById('profileUpdated')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchDesignerProfileUpdate() {
  yield takeEvery(DESIGNER_PROFILE_UPDATE_REQUEST, sendDesignerProfileRequest)
}

export function* sendChangeUserRoleRequest(action: IRoleUpdateAction) {
  const { payload: { role, userId } } = action

  try {
    const result = yield request(
      apiProfile,
      { role, id: userId },
      'PUT',
    )
    const { data: response } = result
    const { isOk } = response

    if (isOk) {
      const data: IProfile = response.data
      yield put(changeUserRole(data))
      yield put(showNotification(getTranslationById('userUpdated')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchChangeUserRoleRequest() {
  yield takeEvery(CHANGE_USER_ROLE_REQUEST, sendChangeUserRoleRequest)
}

export function* sendChangeUserStatusRequest(action: IUserStatusChangeAction) {
  const { payload: { isActive, userId } } = action

  try {
    const result = yield request(
      apiProfile,
      { isActive, id: userId },
      'PUT',
    )
    const { data: response } = result
    const { isOk } = response

    if (isOk) {
      const data: IProfile = response.data
      yield put(changeUserStatus(data))
      yield put(showNotification(getTranslationById('userUpdated')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchChangeUserStatusRequest() {
  yield takeEvery(CHANGE_USER_STATUS_REQUEST, sendChangeUserStatusRequest)
}

const apiUser = '/user'
export function* sendDeleteUserRequest(action: IDeleteUserRequestAction){
  const { payload: { id } } = action

  try {
    const { data: response } = yield request(
      `${apiUser}/${id}`,
      undefined,
      'DELETE',
    )
    const { isOk } = response

    if (isOk) {
      yield put(deleteUser(id))
      yield put(showNotification(getTranslationById('userDeleted')))
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchDeleteUser() {
  yield takeEvery(DELETE_USER_REQUEST, sendDeleteUserRequest)
}
