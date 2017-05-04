import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/index';
import EmployeeListContainer from './containers/employees/EmployeeListContainer';
import Alert from './shared/components/Alert/index';
import ProgressBar from './shared/components/ProgressBar/index';
import Authentication from './containers/Authentication/index';
import Login from './containers/Login/index';
import SignUp from './containers/SignUp/index';

export default (
  <Route path="/" component={App}>
      <IndexRoute component={ProgressBar(EmployeeListContainer)} />
      <Route path="/personnel" component={ProgressBar(Alert(Authentication(EmployeeListContainer)))} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />


  </ Route>
);
