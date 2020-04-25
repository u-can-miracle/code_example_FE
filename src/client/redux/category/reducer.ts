import {
  SET_CATEGORIES,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
  CREATE_CATEGORY,
  SET_SELECTED_CATEGORY_ID,
  CLEAR_CATEGORY_ID,
  SET_CATEGORY_SEARCH_NAME,

  IActions,
} from './actions'
import { ICategory } from '../../interfaces/category'

export interface IState {
  categoryName: string
  seletedCategoryId: number | null
  categories: ICategory[]
}

const initialState: IState = {
  categoryName: '',
  seletedCategoryId: null,
  categories: []
}

export default function categoryReducer(
  state = initialState,
  action: IActions
): IState {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      }

    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload.id)
      }

    case EDIT_CATEGORY:
      const updated = action.payload
      return {
        ...state,
        categories: state.categories.map(c => c.id === updated.id ? updated : c)
      }

    case CREATE_CATEGORY:
      const created = action.payload
      return {
        ...state,
        categories: [ ...state.categories, created ]
      }

    case SET_SELECTED_CATEGORY_ID:
      return {
        ...state,
        seletedCategoryId: action.payload.seletedCategoryId
      }

    case CLEAR_CATEGORY_ID:
      return {
        ...state,
        seletedCategoryId: null,
      }

    case SET_CATEGORY_SEARCH_NAME:
      return {
        ...state,
        categoryName: action.payload.name,
      }

    default:
      return state
  }
}
