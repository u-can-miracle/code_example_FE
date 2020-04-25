import { connect } from 'react-redux'
import Notice from './Notice'
import {
  notifierTypeSelector,
  notifierContentSelector,
  notifierDurationSelector,
  isRequestEnabledSelector,
} from '../../redux/notifier/selector'

const mapStateToProps = state => ({
  type: notifierTypeSelector(state),
  content: notifierContentSelector(state),
  duration: notifierDurationSelector(state),
  isRequestEnabled: isRequestEnabledSelector(state)
})

export default connect(mapStateToProps)(Notice)
