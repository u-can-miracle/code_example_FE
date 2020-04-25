import { IPlanType } from '../../../Appearance_planes/src/interfaces'

export interface IChargeResponse {
  id: number
  paidPlanCode: IPlanType
  planStartDate: Date,
  planExpirationDate: Date,
}
