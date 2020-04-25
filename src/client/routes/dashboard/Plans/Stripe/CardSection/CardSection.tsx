import * as React from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import { Select } from 'antd'

import getTranslationById from '../../../../../services/getTranslationById'

const { Option } = Select

interface IProps {
  planPrice: number
  totalPayment: number
  setMonthToBuy: (monthToBuy: number) => void
}

function CardSection({
  planPrice,
  totalPayment,
  setMonthToBuy,
}: IProps) {
  const CARD_ELEMENT_OPTIONS = {
    hidePostalCode: true,
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  function setMonthAmount(value) {
    setMonthToBuy(Number(value))
  }

  return (
    <div>
      <div className="key-value-container">
        <div className="key">
          {getTranslationById('price') + ':'}
        </div>
        <div className="value">
          {planPrice} $/{getTranslationById('month').toLowerCase()}
        </div>
      </div>

      <div className="key-value-container">
        <div className="key">
          {getTranslationById('monthAmount') + ':'}
        </div>
        <div className="value">
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={setMonthAmount}
          >
            {new Array(6).fill(1).map((el, index) => (
              <Option
                key={index}
                value={index + 1}
              >
                {index + 1}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="key-value-container">
        <div className="key">
          {getTranslationById('total') + ':'}
        </div>
        <div className="value">
          {totalPayment} $/{getTranslationById('month').toLowerCase()}
        </div>
      </div>

      <label>
        <div className="card-title">
          {getTranslationById('planCardDetails')}
        </div>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  )
}

export default CardSection
