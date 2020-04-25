import { put, takeEvery } from 'redux-saga/effects'
import { IPlanCharge } from '../../../../Appearance_planes/src/interfaces'

import {
  PLAN_CHARGE_REQUEST,
  IPlanChargeRequestAction,
  setAllPaidPlans,
} from './actions'
import { choosenPlanNameSelector, monthToBuySelector } from './selector'
import {
  showError,
  showNotification,
} from '../notifier/actions'
import { closeModal } from '../modal/actions'
import request, { getErrorMessage } from '../../services/request'
import getTranslationById from '../../services/getTranslationById'
import getSingletoneStore from '../store/get.singletone.store'
import { IChargeResponse } from '../../interfaces/plan'

const apiPlan = '/plan'

const apiPlanCharge = `${apiPlan}/charge`

export function* sendPlanCharge(action: IPlanChargeRequestAction) {
  const { payload: { tokenId } } = action

  try {
    const store = getSingletoneStore()
    const state = store.getState()
    const planName = choosenPlanNameSelector(state)
    const monthToBuy = monthToBuySelector(state)

    const { data: response } = yield request(apiPlanCharge, {
      tokenId,
      planName,
      monthToBuy,
    })

    const { isOk } = response
    const data: IPlanCharge[] = response.data

    if (isOk) {
      yield put(showNotification(getTranslationById('invitationWasSent')))
      yield put(setAllPaidPlans(data))
      yield put(closeModal())
    } else {
      yield put(showError(getErrorMessage(response)))
    }

  } catch (err) {
    // log error to BE
    yield put(showError(getTranslationById('requestError')))
  }
}
export function* watchPlanCharge() {
  yield takeEvery(PLAN_CHARGE_REQUEST, sendPlanCharge)
}
