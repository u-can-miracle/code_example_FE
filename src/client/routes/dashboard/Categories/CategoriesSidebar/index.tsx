import { connect } from 'react-redux'

import { IState } from '../../../../redux/rootReducer'
import {
  selectedCategoryIdSelector,
  categoriesTreeSelector,
} from '../../../../redux/category/selector'
import { setSelectedCategoryId } from '../../../../redux/category/actions'
import {
  productPaginationRequest,
} from '../../../../redux/product/actions'
import {
  productSearchNameSelector,
} from '../../../../redux/product/selector'
import { IProductPagination } from '../../../../interfaces/category'
import CategoriesSidebar from './CategoriesSidebar'

const mapStateToProps = (state: IState) => ({
  categoriesTree: categoriesTreeSelector(state),
  productSearchName: productSearchNameSelector(state),
  selectedCategoryId: selectedCategoryIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
  prodsRequest: (params: IProductPagination) => dispatch(productPaginationRequest(params)),
  setSelectedCategoryId: (categId: number) => dispatch(setSelectedCategoryId(categId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSidebar)
