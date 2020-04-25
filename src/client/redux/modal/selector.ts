import { IState } from '../rootReducer'

export const openedModalSelector = (state: IState) => state.modal.openedModal
