import { connect } from 'react-redux'

import { isLoggedSelector, isUrlAllowedSelector } from '../../../redux/user/selector'
import Dashboard from './Dashboard'

const mapStateToProps = (state, props) => ({
  isLogged: isLoggedSelector(state),
  isUrlAllowed: isUrlAllowedSelector(state, props),
})

export default connect(mapStateToProps, null)(Dashboard)
