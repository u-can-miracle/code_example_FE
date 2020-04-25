import { connect } from 'react-redux'

import SinglePlan from './SinglePlan'

import {
  planPriceTextSelector,
  planDeviceTextSelector,
  planNameSelector,
} from '../../../../redux/plan/selector'
import { selectPlan } from '../../../../redux/plan/actions'
import { IPlanType } from '../../../../../../Appearance_planes/src/interfaces'

const mapStateToProps = (state, props) => ({
  planName: planNameSelector(state, props),
  priceInfo: planPriceTextSelector(state, props),
  devicesInfo: planDeviceTextSelector(state, props),
})
const mapDispatchToProps = dispatch => ({
  setPlan: (planName: IPlanType) => dispatch(selectPlan(planName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlan)
