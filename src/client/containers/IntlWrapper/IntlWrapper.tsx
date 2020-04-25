import * as React from 'react'
import { IntlProvider } from 'react-intl'

const IntlWrapper = props => (
  <IntlProvider {...props} >
    {props.children}
  </IntlProvider>
)

export default IntlWrapper
