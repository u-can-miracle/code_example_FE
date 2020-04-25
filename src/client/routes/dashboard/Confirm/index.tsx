import { connect } from 'react-redux'
import Confirm from './Confirm'
import { isRegistrationConfirmationSelector } from '../../../redux/user/selector'
import { disableRegisteredProcess } from '../../../redux/user/actions'

const mapStateToProps = state => ({
  isRegistationConfirmation: isRegistrationConfirmationSelector(state),
})

const mapDispatchToProps = dispatch => ({
  disableRegisteredProcess: () =>
    dispatch(disableRegisteredProcess()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
