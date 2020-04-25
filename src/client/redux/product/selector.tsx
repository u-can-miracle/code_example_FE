import { createSelector } from 'reselect'

import { PAGINATION_LIMIT, PRODUCT_URL } from '../../constants/product'
import { IState } from '../rootReducer'
import { convertAssetToAntFile } from '../../services/formatters'
import {
  modelWarningTranslator,
  modelErrorTranslator,
} from '../../services/translators'

export const productsSelector = (state: IState) => state.product.products

export const productCreateSelector = (state: IState) => state.product.productForm

export const isProductPageSelector = (state: IState, props) => {
  return props.match.url === PRODUCT_URL
}

export const productSearchNameSelector = (state: IState) => state.product.productSearchName

export const currentPageNumberSelector = (state: IState) => state.product.currentPageNumber

export const paginationLimitSelector = () => PAGINATION_LIMIT

export const allProductsCountSelector = (state: IState) => state.product.allProductsCount

export const prodNameSelector = createSelector(
  productCreateSelector,
  productForm => productForm.name,
)

export const prodDescriptionSelector = createSelector(
  productCreateSelector,
  productForm => productForm.description,
)

export const prodHeightSelector = createSelector(
  productCreateSelector,
  productForm => productForm.height,
)

export const prodWidthSelector = createSelector(
  productCreateSelector,
  productForm => productForm.width,
)

export const prodDepthSelector = createSelector(
  productCreateSelector,
  productForm => productForm.depth,
)

export const prodCategoryIdSelector = createSelector(
  productCreateSelector,
  productForm => productForm.categoryId,
)

export const modelSelector = createSelector(
  productCreateSelector,
  productForm => productForm.model,
)

export const productImagesSelector = createSelector(
  productCreateSelector,
  productForm => productForm.images,
)

export const productTexturesSelector = createSelector(
  productCreateSelector,
  productForm => productForm.textures,
)

export const formattedModelSelector = createSelector(
  modelSelector,
  model => model && convertAssetToAntFile(model)
)

export const formattedImagesSelector = createSelector(
  productImagesSelector,
  images => images.map(img => convertAssetToAntFile(img))
)

export const formattedTexturesSelector = createSelector(
  productTexturesSelector,
  textures => textures.map(texture => convertAssetToAntFile(texture))
)

export function getIdFromParamsSelector(state: IState, props): number{
  return +props.match.params.id
}

export const convertingMessageSelector = createSelector(
  modelSelector,
  model => model && model.convertingMessage
)

export const modelWarningSelector = createSelector(
  convertingMessageSelector,
  convertingMessage => convertingMessage && convertingMessage.warning
)

export const modelWarningTranslatorSelector = createSelector(
  modelWarningSelector,
  modelWarning => modelWarning && modelWarningTranslator(modelWarning)
)

export const modelErrorSelector = createSelector(
  convertingMessageSelector,
  convertingMessage => convertingMessage && convertingMessage.error
)

export const modelErrorTranslatorSelector = createSelector(
  modelErrorSelector,
  modelError => modelError && modelErrorTranslator(modelError)
)
