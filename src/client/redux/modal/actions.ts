import {
  IModelType,
} from './constants'

export const OPEN_MODAL = 'OPEN_MODAL'
export interface IOpenModalAction {
  type: typeof OPEN_MODAL
  payload: {
    openedModal: IModelType
  }
}
export function openModal(modalName: IModelType): IOpenModalAction {
  return {
    type: OPEN_MODAL,
    payload: {
      openedModal: modalName,
    }
  }
}

export const CLOSE_MODAL = 'CLOSE_MODAL'
export interface ICloseModalAction {
  type: typeof CLOSE_MODAL
}
export function closeModal(): ICloseModalAction {
  return {
    type: CLOSE_MODAL,
  }
}

export type IActions =
  IOpenModalAction |
  ICloseModalAction
