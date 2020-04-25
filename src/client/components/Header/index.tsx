import { connect } from 'react-redux'
import Header from './Header'
import { logoutRequest } from '../../redux/user/actions'
import {
  productPaginationRequest,
  clearProducts,
} from '../../redux/product/actions'
import {
  clearCategoryId,
  getAllCategoriesRequest,
} from '../../redux/category/actions'
import { isLoggedSelector } from '../../redux/user/selector'
import { productSearchNameSelector } from '../../redux/product/selector'
import { selectedCategoryIdSelector } from '../../redux/category/selector'
import {
  isPlanDateExpiredSelector,
  willExpireSoonSelector,
} from '../../redux/plan/selector'

const mapStateToProps = state => ({
  isPlanExpired: isPlanDateExpiredSelector(state),
  willExpireSoon: willExpireSoonSelector(state),
  isLogged: isLoggedSelector(state),
  productSearchName: productSearchNameSelector(state),
  categoryId: selectedCategoryIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
  clearProducts: () => dispatch(clearProducts()),
  productRequest: (name: string, categoryId: number | null) =>
    dispatch(productPaginationRequest({ name, categoryId })),
  clearCategoryId: () => dispatch(clearCategoryId()),
  getAllCategories: () => dispatch(getAllCategoriesRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
