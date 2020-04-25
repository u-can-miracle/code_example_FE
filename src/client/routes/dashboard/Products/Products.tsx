import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Pagination, Input, Tag } from 'antd'

import ListingItem from '../../../components/ListingItem'
import { IProduct } from '../../../interfaces/product'
import { IProductPagination } from '../../../interfaces/category'
import getTranslationById from '../../../services/getTranslationById'

interface IProps {
  isProductPage: boolean
  productSearchName: string
  isCategoryPage: boolean
  selectedCategoryId: number
  selectedCategoryName: string
  products: IProduct[]
  currentPageNumber: number
  paginationLimit: number
  allProductsCount: number
  clearForm: () => void
  setEditedProduct: (id: number) => void
  prodsRequest: (params: IProductPagination) => void
  onRemove: (id: number) => void
  setProductName: (name: string) => void
  setSelectedCategoryId: (category) => void
}

function Products(props: IProps) {
  const {
    isProductPage,
    productSearchName,
    isCategoryPage,
    selectedCategoryId,
    selectedCategoryName,
    products,
    currentPageNumber,
    paginationLimit,
    allProductsCount,
    clearForm,
    setEditedProduct,
    prodsRequest,
    onRemove,
    setProductName,
    setSelectedCategoryId,
  } = props

  function sendPaginationRequest(
      page = 1,
      name = productSearchName,
      withCategory = true,
  ) {
    const categoryIdVal = (selectedCategoryId && withCategory) ? selectedCategoryId : null
    const categoryParams = { categoryId: categoryIdVal }

    prodsRequest({
      ...categoryParams,
      name,
      limit: paginationLimit,
      offset: paginationLimit * (page - 1),
    })
  }

  function onProductNameTagRemove() {
    setProductName('')
    sendPaginationRequest(1, '')
  }

  function onCategoryTagRemove() {
    setSelectedCategoryId(null)
    sendPaginationRequest(undefined, undefined, false)
  }

  return (
    <div>
      <div className="listing-title">
        <FormattedMessage id="products" />
        <Link
          onClick={clearForm}
          className="theme-btn"
          to="/dashboard/product"
        >
          <FormattedMessage id="productCreateTitle" />
        </Link>
      </div>

      {isCategoryPage && !selectedCategoryId && <FormattedMessage id="selectCategory" />}
      {isCategoryPage && selectedCategoryId && !products.length && <>
          <FormattedMessage id="productsEmptyForCategoryStart" />
          {`"${selectedCategoryName}"`}
          <FormattedMessage id="productsEmptyForCategoryEnd" />
        </>
      }

      <div>
        <Input.Search
          className="search-box"
          value={productSearchName}
          placeholder={getTranslationById('productSearch')}
          onChange={ev => setProductName(ev.target.value)}
          onSearch={() => sendPaginationRequest()}
          enterButton
        />

        {productSearchName && (
          <div className="products-page--search-result-block">
            <div className="products-page--search-result-title">
              {getTranslationById('productsSearchTitleProduct')}:
            </div>

            <div className="products-page--search-result-value">
              <Tag closable onClose={() => onProductNameTagRemove()}>
                {productSearchName}
              </Tag>
            </div>
          </div>
        )}

        {isProductPage && selectedCategoryName && (
          <div className="products-page--search-result-block">
            <div className="products-page--search-result-title">
              {getTranslationById('productsSearchTitleCategory')}:
            </div>

            <div className="products-page--search-result-value">
              <Tag closable onClose={() => onCategoryTagRemove()}>
                {selectedCategoryName}
              </Tag>
            </div>
          </div>
        )}
      </div>

      {!!products.length &&
        <>
          <div className="products-page--product-wrapper">
            {products.map(
              ({ id, name }) => (
                <ListingItem
                key={id}
                name={name}
                entityToCRUD="product"
                toEditLink={`/dashboard/product/${id}`}
                onBeforeNavigate={() => setEditedProduct(id)}
                onRemove={() => onRemove(id)}
                />
              )
            )}
          </div>
          <Pagination
            className="products-page--product-pagination"
            simple
            current={currentPageNumber}
            defaultCurrent={1}
            total={allProductsCount}
            pageSize={paginationLimit}
            onChange={page => sendPaginationRequest(page)}
          />
        </>
      }
      {isProductPage && !products.length && (
        <div>
          <FormattedMessage id="productsEmpty" />
        </div>
      )}
    </div>
  )
}

export default Products
