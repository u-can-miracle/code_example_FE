import * as React from 'react'

import { hasPermission } from '../../../../Appearance_roles/src/roles'
import {
  IRoleNamesTypes,
} from '../../../../Appearance_roles/src/interface'
import { IOwnProps } from './'

interface IProps extends IOwnProps {
  currentUserRole: IRoleNamesTypes
}

const RestrictedByRole: React.StatelessComponent<IProps> = ({
  currentUserRole,
  entityToCRUD,
  permission,
  member,
  allowComp,
  notAllowComp,
}: IProps) => {
  const options = {
    userRole: currentUserRole,
    entityToCRUD,
    permission,
    userToUpdate: member,
  }

  if (hasPermission(options)) {
    return allowComp
  }

  return notAllowComp || null
}

export default RestrictedByRole
