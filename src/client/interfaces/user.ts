import { IRoleNamesTypes } from '../../../Appearance_roles/src/interface'

export interface IProfile {
  id: number
  name: string
  email: string
  phone: string
  role: IRoleNamesTypes
  isActive: boolean
}

export interface IRegistration {
  email: string
}
