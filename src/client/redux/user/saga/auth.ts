import { put, takeEvery } from 'redux-saga/effects'
import {
  REGISTRATION_REQUEST,
  IRegRequestAction,

  LOGIN_REQUEST,
  loginSuccess,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,

  RESET_PASSWORD_REQUEST,
} from '../actions'
import {
  showError,
  showNotification,
} from '../../notifier/actions'
import { setAllPaidPlans } from '../../plan/actions'
import { setCategories } from '../../category/actions'
import history from '../../../containers/App/history'
import request, { getErrorMessage } from '../../../services/request'
import { VENDOR, NOT_AUTH_PAGE_REDIRECT } from '../../../constants'
import getTranslationById from '../../../services/getTranslationById'

const apiRegistration = '/registration'
export function* sendRegistrationRequest(action: IRegRequestAction){
  try {
    const { data: response } = yield request(apiRegistration, {
      ...action.payload,
      userType: VENDOR,
    })

    if(response.isOk){
      history.push('/dashboard/registration/success')
    } else {
      let message: string
      if (response.data.isEmailExists) {
        message = getTranslationById('regErrEmailExists')
      } else {
        message = getErrorMessage(response)
      }

      yield put(showError(message, 8))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchRegistration(){
    yield takeEvery(REGISTRATION_REQUEST, sendRegistrationRequest)
}

interface ILogPayload {
  email: string,
  password: string,
}
interface ILogAction {
  type: string,
  payload: ILogPayload
}

const apiLogin = '/login'
export function* sendLoginRequest(action: ILogAction){
  try {
    const { data: response } = yield request(apiLogin, action.payload)
    const {
      isOk,
      data: {
        categories,
        profile,
        isNotVerified,
        isUserExists,
        company = {},
        paidPlans,
      },
    } = response

    if(isOk){
      yield put(loginSuccess(profile, company))
      yield put(setCategories(categories))
      yield put(setAllPaidPlans(paidPlans))
      yield put(showNotification(getTranslationById('loginSuccess')))
      history.push('/dashboard/categories')
    } else {
      if(isNotVerified){
        yield put(showError(getTranslationById('loginErrorVerify'), 8))
      } else if (!isUserExists) {
        yield put(showError(getTranslationById('loginError'), 8))
      } else {
        yield put(showError(getErrorMessage(response), 8))
      }
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchLogin(){
  yield takeEvery(LOGIN_REQUEST, sendLoginRequest)
}

const apiLogout = '/logout'
export function* sendLogoutRequest() {
  try {
    const { data: response } = yield request(apiLogout)
    const { isOk } = response

    if(isOk){
      history.push(NOT_AUTH_PAGE_REDIRECT)
      yield put({
        type: LOGOUT_SUCCESS,
      })
    } else {
      yield put(showError(getErrorMessage(response)))
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchLogout(){
  yield takeEvery(LOGOUT_REQUEST, sendLogoutRequest)
}

interface IResetPwdAction {
  type: string
  payload: {
    email: string,
    newPassword: string,
  }
}
const apiResetPassword = '/reset-password'
export function* sendResetPasswordRequest(action: IResetPwdAction) {
  try {
    const { data: response } = yield request(apiResetPassword, action.payload)
    const { isOk } = response

    if(isOk){
      yield put(showNotification(getTranslationById('resetPwdConfirm'), 8))
    } else {
      if(!response.data.isUserExist){
        yield put(showError(getTranslationById('resetPwdErrorEmail')))
      } else {
        yield put(showError(getErrorMessage(response)))
      }
    }
  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchResetPassword(){
  yield takeEvery(RESET_PASSWORD_REQUEST, sendResetPasswordRequest)
}
