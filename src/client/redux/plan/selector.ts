import { createSelector } from 'reselect'
import * as moment from 'moment'

import { PLANES_NAMES } from '../../../../Appearance_planes/src/constants'
import { getPlanByName } from '../../../../Appearance_planes/src/utils'
import getTranslationById from '../../services/getTranslationById'
import { DAYS_TO_EXPIRE_NOTIFY } from '../../constants'
import { getPlanByDate } from '../../services/utils'
import { IState } from '../rootReducer'
import { IPlanType, IPlan, IPlanCharge } from '../../../../Appearance_planes/src/interfaces'

export const choosenPlanNameSelector = (state: IState): IPlanType =>
  state.plan.chosenPlan

export const monthToBuySelector = (state: IState): number =>
  state.plan.monthToBuy

export const chosenPlanPriceSelector = createSelector(
  choosenPlanNameSelector,
  planName => getPlanByName(planName).price
)

export const totalPaymentSelector = createSelector(
  chosenPlanPriceSelector,
  monthToBuySelector,
  (price, month) => price * month
)

const planByCodeSelector = (state: IState, props): IPlan => getPlanByName(props.code)

export const planNameSelector = createSelector(
  planByCodeSelector,
  plan => plan.name
)

export const planPriceTextSelector = createSelector(
  planByCodeSelector,
  plan => `${plan.price} ${getTranslationById('planPriceInMonth')}`
)

export const planDeviceTextSelector = createSelector(
  planByCodeSelector,
  plan => {
    if (plan.code === PLANES_NAMES.COMPANIES.CORPORATE) {
      return getTranslationById('planUnlimit')
    }

    if (PLANES_NAMES.PERSONAL === plan.code) {
      return getTranslationById('planPersonalDeviceText')
    }

    return `≤ ${plan.devices} ${getTranslationById('planManyDevicesText')}`
  }
)

export const paidPlansSelector = (state: IState) => state.plan.paidPlans

export const activePlanSelector = createSelector(
  paidPlansSelector,
  (paidPlans: IPlanCharge[]): IPlanCharge | undefined => {
    const activePlan = getPlanByDate(paidPlans)

    return activePlan
  }
)

export const nextPlanSelector = createSelector(
  paidPlansSelector,
  activePlanSelector,
  (paidPlans, activePlan) => {
    if (!activePlan) {
      return undefined
    }

    const tomorrow = moment(activePlan.planExpirationDate).add('days', 1).toISOString()
    const nextPlan = getPlanByDate(paidPlans, new Date(tomorrow))

    return nextPlan
  }
)

export const planExpirationDateSelector = createSelector(
  activePlanSelector,
  (activePlan): Date => {
    if (!activePlan) {
      return new Date(1970)
    }

    return activePlan.planExpirationDate
  }
)

export const isPlanDateExpiredSelector = createSelector(
  planExpirationDateSelector,
  planExpDate => {
    const today = moment().utc().endOf('day').toISOString()
    const expirationDate = moment(planExpDate).utc().endOf('day').toISOString()
    const isExpired = moment(expirationDate).diff(moment(today)) < 0

    return isExpired
  }
)

export const willExpireSoonSelector = createSelector(
  activePlanSelector,
  nextPlanSelector,
  (activePlan, nextPlan) => {
    if (!activePlan || nextPlan) {
      return false
    }

    const weekAfterNow = moment().add('days', DAYS_TO_EXPIRE_NOTIFY)
    const willExpireSoon = moment(activePlan.planExpirationDate).diff(weekAfterNow) < 0

    return willExpireSoon
  }
)
