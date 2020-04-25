import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { History, LocationState } from 'history'

import Tree from '../../../../components/Tree'
import { IProductPagination, ITreeCategory } from '../../../../interfaces/category'
import { PRODUCT_URL } from '../../../../constants'

interface IProps {
  productSearchName: string
  selectedCategoryId: number
  categoriesTree: ITreeCategory[]
  prodsRequest: (params: IProductPagination) => void
  setSelectedCategoryId: (categoryId: number) => void
  history: History<LocationState>
}

const CategoriesSidebar = (props: IProps) => {
  const {
    productSearchName,
    selectedCategoryId,
    categoriesTree,
    setSelectedCategoryId,
    prodsRequest,
  } = props

  function queryProducts(...rest) {
    const [, event] = rest
    const { node: { props: { eventKey: categoryId } } } = event
    const numSelectedCategoryId = Number(categoryId)

    if (selectedCategoryId !== numSelectedCategoryId) {
      props.history.push(PRODUCT_URL)
      setSelectedCategoryId(numSelectedCategoryId)
      prodsRequest({ categoryId, name: productSearchName })
    }
  }

  return (
    <div
      className="categories-sidebar--content-wrapper"
    >
      <Link
        className="categories-sidebar--create-category theme-btn"
        to="/dashboard/category"
      >
        <FormattedMessage id="categoryCreatTitle" />
      </Link>
      <Tree
        selectedKeys={[String(selectedCategoryId)]}
        className="categories-sidebar--categories-tree"
        treeData={categoriesTree}
        onSelect={queryProducts}
      />
    </div>
  )
}

export default CategoriesSidebar
