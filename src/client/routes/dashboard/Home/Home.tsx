import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const DashboardHome = ({ isLogged }) => (
  <div>
    {
      !isLogged && <Redirect to="/dashboard/login"/>
    }
    {
      isLogged && <div>
        You are logged
      </div>
    }
  </div>
)

export default DashboardHome
