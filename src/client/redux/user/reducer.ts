import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DISABLE_REGISTERED_PROCESS,
  DISABLE_CHANGE_PWD_PROCESS,
  COMPANY_CREATE_SUCCESS,
  COMPANY_UPDATE_SUCCESS,
  DESIGNER_PROFILE_UPDATE_SUCCESS,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_STATUS_SUCCESS,
  DELETE_USER_SUCCESS,

  IActions,
} from './actions'
import { getUpdatedMembers } from './utils'
import { ICompanyContact } from '../../interfaces/contact'
import { IRegistration, IProfile } from '../../interfaces/user'
import { ALL_ROLES } from '../../../../Appearance_roles/src/roles'

export interface IState {
  registration: IRegistration
  isRegistationConfirmation: boolean
  isChangingPasswordProcess: boolean
  isLogged: boolean,
  profile: IProfile,
  company: {
    companyName: string
    companyId?: number
    contacts: ICompanyContact[]
    members: IProfile[]
  }
}

const initialState: IState = {
  registration: {
    email: '',
  },
  isRegistationConfirmation: false,
  isChangingPasswordProcess: false,
  isLogged: false,
  profile: {
    id: NaN,
    name: '',
    email: '',
    phone: '',
    role: ALL_ROLES.ADMIN,
    isActive: true,
  },
  company: {
    companyName: '',
    companyId: undefined,
    contacts: [],
    members: [],
  }
}

export default function userReducer(
  state = initialState,
  action: IActions,
): IState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload.profile,
        },
        company: {
          ...state.company,
          ...action.payload.company,
        },
        isLogged: true,
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogged: false,
      }

    case DISABLE_REGISTERED_PROCESS:
      return {
        ...state,
        isRegistationConfirmation: false
      }

    case DISABLE_CHANGE_PWD_PROCESS:
      return {
        ...state,
        isChangingPasswordProcess: false
      }

    case COMPANY_CREATE_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          companyName: action.payload.name,
          companyId: action.payload.companyId,
          contacts: [{
            contactId: action.payload.contactId,
            country: action.payload.country,
            city: action.payload.city,
            address: action.payload.address,
            email: action.payload.email,
            phone: action.payload.phone,
          }],
        }
      }

    case COMPANY_UPDATE_SUCCESS: {
      const updatedContacts = state.company.contacts.map(c => {
        if (c.contactId !== action.payload.contactId) {
          return c
        } else {
          return {
              contactId: action.payload.contactId,
              country: action.payload.country,
              city: action.payload.city,
              address: action.payload.address,
              email: action.payload.email,
              phone: action.payload.phone,
          }
        }
      })

      return {
        ...state,
        company: {
          ...state.company,
          companyName: action.payload.name,
          companyId: action.payload.companyId,
          contacts: updatedContacts
        }
      }
    }

    case DESIGNER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        }
      }

    case CHANGE_USER_ROLE_SUCCESS: {
      const updatedMembers = getUpdatedMembers(state.company.members, action, 'role')

      return {
        ...state,
        company: {
          ...state.company,
          members: updatedMembers,
        }
      }
    }

    case CHANGE_USER_STATUS_SUCCESS: {
      const updatedMembers = getUpdatedMembers(state.company.members, action, 'isActive')

      return {
        ...state,
        company: {
          ...state.company,
          members: updatedMembers,
        }
      }
    }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          members: state.company.members.filter(m => m.id !== action.payload.id),
        }
      }

    default:
      return state
  }
}
