import * as React from 'react'
import { Button } from 'antd'

import CompanyFormCreate from '../common/CompanyFormCreate'
import CompanyFormUpdate from '../common/CompanyFormUpdate'
import getTranslationById from '../../../../services/getTranslationById'
import { IStateProps } from './'

const CompanyProfile = ({
  isCompanyExists,
  contacts,
}: IStateProps) => {
  const initialState = {
    isCompanyFormVisible: false,
  }
  const [state, setState] = React.useState(initialState)
  const { isCompanyFormVisible } = state

  if (!isCompanyExists) {
    if (isCompanyFormVisible) {
      return <CompanyFormCreate />
    }

    return (<div>
      {getTranslationById('companyNotCreated')}
      <div>
        <Button
          onClick={() => setState({ isCompanyFormVisible: true })}
        >
          {getTranslationById('companyCreate')}
        </Button>
      </div>
    </div>)
  }

  if (contacts.length === 1) {
    return <CompanyFormUpdate />
  }
  // TODO: handle many contacts
  return null
}

export default CompanyProfile
