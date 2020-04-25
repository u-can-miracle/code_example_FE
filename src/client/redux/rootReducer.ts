import { combineReducers } from 'redux'

import translation from './translation/reducer'
import user, { IState as IUser } from './user/reducer'
import notifier from './notifier/reducer'
import category, { IState as ICategory } from './category/reducer'
import product, { IState as IProduct } from './product/reducer'
import plan, { IState as IPlan } from './plan/reducer'
import modal, { IState as IModal } from './modal/reducer'

export interface IState {
  user: IUser
  category: ICategory
  product: IProduct
  plan: IPlan
  modal: IModal
}

const rootReducer = combineReducers({
  translation,
  notifier,

  // with interfaces
  user,
  category,
  product,
  plan,
  modal,
})

export default rootReducer
