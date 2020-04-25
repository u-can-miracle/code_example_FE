import { connect } from 'react-redux'

import CheckoutForm from './CheckoutForm'
import { showError } from '../../../../../redux/notifier/actions'
import { planChargeRequest } from '../../../../../redux/plan/actions'
// import { isRequestEnabledSelector } from '../../../../../redux/notifier/selector'

const mapStateToProps = state => ({
  // isRequestEnabled: isRequestEnabledSelector(state)
})

const mapDispatchToProps = dispatch => ({
  showError: (reason: string) => dispatch(showError(reason)),
  planChargeRequest: (token: any) => dispatch(planChargeRequest(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
