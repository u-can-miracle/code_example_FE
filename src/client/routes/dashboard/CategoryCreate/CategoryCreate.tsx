import * as React from 'react'

import { DEFAULT_PRIORITY } from '../../../constants/category'
import CategoryForm from '../../../components/CategoryForm'
import getTranslationById from '../../../services/getTranslationById'

const CategoryCreate = ({
  toParentCategories,
  createCategory,
}) => {
  return (
    <CategoryForm
      name=""
      priority={DEFAULT_PRIORITY}
      parentCategoryId={null}
      toParentCategories={toParentCategories}
      submitHandler={createCategory}
      submitBtnText={getTranslationById('categoryCreateBtn')}
      formTitle={getTranslationById('categoryCreatTitle')}
    />
  )
}

export default CategoryCreate
