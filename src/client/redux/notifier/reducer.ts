import { ENABLE_NOTIFIER, DISABLE_NOTIFIER } from './actions'

interface INotifierState {
  type: string
  content: string
  duration: number,
  isRequestEnabled: boolean
}
const initialState = {
  type: '',
  content: '',
  duration: 0,
  isRequestEnabled: false,
}
export default function notifierReducer(state = initialState, action): INotifierState {
  switch (action.type) {
    case ENABLE_NOTIFIER:
      return {
        ...state,
        ...action.payload,
        isRequestEnabled: true,
      }

    case DISABLE_NOTIFIER:
      return {
        ...state,
        content: '',
        duration: 0,
        isRequestEnabled: false
      }

    default:
      return state
  }
}
