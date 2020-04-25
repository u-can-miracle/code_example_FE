import * as React from 'react'
import { Modal } from 'antd'

import SinglePlan from './SinglePlan'
import Elements from './Stripe/Elements'
import getTranslationById from '../../../services/getTranslationById'
import { PLANS } from '../../../../../Appearance_planes/src/constants'

import { IPlanType } from '../../../../../Appearance_planes/src/interfaces'

interface IProps {
  planName: IPlanType
  isPlanModalOpened: boolean
  openModal: () => void
  closeModal: () => void
}

function Plans({
  planName,
  isPlanModalOpened,
  openModal,
  closeModal,
}: IProps) {
  return (
    <div className="plans--wrapper">
      <h4 className="plans--title">
      {getTranslationById('plans')}
      </h4>

      <div className="plans--content">
        <div className="plans--content-title">
          {getTranslationById('planPersonalTitle')}
        </div>

        { /* only PERSONAL plan */ }
        <SinglePlan
          code={PLANS[0].code}
          onAfterSetPlan={openModal}
        />
      </div>

      <div className="plans--content">
        <div className="plans--content-title">
          {getTranslationById('planCompanyTitle')}
        </div>

        <div className="plans--variants-wrapper">
          {
            /* skip PERSONAL plan */
            PLANS.slice(1).map(plan => (
              <SinglePlan
                key={plan.code}
                className="plans-variant-company"
                code={plan.code}
                onAfterSetPlan={openModal}
              />
            ))
          }
        </div>
      </div>

      <Modal
        title={`${getTranslationById('planPayment')} ${planName}`}
        visible={isPlanModalOpened}
        onCancel={closeModal}
        footer={null}
      >
        <Elements closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default Plans
