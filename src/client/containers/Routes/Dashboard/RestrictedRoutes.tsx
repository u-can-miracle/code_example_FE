import * as React from 'react'
import { Route } from 'react-router-dom'

import Categories from '../../../routes/dashboard/Categories'
import CategoryEdit from '../../../routes/dashboard/CategoryEdit'
import CategoryCreate from '../../../routes/dashboard/CategoryCreate'

import Products from '../../../routes/dashboard/Products'
import ProductCreate from '../../../routes/dashboard/ProductCreate'
import ProductEdit from '../../../routes/dashboard/ProductEdit'

import Profile from '../../../routes/dashboard/Profile'
import Plans from '../../../routes/dashboard/Plans'

import { CATEGORY_PAGE_URL, PRODUCT_URL } from '../../../constants'

const RestrictedRoutes = () => (
  <>
    <Route path={CATEGORY_PAGE_URL} exact component={Categories} />
    <Route path="/dashboard/category" exact component={CategoryCreate} />
    <Route path="/dashboard/category/:id" component={CategoryEdit} />

    <Route path={PRODUCT_URL} component={Products} />
    <Route path="/dashboard/product" exact component={ProductCreate} />
    <Route path="/dashboard/product/:id" exact component={ProductEdit} />

    <Route path="/dashboard/profile" exact component={Profile} />
    <Route path="/dashboard/plans" exact component={Plans} />
  </>
)

export default RestrictedRoutes
