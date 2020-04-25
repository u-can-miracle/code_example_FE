import { connect } from 'react-redux'
import Products from './Products'
import {
  productsSelector,
  productSearchNameSelector,
  isProductPageSelector,
  currentPageNumberSelector,
  paginationLimitSelector,
  allProductsCountSelector,
} from '../../../redux/product/selector'
import {
  selectedCategoryIdSelector,
  isCategoryPageSelector,
  selectedCategoryNameSelector,
} from '../../../redux/category/selector'
import {
  clearForm,
  setEditedProduct,
  setProductSearchName,
  productPaginationRequest,
  removeProductRequest,
} from '../../../redux/product/actions'
import {
  setSelectedCategoryId,
} from '../../../redux/category/actions'
import {
  IProductPagination,
} from '../../../interfaces/category'

const mapStateToProps = (state, props) => ({
  products: productsSelector(state),
  productSearchName: productSearchNameSelector(state),
  currentPageNumber: currentPageNumberSelector(state),
  paginationLimit: paginationLimitSelector(),
  selectedCategoryId: selectedCategoryIdSelector(state),
  selectedCategoryName: selectedCategoryNameSelector(state),
  allProductsCount: allProductsCountSelector(state),
  isProductPage: isProductPageSelector(state, props),
  isCategoryPage: isCategoryPageSelector(state, props),
})

const mapDispatchToProps = dispatch => ({
  setSelectedCategoryId: category => dispatch(setSelectedCategoryId(category)),
  setProductName: (name: string) => dispatch(setProductSearchName(name)),
  onRemove: (id: number) => dispatch(removeProductRequest(id)),
  prodsRequest: (params: IProductPagination) => dispatch(productPaginationRequest(params)),
  clearForm: () => dispatch(clearForm()),
  setEditedProduct: (id: number) => dispatch(setEditedProduct(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
