import { IPlanType, IPlanCharge } from '../../../../Appearance_planes/src/interfaces'
import { PLANES_NAMES } from '../../../../Appearance_planes/src/constants'
import {
  SELECT_PLAN,
  SET_MONTH_TO_BUY,
  SET_PAID_PLAN,
  SET_ALL_PAID_PLANS,

  IActions,
} from './actions'

export interface IState {
  chosenPlan: IPlanType
  monthToBuy: number
  paidPlans: IPlanCharge[]
}

const initialState = {
  chosenPlan: PLANES_NAMES.PERSONAL,
  monthToBuy: 1,
  paidPlans: [],
}

export default function planReducer(
  state = initialState,
  action: IActions,
): IState {
  switch (action.type) {
    case SELECT_PLAN:
      return {
        ...state,
        chosenPlan: action.payload.planName
      }

    case SET_MONTH_TO_BUY:
      return {
        ...state,
        monthToBuy: action.payload.monthToBuy,
      }

    case SET_ALL_PAID_PLANS:
      return {
        ...state,
        paidPlans: action.payload,
      }

    case SET_PAID_PLAN:
      return {
        ...state,
        paidPlans: [
          ...state.paidPlans,
          {
            id: action.payload.id,
            paidPlanCode: action.payload.paidPlanCode,
            planStartDate: action.payload.planStartDate,
            planExpirationDate: action.payload.planExpirationDate,
          },
        ],
      }

    default:
      return state
  }
}
