import * as React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Button, Form } from 'antd'

import CardSection from '../CardSection'
import getTranslationById from '../../../../../services/getTranslationById'

interface IProps {
  showError: (reason: string) => void
  closeModal: () => void
  planChargeRequest: (token: any) => void
}
function CheckoutForm({
  showError,
  closeModal,
  planChargeRequest,
}: IProps) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    const card = elements.getElement(CardElement)

    if (!card) {
      return
    }

    const result = await stripe.createToken(card)

    if (result.error) {
      showError(result.error.message || '')
    } else {
      // Send the token to your server.
      planChargeRequest(result.token)
      // closeModal()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CardSection />
      <Button
        className="checkout-form--submit-checkout"
        type="primary"
        htmlType="submit"
        disabled={!stripe}
      >
        {getTranslationById('planSubmitPlanPayout')}
      </Button>
    </Form>
  )
}

export default CheckoutForm
