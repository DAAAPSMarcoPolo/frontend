import React from 'react';
import { Switch, Route } from 'react-router';
import { withCookies } from 'react-cookie';
import Login from './pages/login/Login';
import RequestPasswordReset from './pages/login/RequestPasswordReset';
import PasswordReset from './pages/login/PasswordReset';
import Settings from './pages/profile/Settings';
import Dashboard from './pages/Dashboard';
import Admin from './pages/admin/Admin';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/request-password-reset" component={RequestPasswordReset}/>
    <Route path="/password-reset" component={PasswordReset}/>

    <ProtectedRoute path="/profile" component={Settings}/>
    <ProtectedRoute path="/settings" component={Settings}/>
    <ProtectedRoute path="/dashboard" component={Dashboard}/>
    <ProtectedRoute path="/admin" component={Admin}/>
    />
  </Switch>
);

export default withCookies(Routes);
