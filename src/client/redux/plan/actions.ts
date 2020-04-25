import { IPlanType, IPlanCharge } from '../../../../Appearance_planes/src/interfaces'
import { IChargeResponse } from '../../interfaces/plan'

export const SELECT_PLAN = 'SELECT_PLAN'
export interface ISelectPlanAction {
  type: typeof SELECT_PLAN
  payload: {
    planName: IPlanType
  }
}
export function selectPlan(planName: IPlanType): ISelectPlanAction{
  return {
    type: SELECT_PLAN,
    payload: {
      planName,
    }
  }
}

export const SET_MONTH_TO_BUY = 'SET_MONTH_TO_BUY'
export interface ISetMonthToBuy {
  type: typeof SET_MONTH_TO_BUY
  payload: {
    monthToBuy: number
  }
}
export function setMonthToBy(monthToBuy: number): ISetMonthToBuy{
  return {
    type: SET_MONTH_TO_BUY,
    payload: {
      monthToBuy,
    }
  }
}

export const PLAN_CHARGE_REQUEST = 'PLAN_CHARGE_REQUEST'
export interface IPlanChargeRequestAction {
  type: typeof PLAN_CHARGE_REQUEST
  payload: { tokenId: string }
}
export function planChargeRequest(token: any): IPlanChargeRequestAction {
  return {
    type: PLAN_CHARGE_REQUEST,
    payload: {
      tokenId: token.id,
    }
  }
}

export const SET_PAID_PLAN = 'SET_PAID_PLAN'
interface ISetPaidAction {
  type: typeof SET_PAID_PLAN
  payload: IChargeResponse
}
export function setPaidPlan(params: IChargeResponse): ISetPaidAction {
  return {
    type: SET_PAID_PLAN,
    payload: {
      id: params.id,
      paidPlanCode: params.paidPlanCode,
      planStartDate: params.planStartDate,
      planExpirationDate: params.planExpirationDate,
    }
  }
}

export const SET_ALL_PAID_PLANS = 'SET_ALL_PAID_PLANS'
interface ISetAllPaidPlansAction {
  type: typeof SET_ALL_PAID_PLANS
  payload: IPlanCharge[]
}
export function setAllPaidPlans(paidPlans: IPlanCharge[]): ISetAllPaidPlansAction {
  return {
    type: SET_ALL_PAID_PLANS,
    payload: paidPlans
  }
}

export type IActions =
  ISelectPlanAction |
  ISetMonthToBuy |
  ISetPaidAction |
  ISetAllPaidPlansAction
