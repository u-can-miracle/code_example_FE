import * as moment from 'moment'

import { ALLOWED_URLS } from '../constants'
import { IPlanCharge } from '../../../Appearance_planes/src/interfaces'

export function removeEmptyStringKeys(obj) {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }

  return obj
}

export function isUrlAllowed(url: string): boolean {
  return ALLOWED_URLS.some(route => url.includes(route))
}

export function getPlanByDate(plans: IPlanCharge[], date?: Date): IPlanCharge | undefined {
  const founded = plans.find(plan => {
    const time = moment(date)
    const expDate = moment(plan.planExpirationDate)
    const startDate = moment(plan.planStartDate)
    const isInPeriod = time.isBefore(expDate) && time.isAfter(startDate)

    return isInPeriod
  })

  return founded
}
