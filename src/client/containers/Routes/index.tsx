import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../../routes/Home'
import Dashboard from './Dashboard'
import NotFound from '../../routes/NotFound'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
