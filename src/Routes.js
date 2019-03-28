import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login/Login';
import RequestPasswordReset from './pages/login/RequestPasswordReset';
import PasswordReset from './pages/login/PasswordReset';
import Settings from './pages/admin/Settings';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Upload from './pages/upload/Upload';
import AlgorithmDetail from './pages/algorithm/AlgorithmDetail';
import AlgorithmList from './pages/algorithm/AlgorithmList';
import Universe from "./pages/universe/Universe";
import TransTest from "./pages/algorithm/TransTest";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route
            path="/request-password-reset"
            component={RequestPasswordReset}
        />
        <Route path="/password-reset" component={PasswordReset} />
        <ProtectedRoute path="/profile" component={Settings} />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/upload" component={Upload} />
        <ProtectedRoute
            path={`/algorithms/:algoID`}
            component={AlgorithmDetail}
        />
        <ProtectedRoute path="/algorithms" component={AlgorithmList} />
        <ProtectedRoute path="/universes" component={Universe} />
        <ProtectedRoute path="/trans" component={TransTest} />
        />
    </Switch>
);

export default Routes;
