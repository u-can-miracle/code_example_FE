import * as React from 'react'

import CategoryForm from '../../../components/CategoryForm'
import getTranslationById from '../../../services/getTranslationById'

const CategoryEdit = ({
  editCategory,
  name,
  priority,
  parentCategoryId,
  toParentCategories,
}) => {
  return (
    <CategoryForm
      name={name}
      priority={priority}
      parentCategoryId={parentCategoryId}
      toParentCategories={toParentCategories}
      submitHandler={editCategory}
      submitBtnText={getTranslationById('categoryUpdateBtn')}
      formTitle={getTranslationById('categoryUpdateTitle')}
    />
  )
}

export default CategoryEdit
