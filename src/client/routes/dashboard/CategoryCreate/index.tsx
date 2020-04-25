import { connect } from 'react-redux'

import { IState } from '../../../redux/rootReducer'
import { ICategoryBase } from '../../../interfaces/category'
import CategoryCreate from './CategoryCreate'
import { parentCategoriesListSelector } from '../../../redux/category/selector'
import { createCategoryRequest } from '../../../redux/category/actions'

const mapStateToProps = (state: IState, props) => ({
  toParentCategories: parentCategoriesListSelector(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  createCategory: (params: ICategoryBase) => dispatch(createCategoryRequest(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreate)
