import * as React from 'react'
import * as moment from 'moment'

import { getPlanByName } from '../../../../../../Appearance_planes/src/utils'
import getTranslationById from '../../../../services/getTranslationById'
import PaginationTable from '../../../../components/PaginationTable'
import { IPlanCharge } from '../../../../../../Appearance_planes/src/interfaces'

interface IProps {
  paidPlans: IPlanCharge[]
  activePlan: IPlanCharge
}

function PaidPlans({ paidPlans, activePlan }: IProps) {
  const columns = [
    {
      title: getTranslationById('planName'),
      dataIndex: 'paidPlanCode',
      key: 'paidPlanCode',
      render: (text: string, planCharge: IPlanCharge, index: number) => {
        const planName = getPlanByName(planCharge.paidPlanCode).name

        return planName
      }
    },
    {
      title: getTranslationById('planUsagePeriod'),
      dataIndex: 'usagePeriod',
      key: 'usagePeriod',
      render: (text: string, planCharge: IPlanCharge, index: number) => {
        const isCurrPlan = !!activePlan && activePlan.id === planCharge.id

        return (
          <>
            <span>
              {moment(planCharge.planStartDate).format('D MMM YYYY')}
              &nbsp;-&nbsp;
              {moment(planCharge.planExpirationDate).add('days', -1).format('D MMM YYYY')}
            </span>
            {
              isCurrPlan && (
                <span
                  className="paid-plans--current-plan"
                >
                  {getTranslationById('planCurrentText')}
                </span>
              )
            }
          </>
        )
      }
    },
  ]

  return (
    <>
      {
        activePlan && (
          <div>
            <h4>
              {getTranslationById('planCurrentText')}:
              <span className="paid-plans--plan-name">
                {getPlanByName(activePlan.paidPlanCode).name}
              </span>
            </h4>
            <div>
              <span>
                {getTranslationById('planCurrentTitle')}: &nbsp;
              </span>
              <span>
                {getTranslationById('from').toLowerCase()}
              </span>
              <span className="paid-plans--date">
                {moment(activePlan.planStartDate).format('D MMM YYYY')}
              </span>
              <span>
                {getTranslationById('to').toLowerCase()}
              </span>
              <span className="paid-plans--date">
                {moment(activePlan.planExpirationDate).format('D MMM YYYY')}
              </span>
            </div>
          </div>
        )
      }
      <PaginationTable
        rowKey="id"
        className="paid-plans--list"
        columns={columns}
        dataSource={paidPlans}
      />
    </>
  )
}

export default PaidPlans
