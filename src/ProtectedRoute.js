import React, {Component} from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

class ProtectedRoute extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    render() {
        const {component: Component, cookies, ...props} = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        console.log(isAuthenticated);
        return (
            <Route
                {...props}
                render={props => (
                    (!isAuthenticated) ?
                        <Redirect to='/login'/> :
                        <Component {...props} />
                )}
            />
        )
    }
}

export default withCookies(ProtectedRoute);
