import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Route, Redirect } from 'react-router-dom'

import DashboardHome from '../../../routes/dashboard/Home'
// Login and etc
import Login from '../../../routes/dashboard/Login'
import Registration from '../../../routes/dashboard/Registration'
import RegistrationSuccess from '../../../routes/dashboard/Registration/RegistrationSuccess'
import ResetPassword from '../../../routes/dashboard/ResetPassword'
import Confirm from '../../../routes/dashboard/Confirm'
import PasswordChanged from '../../../routes/dashboard/PasswordChanged'

import CategoriesSidebar from '../../../routes/dashboard/Categories/CategoriesSidebar'

import Notice from '../../../components/Notice'
import Header from '../../../components/Header'

import RestrictedRoutes from './RestrictedRoutes'

import {
  NOT_AUTH_PAGE_REDIRECT,
  PRODUCT_URL,
} from '../../../constants'

const Dashboard = ({ isLogged, isUrlAllowed }) => (
  <div
    className="dashboard"
  >
    <div className="dashboard--header">
      <div className="dashboard--header-brand">
        <FormattedMessage tagName="h3" id="brand"/>
      </div>
      <div className="dashboard--header-content">
        <Header />
      </div>
    </div>
    <div className="dashboard--container">
      <div className="dashboard--container-panel">
        <Route
          path={PRODUCT_URL}
          component={CategoriesSidebar}
        />
      </div>
      <div className="dashboard--container-content">
        <Route path="/dashboard" exact component={DashboardHome} />
        <Route path="/dashboard/login" component={Login} />
        <Route
          exact
          path={['/dashboard/registration', '/dashboard/registration/:hash']}
          component={Registration}
        />
        <Route path="/dashboard/registration/success" component={RegistrationSuccess} />
        <Route path="/dashboard/confirm/:hash" component={Confirm} />
        <Route path="/dashboard/reset-password" component={ResetPassword} />
        <Route path="/dashboard/set-password/:pwd" component={PasswordChanged} />

        {isLogged && <RestrictedRoutes />}
        {!isLogged && !isUrlAllowed && <Redirect to={NOT_AUTH_PAGE_REDIRECT}/>}
        <Notice />
      </div>
    </div>
  </div>
)

export default Dashboard
