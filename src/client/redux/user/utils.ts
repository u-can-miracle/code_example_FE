import { IProfile } from '../../interfaces/user'
import {
  IChangeUserRoleAction,
  IChangeUserStatusSuccessAction,
} from './actions'

type IActionsType = IChangeUserRoleAction | IChangeUserStatusSuccessAction
type IFieldType = 'role' | 'isActive'

export function getUpdatedMembers(
  members: IProfile[],
  action: IActionsType,
  field: IFieldType,
): IProfile[] {
  const updatedMembers = members.map(member => {
    if (member.id === action.payload.userId) {
      return {
        ...member,
        [field]: action.payload[field]
      }
    } else {
      return member
    }
  })

  return updatedMembers
}
