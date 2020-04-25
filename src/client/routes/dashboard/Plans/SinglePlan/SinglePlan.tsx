import * as React from 'react'
import { Button } from 'antd'

import getTranslationById from '../../../../services/getTranslationById'
import { IPlanType } from '../../../../../../Appearance_planes/src/interfaces'

interface IProps {
  className?: string
  code: IPlanType
  planName: string,
  devicesInfo: string
  priceInfo: string
  setPlan: (code: IPlanType) => void
  onAfterSetPlan?: () => void
}

const SinglePlan = ({
  className = '',
  code,
  planName,
  devicesInfo,
  priceInfo,
  setPlan,
  onAfterSetPlan,
}: IProps) => {
  function handleClick() {
    setPlan(code)
    if (onAfterSetPlan) {
      onAfterSetPlan()
    }
  }

  return (
    <div className={`plans--variant ${className}`}>
      <div className="plans--variant-title">
        {planName}
      </div>
      <div className="plans--variant-devices">
        {devicesInfo}
      </div>
      <div className="plans--variant-price">
        {priceInfo}
      </div>
      <div className="plans--variant-button">
        <Button onClick={handleClick}>
          {getTranslationById('planGetPlan')}
        </Button>
      </div>
    </div>
  )
}

export default SinglePlan
