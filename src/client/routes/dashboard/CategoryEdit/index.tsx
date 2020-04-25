import { connect } from 'react-redux'

import { ICategoryBase } from '../../../interfaces/category'
import { IState } from '../../../redux/rootReducer'
import CategoryEdit from './CategoryEdit'
import {
  singleCategoryNameSelector,
  singleCategoryPrioritySelector,
  singleCategoryParentCategoryIdSelector,
  withoutCurrentCategoriesSelector,
} from '../../../redux/category/selector'
import { editCategoryRequest } from '../../../redux/category/actions'

const mapStateToProps = (state: IState, props) => ({
  name: singleCategoryNameSelector(state, props),
  priority: singleCategoryPrioritySelector(state, props),
  parentCategoryId: singleCategoryParentCategoryIdSelector(state, props),
  toParentCategories: withoutCurrentCategoriesSelector(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  editCategory: (categToEdit: ICategoryBase) =>	dispatch(
    editCategoryRequest(categToEdit, Number(props.match.params.id))
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit)
