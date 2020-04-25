import * as React from 'react'

import getTranslationById from '../../../../services/getTranslationById'

const RegistrationSuccess = () => (
  <div>{getTranslationById('regCongirmMessage')}</div>
)

export default RegistrationSuccess
