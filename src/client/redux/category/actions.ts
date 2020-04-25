import { ICategory, ICategoryBase } from '../../interfaces/category'

export const SET_CATEGORIES = 'SET_CATEGORIES'
export interface ISetCategory {
  type: typeof SET_CATEGORIES,
  payload: { categories: ICategory[] }
}
export function setCategories(categories: ICategory[]) {
  return {
    type: SET_CATEGORIES,
    payload: { categories }
  }
}

export const REMOVE_CATEGORY_REQUEST = 'REMOVE_CATEGORY_REQUEST'
export const removeCategoryRequest = (id: number) => ({
  type: typeof REMOVE_CATEGORY_REQUEST,
  payload: { id }
})

export const REMOVE_CATEGORY = 'REMOVE_CATEGORY'
interface IRemoveAction {
  type: typeof REMOVE_CATEGORY,
  payload: { id: number }
}
export function removeCategory(id: number): IRemoveAction {
  return {
    type: REMOVE_CATEGORY,
    payload: { id }
  }
}

export const EDIT_CATEGORY_REQUEST = 'EDIT_CATEGORY_REQUEST'
export interface IEditRequest {
  type: typeof EDIT_CATEGORY_REQUEST
  payload: {
    id: number
    categoryUpdateData: ICategoryBase
  }
}
export function editCategoryRequest(params: ICategoryBase, id: number): IEditRequest {
  return {
    type: EDIT_CATEGORY_REQUEST,
    payload: {
      id,
      categoryUpdateData: params,
    }
  }
}

export const EDIT_CATEGORY = 'EDIT_CATEGORY'
interface IEditAction {
  type: typeof EDIT_CATEGORY
  payload: ICategory
}
export function editCategory(params: ICategory): IEditAction {
    return {
      type: EDIT_CATEGORY,
      payload: params
    }
  }

export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST'
export interface ICreateRequestAction {
  type: typeof CREATE_CATEGORY_REQUEST
  payload: ICategoryBase
}
export function createCategoryRequest(params: ICategoryBase): ICreateRequestAction {
  return {
    type: CREATE_CATEGORY_REQUEST,
    payload: {
      name: params.name,
      priority: params.priority,
      parentCategoryId: params.parentCategoryId,
    }
  }
}

export const CREATE_CATEGORY = 'CREATE_CATEGORY'
interface ICreateAction {
  type: typeof CREATE_CATEGORY
  payload: ICategory
}
export function createCategory(category: ICategory): ICreateAction {
  return {
    type: CREATE_CATEGORY,
    payload: {
      ...category
    }
  }
}

export const SET_SELECTED_CATEGORY_ID = 'SET_SELECTED_CATEGORY_ID'
interface ISetSelectedCategoryAction {
  type: typeof SET_SELECTED_CATEGORY_ID
  payload: {
    seletedCategoryId: number
  }
}
export function setSelectedCategoryId(seletedCategoryId: number): ISetSelectedCategoryAction {
  return {
    type: SET_SELECTED_CATEGORY_ID,
    payload: {
      seletedCategoryId
    }
  }
}

export const CLEAR_CATEGORY_ID = 'CLEAR_CATEGORY_ID'
interface IClearCategory {
  type: typeof CLEAR_CATEGORY_ID
}
export function clearCategoryId() {
  return {
    type: CLEAR_CATEGORY_ID
  }
}

export const SET_CATEGORY_SEARCH_NAME = 'SET_CATEGORY_SEARCH_NAME'
interface ISetCategorySearchNameAction {
  type: typeof SET_CATEGORY_SEARCH_NAME
  payload: {
    name: string
  }
}
export function setCategorySearchName(name: string): ISetCategorySearchNameAction {
  return {
    type: SET_CATEGORY_SEARCH_NAME,
    payload: {
      name,
    }
  }
}

export const SEARCH_CATEGORY_REQUEST = 'SEARCH_CATEGORY_REQUEST'
export interface ISearchCategoryRequestAction {
  type: typeof SEARCH_CATEGORY_REQUEST
  payload: {
    name: string
  }
}
export function searchCategoryRequest(name: string): ISearchCategoryRequestAction{
  return {
    type: SEARCH_CATEGORY_REQUEST,
    payload: {
      name,
    }
  }
}

export const GET_ALL_CATEGORIES_REQUEST = 'GET_ALL_CATEGORIES_REQUEST'
export interface IGetAllCategoriesRequest {
  type: typeof GET_ALL_CATEGORIES_REQUEST
}
export function getAllCategoriesRequest(): IGetAllCategoriesRequest {
  return {
    type: GET_ALL_CATEGORIES_REQUEST,
  }
}

export type IActions =
  ISetSelectedCategoryAction |
  ICreateAction |
  IEditAction |
  IRemoveAction |
  IClearCategory |
  ISetCategory |
  ISetCategorySearchNameAction
