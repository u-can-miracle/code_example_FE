import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Input } from 'antd'

import ListingItem from '../../../components/ListingItem'
import { ICategory } from '../../../interfaces/category'

import getTranslationById from '../../../services/getTranslationById'

interface IProps {
  categories: ICategory[]
  categorySearchName: string
  onRemove: (id: number) => void
  setCategorySearchName: (name: string) => void
  searchCategoryRequest: (name: string) => void
}
function Categories(props: IProps) {
  const {
    categories,
    categorySearchName,
    onRemove,
    setCategorySearchName,
    searchCategoryRequest,
  } = props

  return (
    <div>
      <div className="listing-title">
        <FormattedMessage id="categories" />
        <Link
          className="theme-btn"
          to="/dashboard/category"
        >
          <FormattedMessage id="categoryCreatTitle" />
        </Link>
      </div>

      <Input.Search
        className="search-box"
        value={categorySearchName}
        placeholder={getTranslationById('categorySearch')}
        onChange={ev => setCategorySearchName(ev.target.value)}
        onSearch={value => searchCategoryRequest(value)}
        enterButton
      />

      {!!categories.length && categories.map(
        ({ id, name }) => (
          <ListingItem
            key={id}
            name={name}
            entityToCRUD="category"
            toEditLink={`/dashboard/category/${id}`}
            onRemove={() => onRemove(id)}
          />
        )
      )}
      {!categories.length && <div><FormattedMessage id="categoriesEmpty" /></div>}
    </div>
  )
}
export default Categories
