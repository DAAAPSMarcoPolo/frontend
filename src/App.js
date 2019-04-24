import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';
import { withCookies } from 'react-cookie';
import api from './utils/api';

class App extends Component {
    constructor(props) {
        super(props);
        this.checkAuth = this.checkAuth.bind(this);
    }

    async checkAuth() {
        const res = await api.Get('/');
        if (res.status === 401) {
            const { cookies } = this.props;
            cookies.remove('isAuthenticated');
        }
    }

    componentDidMount() {
        this.checkAuth();
    }

    render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        );
    }
}

export default withCookies(App);
