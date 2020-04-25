import { connect } from 'react-redux'

import PaidPlans from './PaidPlans'

import {
  paidPlansSelector,
  activePlanSelector,
  nextPlanSelector,
} from '../../../../redux/plan/selector'

const mapStateToProps = state => ({
  paidPlans: paidPlansSelector(state),
  activePlan: activePlanSelector(state),
  nextPlan: nextPlanSelector(state),
})

export default connect(mapStateToProps, null)(PaidPlans)
