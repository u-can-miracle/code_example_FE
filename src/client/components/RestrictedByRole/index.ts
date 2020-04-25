import { connect } from 'react-redux'

import RestrictedByRole from './RestrictedByRole'
import { userRoleSelector } from '../../redux/user/selector'

import {
  IRoleNamesTypes,
  IEntityToCRUDTypes,
  IPermissionTypes,
} from '../../../../Appearance_roles/src/interface'
import { IProfile } from '../../interfaces/user'

interface IStateProps {
  currentUserRole: IRoleNamesTypes
}
export interface IOwnProps {
  entityToCRUD: IEntityToCRUDTypes
  permission: IPermissionTypes
  member?: IProfile

  allowComp: React.ReactElement<any>
  notAllowComp?: React.ReactElement<any>
}

const mapStateToProps = (state, ownProps: IOwnProps) => ({
  currentUserRole: userRoleSelector(state)
})

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16990
export default connect<IStateProps, {}, IOwnProps>(mapStateToProps, {})(RestrictedByRole)
