import { connect } from 'react-redux'
import Login from './Login'
import { loginRequest } from '../../../redux/user/actions'
import {
  isLoggedSelector,
} from '../../../redux/user/selector'

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
})

const mapDispatchToProps = dispatch => ({
  login: (email: string, password: string) =>
    dispatch(loginRequest(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
