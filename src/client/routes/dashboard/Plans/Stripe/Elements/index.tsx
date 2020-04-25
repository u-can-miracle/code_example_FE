import * as React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutForm from '../CheckoutForm'

// pk_test_GPaLIl31wmjVm43t54oLu5m8009xdZVNSz
// sk_test_fCSpjEUUekaK6N7NwWs6Fufp00ywIVEPXz

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_GPaLIl31wmjVm43t54oLu5m8009xdZVNSz')

interface IProps {
  closeModal: () => void
}

function StripeElements({
  closeModal,
}: IProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm closeModal={closeModal} />
    </Elements>
  )
}

export default StripeElements
