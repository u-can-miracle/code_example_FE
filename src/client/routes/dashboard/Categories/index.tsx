import { connect } from 'react-redux'
import Categories from './Categories'
import {
  categoriesSelector,
  categorySearchNameSelector,
} from '../../../redux/category/selector'
import {
  removeCategoryRequest,
  setCategorySearchName,
  searchCategoryRequest,
} from '../../../redux/category/actions'

const mapStateToProps = state => ({
  categories: categoriesSelector(state),
  categorySearchName: categorySearchNameSelector(state),
})

const mapDispatchToProps = dispatch => ({
  onRemove: (id: number) => dispatch(removeCategoryRequest(id)),
  setCategorySearchName: (name: string) => dispatch(setCategorySearchName(name)),
  searchCategoryRequest: (name: string) => dispatch(searchCategoryRequest(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
