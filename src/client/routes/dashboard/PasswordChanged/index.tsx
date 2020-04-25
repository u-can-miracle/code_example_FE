import { connect } from 'react-redux'
import PasswordChanged from './PasswordChanged'
import { isChangingPwdSelector } from '../../../redux/user/selector'
import { disableChangePWdProcess } from '../../../redux/user/actions'

const mapStateToProps = state => ({
  isChangingPwd: isChangingPwdSelector(state),
})

const mapDispatchToProps = dispatch => ({
  disableChangePWdProcess: () =>
    dispatch(disableChangePWdProcess()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChanged)
