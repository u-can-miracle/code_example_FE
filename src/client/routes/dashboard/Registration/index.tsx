import { connect } from 'react-redux'
import { Form } from 'antd'

import Registration from './Registration'
import { registrationRequest, IRegistration } from '../../../redux/user/actions'
import {
  isLoggedSelector,
  invitedEmailSelector,
} from '../../../redux/user/selector'

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
  invitedEmail: invitedEmailSelector(state),
})

const mapDispatchToProps = dispatch => ({
  registration: (data: IRegistration) => dispatch(registrationRequest(data)),
})

const WithForm = Form.create({ name: 'register' })(Registration)
export default connect(mapStateToProps, mapDispatchToProps)(WithForm)
