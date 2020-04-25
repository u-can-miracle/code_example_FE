import {
  OPEN_MODAL,
  CLOSE_MODAL,
  IActions,
} from './actions'

export interface IState {
  openedModal: string
}

const initialState: IState = {
  openedModal: '',
}

export default function modalReducer(
  state = initialState,
  action: IActions,
): IState {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        openedModal: action.payload.openedModal,
      }

    case CLOSE_MODAL:
      return {
        ...state,
        openedModal: '',
      }

    default:
      return state
  }
}
