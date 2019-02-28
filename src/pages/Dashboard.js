import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {withCookies} from 'react-cookie';

class Dashboard extends Component {
    render() {
        const {cookies} = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        if (isAuthenticated === "false" || !isAuthenticated) {
            return (<Redirect to="/login"/>);
        }
        return (
            <div className="page">
                <p>Dashboard</p>
            </div>
        )
    }
}

export default withCookies(Dashboard);
