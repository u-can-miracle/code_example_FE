import { createSelector } from 'reselect'

import { ICategory } from '../../interfaces/category'
import { IState } from '../rootReducer'
import getTranslationById from '../../services/getTranslationById'
import buildNestedTree from '../../services/hierarchy/buildNestedTree'

import { CATEGORY_PAGE_URL } from '../../constants/category'

export function categoriesSelector(state: IState): ICategory[]  {
  return state.category.categories
}

export function selectedCategoryIdSelector(state: IState): number | null  {
  return state.category.seletedCategoryId
}

export function categorySearchNameSelector(state: IState): string  {
  return state.category.categoryName
}

export const getIdFromParamsSelector = (state: IState, props) => +props.match.params.id

export const isCategoryPageSelector = (state: IState, props) => {
  return props.match.url === CATEGORY_PAGE_URL
}

export const selectedCategoryNameSelector = createSelector(
  selectedCategoryIdSelector,
  categoriesSelector,
  (id, categories) => {
    const activeCategory = categories.find(c => c.id === id)

    return activeCategory && activeCategory.name
  }
)

export const categoriesTreeSelector = createSelector(
  categoriesSelector,
  categories => buildNestedTree(categories)
)

export const singleCategoryParamsSelector = createSelector(
  categoriesSelector,
  getIdFromParamsSelector,
  (categories, id) => categories.find(categ => categ.id === id)
)

export const singleCategoryNameSelector = createSelector(
  singleCategoryParamsSelector,
  category => category ? category.name : getTranslationById('categoryAbsent')
)

export const singleCategoryPrioritySelector = createSelector(
  singleCategoryParamsSelector,
  category => category ? category.priority : getTranslationById('categoryAbsent')
)

export const singleCategoryParentCategoryIdSelector = createSelector(
  singleCategoryParamsSelector,
  category => category ? category.parentCategoryId : getTranslationById('categoryAbsent')
)

export const withoutCurrentCategoriesSelector = createSelector(
  categoriesSelector,
  getIdFromParamsSelector,
  (categories, currCategId) => categories
    .filter(({ id }) => id !== currCategId)
    .map(({ id, name }) => ({ id, name }))
)

export const parentCategoriesListSelector = createSelector(
  categoriesSelector,
  categories => categories.map(({ id, name }) => ({ id, name }))
)
