import * as React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { Icon } from 'antd'

import getTranslationById from '../../services/getTranslationById'

interface IProps {
  productSearchName: string
  categoryId: number | null
  isLogged: boolean
  isPlanExpired: boolean
  willExpireSoon: boolean
  logout: () => void
  productRequest: (prodName: string, categId: number | null) => void
  clearProducts: () => void
  clearCategoryId: () => void
  getAllCategories: () => void
}

const Header = (props: IProps) => {
  const {
    productSearchName,
    categoryId,
    isLogged,
    isPlanExpired,
    willExpireSoon,
    logout,
    productRequest,
    clearProducts,
    clearCategoryId,
    getAllCategories,
  } = props
  const wrapperClass = classnames('header--content-wrapper' , {
    'header--logged': isLogged,
  })

  function onCategoriesClick() {
    clearProducts()
  }

  function onProductsClick() {
    getAllCategories()
    clearCategoryId()
    productRequest(productSearchName, categoryId)
  }

  const profileTitle = isPlanExpired ? getTranslationById('planExpired') : undefined

  return (
    <div
      className={wrapperClass}
    >
      {
        isLogged
        ?
        <>
          <ul className="header--page-navigations">
            <li
              className="header--navigation-item"
            >
              <Link
                className="header--navigation-link"
                to="/dashboard/categories"
                onClick={onCategoriesClick}
              >
                {getTranslationById('categories')}
              </Link>
            </li>
            <li
              className="header--navigation-item"
            >
              <Link
                className="header--navigation-link"
                to="/dashboard/products"
                onClick={onProductsClick}
              >
                {getTranslationById('products')}
              </Link>
            </li>
          </ul>

          <nav className="header--logged-nav">
            <div
              className="header--nav-link-wrapper"
            >
              <Link
                className="header--nav-link overlay-link"
                to="/dashboard/profile"
                title={profileTitle}
              >
                {(isPlanExpired || willExpireSoon) && (
                  <span
                    className={classnames(
                      'header--attantion-icon',
                      {
                        'icon-warning': isPlanExpired,
                        'icon-info': willExpireSoon,
                      }
                    )}
                  >i</span>
                )}
                <Icon type="user" />
                <span className="header--nav-title">
                  {getTranslationById('profileNav')}
                </span>
              </Link>
            </div>
            <div
              className="header--nav-link-wrapper"
            >
              <Link
                className="header--nav-link overlay-link"
                to="/dashboard/plans"
              >
                <Icon type="dollar" />
                <span className="header--nav-title">
                  {getTranslationById('plans')}
                </span>
              </Link>
            </div>
            <a
              onClick={e => {
                e.preventDefault()
                logout()
              }}
              className="header--nav-link-exit link-white"
            >
              {getTranslationById('logout')}
            </a>
          </nav>
        </>
        :
        <div>
          <Link
            className="header--btn"
            to="/dashboard/login"
          >
            {getTranslationById('regToLogin')}
          </Link>
          <span className="vertical-dash">|</span>
          <Link
            className="header--btn"
            to="/dashboard/registration"
          >
            {getTranslationById('loginRegister')}
          </Link>
        </div>
      }
    </div>
  )
}

export default Header
