import { connect } from 'react-redux'
import ResetPassword from './ResetPassword'
import { resetPwdRequest } from '../../../redux/user/actions'

const mapDispatchToProps = dispatch => ({
  resetPwd: (email: string, newPassword: string) =>
    dispatch(resetPwdRequest(email, newPassword)),
})

export default connect(null, mapDispatchToProps)(ResetPassword)
