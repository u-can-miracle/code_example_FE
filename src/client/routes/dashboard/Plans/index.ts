import { connect } from 'react-redux'

import Plans from './Plans'
import { choosenPlanNameSelector } from '../../../redux/plan/selector'
import { openModal, closeModal } from '../../../redux/modal/actions'
import { PLAN_PAYMENT_MODAL } from '../../../redux/modal/constants'
import { isModalVisible } from '../../../redux/modal/utils'
import { IState } from '../../../redux/rootReducer'

const mapStateToProps = (state: IState) => ({
  planName: choosenPlanNameSelector(state),
  isPlanModalOpened: isModalVisible(state, PLAN_PAYMENT_MODAL),
})
const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openModal(PLAN_PAYMENT_MODAL)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Plans)
