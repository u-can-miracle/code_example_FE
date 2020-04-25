import {
  ICompanyCreateRequest,
  ICompanyCreated,
} from '../../interfaces/contact'
import { IProfile } from '../../interfaces/user'
import { IRoleNamesTypes } from '../../../../Appearance_roles/src/interface'

interface ICompany {
  companyName: string
  country: string
  city: string
}

interface IRegistrationRequest {
  username: string
  email: string
  password: string
}
interface IRegistrationWithCompanyRequest extends IRegistrationRequest, ICompany {}

export type IRegistration = IRegistrationRequest | IRegistrationWithCompanyRequest

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export interface IRegRequestAction {
  type: typeof REGISTRATION_REQUEST,
  payload: IRegistration
}
export function registrationRequest(data: IRegistration): IRegRequestAction {
  return {
    type: REGISTRATION_REQUEST,
    payload: data
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
interface ILoginRequestAction {
  type: typeof LOGIN_REQUEST,
  payload: {
    email: string
    password: string
  }
}
export function loginRequest(email: string, password: string): ILoginRequestAction {
  return {
    type: LOGIN_REQUEST,
    payload: {
      email,
      password,
    }
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
interface ICompanyData {
  name: string
  country: string
  city: string
}
interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  payload: {
    profile: IProfile
    company: ICompanyData | {}
  }
}
export function loginSuccess(
  profile: IProfile,
  company: ICompanyData | {}
): ILoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      profile,
      company,
    }
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
interface ILogoutReqAction {
  type: typeof LOGOUT_REQUEST
}
export function logoutRequest(): ILogoutReqAction {
  return {
    type: LOGOUT_REQUEST,
  }
}
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
interface ILogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS
}

export const DISABLE_REGISTERED_PROCESS = 'DISABLE_REGISTERED_PROCESS'
interface IDisableRegProcessAction {
  type: typeof DISABLE_REGISTERED_PROCESS
}
export function disableRegisteredProcess(): IDisableRegProcessAction {
  return {
    type: DISABLE_REGISTERED_PROCESS
  }
}

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
interface IResetPwdRequestAction {
  type: typeof RESET_PASSWORD_REQUEST,
  payload: {
    email: string
    newPassword: string
  }
}
export function resetPwdRequest(email: string, newPassword: string): IResetPwdRequestAction {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: {
      email,
      newPassword,
    }
  }
}

export const DISABLE_CHANGE_PWD_PROCESS = 'DISABLE_CHANGE_PWD_PROCESS'
interface IDisableChangePwdProcessAction {
  type: typeof DISABLE_CHANGE_PWD_PROCESS
}
export function disableChangePWdProcess(): IDisableChangePwdProcessAction {
  return {
    type: DISABLE_CHANGE_PWD_PROCESS
  }
}

export const COMPANY_CREATE_REQUEST = 'COMPANY_CREATE_REQUEST'
export interface ICompanyRequestAction {
  type: typeof COMPANY_CREATE_REQUEST
  payload: ICompanyCreateRequest
}
export function companyCreateRequest(params: ICompanyCreateRequest): ICompanyRequestAction {
  return {
    type: COMPANY_CREATE_REQUEST,
    payload: params
  }
}

export const COMPANY_CREATE_SUCCESS = 'COMPANY_CREATE_SUCCESS'
export interface ICompanyCreateAction {
  type: typeof COMPANY_CREATE_SUCCESS
  payload: ICompanyCreated
}
export function companyCreate(params: ICompanyCreated): ICompanyCreateAction {
  return {
    type: COMPANY_CREATE_SUCCESS,
    payload: params
  }
}

export const COMPANY_UPDATE_REQUEST = 'COMPANY_UPDATE_REQUEST'
export interface ICompanyUpdateRequestAction {
  type: typeof COMPANY_UPDATE_REQUEST
  payload: ICompanyCreateRequest
}
export function companyUpdateRequest(params: ICompanyCreateRequest): ICompanyUpdateRequestAction {
  return {
    type: COMPANY_UPDATE_REQUEST,
    payload: params
  }
}

export const COMPANY_UPDATE_SUCCESS = 'COMPANY_UPDATE_SUCCESS'
export interface ICompanyUpdateAction {
  type: typeof COMPANY_UPDATE_SUCCESS
  payload: ICompanyCreated
}
export function companyUpdate(params: ICompanyCreated): ICompanyUpdateAction {
  return {
    type: COMPANY_UPDATE_SUCCESS,
    payload: params
  }
}

export const DESIGNER_PROFILE_UPDATE_REQUEST = 'DESIGNER_PROFILE_UPDATE_REQUEST'
export interface IDesignerProfileUpdateAction {
  type: typeof DESIGNER_PROFILE_UPDATE_REQUEST
  payload: IProfile
}
export function designerProfileUpdateRequest(params: IProfile): IDesignerProfileUpdateAction {
  return {
    type: DESIGNER_PROFILE_UPDATE_REQUEST,
    payload: params,
  }
}

export const DESIGNER_PROFILE_UPDATE_SUCCESS = 'DESIGNER_PROFILE_UPDATE_SUCCESS'
export interface IDesignProfileUpdateAction {
  type: typeof DESIGNER_PROFILE_UPDATE_SUCCESS
  payload: IProfile
}
export function designProfileUpdate(params: IProfile): IDesignProfileUpdateAction {
  return {
    type: DESIGNER_PROFILE_UPDATE_SUCCESS,
    payload: params
  }
}

export const INVITE_TO_COMPANY_REQUEST = 'INVITE_TO_COMPANY_REQUEST'
export interface IInviteToCompanyAction {
  type: typeof INVITE_TO_COMPANY_REQUEST
  payload: { email: string }
}
export function inviteToCompanyRequest(email: string): IInviteToCompanyAction {
  return {
    type: INVITE_TO_COMPANY_REQUEST,
    payload: { email }
  }
}

export const CHANGE_USER_ROLE_REQUEST = 'CHANGE_USER_ROLE_REQUEST'
export interface IRoleUpdate {
  role: IRoleNamesTypes
  userId: number
}
export interface IRoleUpdateAction {
  type: typeof CHANGE_USER_ROLE_REQUEST
  payload: IRoleUpdate
}
export function changeUserRoleRequest(params: IRoleUpdate): IRoleUpdateAction {
  return {
    type: CHANGE_USER_ROLE_REQUEST,
    payload: {
      role: params.role,
      userId: params.userId,
   }
  }
}

export const CHANGE_USER_ROLE_SUCCESS = 'CHANGE_USER_ROLE_SUCCESS'
export interface IChangeUserRoleAction {
  type: typeof CHANGE_USER_ROLE_SUCCESS
  payload: IRoleUpdate
}
export function changeUserRole(params: IProfile): IChangeUserRoleAction {
  return {
    type: CHANGE_USER_ROLE_SUCCESS,
    payload: {
      role: params.role,
      userId: params.id,
    }
  }
}

export interface IStatusChangeParams {
  userId: number
  isActive: boolean
}
export const CHANGE_USER_STATUS_REQUEST = 'CHANGE_USER_STATUS_REQUEST'
export interface IUserStatusChangeAction {
  type: typeof CHANGE_USER_STATUS_REQUEST
  payload: IStatusChangeParams
}
export function changeUserStatusRequest(params: IStatusChangeParams): IUserStatusChangeAction {
  return {
    type: CHANGE_USER_STATUS_REQUEST,
    payload: params
  }
}

export const CHANGE_USER_STATUS_SUCCESS = 'CHANGE_USER_STATUS_SUCCESS'
export interface IChangeUserStatusSuccessAction {
  type: typeof CHANGE_USER_STATUS_SUCCESS
  payload: IStatusChangeParams
}
export function changeUserStatus(params: IProfile): IChangeUserStatusSuccessAction {
  return {
    type: CHANGE_USER_STATUS_SUCCESS,
    payload: {
      isActive: params.isActive,
      userId: params.id,
    }
  }
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
export interface IDeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST
  payload: { id: number }
}
export function deleteUserRequest(id: number): IDeleteUserRequestAction {
  return {
    type: DELETE_USER_REQUEST,
    payload: { id }
  }
}

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export interface IDeleteUserAction {
  type: typeof DELETE_USER_SUCCESS
  payload: { id: number }
}
export function deleteUser(id: number): IDeleteUserAction {
  return {
    type: DELETE_USER_SUCCESS,
    payload: { id }
  }
}

export type IActions =
  IRegRequestAction |
  ILoginRequestAction |
  ILoginSuccessAction |
  ILogoutReqAction |
  ILogoutSuccessAction |
  IDisableRegProcessAction |
  IResetPwdRequestAction |
  IDisableChangePwdProcessAction |
  ICompanyCreateAction |
  ICompanyUpdateAction |
  IDesignProfileUpdateAction |
  IChangeUserRoleAction |
  IChangeUserStatusSuccessAction |
  IDeleteUserAction
