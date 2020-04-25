import { connect } from 'react-redux'

import CardSection from './CardSection'
import {
  chosenPlanPriceSelector,
  totalPaymentSelector,
} from '../../../../../redux/plan/selector'
import { setMonthToBy } from '../../../../../redux/plan/actions'

const mapStateToProps = (state, props) => ({
  planPrice: chosenPlanPriceSelector(state),
  totalPayment: totalPaymentSelector(state),
})

const mapDispatchToProps = dispatch => ({
  setMonthToBuy: (monthToBuy: number) => dispatch(setMonthToBy(monthToBuy)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardSection)
