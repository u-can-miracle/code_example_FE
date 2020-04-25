import { connect } from 'react-redux'

import IntlWrapper from './IntlWrapper'
import {
  localeSelector,
  intlMessagesSelector
} from '../../redux/translation/selector'

const mapStateToProps = state => ({
  locale: localeSelector(state),
  messages: intlMessagesSelector(state)
})

export default connect(mapStateToProps)(IntlWrapper)
