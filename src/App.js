import React, {Component} from 'react';
import {withCookies} from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import './App.css';

class App extends Component {
    render() {
        const {cookies} = this.props;
        const isAuthenticated = cookies.get("isAuthenticated");
        const isAdmin = cookies.get("isAdmin");
        return (
            <BrowserRouter>
              <Routes/>
            </BrowserRouter>
        );
    }
};

export default withCookies(App);
