import { connect } from 'react-redux'
import DashboardHome from './Home'
import { isLoggedSelector } from '../../../redux/user/selector'

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
})

export default connect(mapStateToProps, null)(DashboardHome)
