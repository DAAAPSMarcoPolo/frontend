import React, { Component } from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import Nav from './pages/components/Nav';
import User from './pages/components/User';
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

class ProtectedRoute extends Component {
  // = ({component: Component, cookies, ...props}) =>
  constructor(props) {
      super(props);
      this.state = {
        profilePic: null
      };
  }
  // ComponentDidMount() {
  //     // pull list of algorithms
  // }
  render() {
    const cookies = this.props;
    const props = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    const isAdmin = cookies.get('isAdmin');
    return (
        <Route
            {...props}
            render={props => {
                if (isAuthenticated === "true") {
                  return (
                    <div className="navwrap">
                      <Nav isAuthenticated={isAuthenticated} isAdmin={isAdmin}/>
                      <User isAuthenticated={isAuthenticated}/>
                      <div className="wrapright mx-auto mt-3 page">
                        <Component {...props} />
                      </div>
                    </div>
                  );
                } else {
                  return ( <Redirect to='/login'/> );
                }
            }}
        />
    );
  }
}

export default withCookies(ProtectedRoute);
