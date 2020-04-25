import { createSelector } from 'reselect'

import { ALL_ROLES } from '../../../../Appearance_roles/src/roles'
import { IRoleNamesTypes } from '../../../../Appearance_roles/src/interface'
import { IState } from '../rootReducer'
import { isUrlAllowed } from '../../services/utils'

const { ADMIN, MANAGER } = ALL_ROLES

export const isLoggedSelector = (state: IState) => state.user.isLogged

export const isUrlAllowedSelector = (state: IState, props) => isUrlAllowed(props.location.pathname)

export const isRegistrationConfirmationSelector = (state: IState) =>
  state.user.isRegistationConfirmation

export const isChangingPwdSelector = (state: IState) =>
  state.user.isChangingPasswordProcess

export const allRolesSelector = () => <IRoleNamesTypes[]> Object.values(ALL_ROLES)

export const userIdSelector = (state: IState) => state.user.profile.id

export const userNameSelector = (state: IState) => state.user.profile.name

export const userEmailSelector = (state: IState) => state.user.profile.email

export const userPhoneSelector = (state: IState) => state.user.profile.phone

export const userRoleSelector = (state: IState) => state.user.profile.role

export const companySelector = (state: IState) => state.user.company

export const invitedEmailSelector = (state: IState) => state.user.registration.email

export const isCompanyCreatedSelector = createSelector(
  companySelector,
  company => !!company.companyId,
)

export const сompanyMembersSelector = createSelector(
  companySelector,
  company => company.members,
)

export const companyNameSelector = createSelector(
  companySelector,
  company => company.companyName
)

export const companyContactsSelector = createSelector(
  companySelector,
  company => company.contacts
)

export const firstCompanyContactsSelector = createSelector(
  companyContactsSelector,
  contacts => contacts[0]
)

export const isCompanyExistsSelector = createSelector(
  companyNameSelector,
  companyName => !!companyName
)

export const isCompanyEditAllowedSelector = createSelector(
  userRoleSelector,
  userRole => userRole === ADMIN || userRole === MANAGER
)
