import * as React from 'react'
import { Select } from 'antd'

import { ROLES_PRIORITIES } from '../../../../../../../Appearance_roles/src/roles'
import getTranslationById from '../../../../../services/getTranslationById'
import { IRoleUpdate } from '../../../../../redux/user/actions'
import { IRoleNamesTypes } from '../../../../../../../Appearance_roles/src/interface'

interface IProps {
  allRoles: IRoleNamesTypes[]
  userId: number
  currentUserRole: IRoleNamesTypes
  memberRole: IRoleNamesTypes
  changeRole: (params: IRoleUpdate) => void
}

function UpdateRoles({
  allRoles,
  userId,
  currentUserRole,
  memberRole,
  changeRole,
}: IProps) {
  const isLowestRole = ROLES_PRIORITIES[currentUserRole] === ROLES_PRIORITIES.MEMBER

  return (
    <Select
      disabled={isLowestRole}
      defaultValue={memberRole}
      value={memberRole}
      onChange={(role: IRoleNamesTypes) => changeRole({ role, userId })}
      style={{ width: 200 }}
    >
      {allRoles.map(r => {
        const myRole = ROLES_PRIORITIES[currentUserRole]
        const myRoleHigherThanRoleToAssign = myRole > ROLES_PRIORITIES[r]
        const myRoleHigherThanMemberRole = myRole > ROLES_PRIORITIES[memberRole]

        return (
          <Select.Option
            disabled={!(myRoleHigherThanRoleToAssign && myRoleHigherThanMemberRole)}
            key={r}
          >
            {getTranslationById(r)}
          </Select.Option>)
      })}
    </Select>
  )
}

export default UpdateRoles
