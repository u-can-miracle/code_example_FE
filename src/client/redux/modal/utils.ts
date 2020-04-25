import {
  IModelType,
} from './constants'
import { openedModalSelector } from './selector'
import { IState } from '../rootReducer'

export function isModalVisible(
  state: IState,
  modalName: IModelType,
): boolean {
  return modalName === openedModalSelector(state)
}
