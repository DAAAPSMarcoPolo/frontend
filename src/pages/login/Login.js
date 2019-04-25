import React, { Component } from 'react';
import LoginForm from './LoginForm';
import FactorForm from './FactorForm';
import FirstLoginForm from './FirstLoginForm';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import api from '../../utils/api';
import {
    saveToLocalStorage,
    deleteFromLocalStorage
} from '../../utils/localstorage';
import { getAttributesFromEvent } from '../../utils/forms';
import '../../assets/login.css';
import logo from '../../assets/images/logo.png';

class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            error: null,
            codeSent: false,
            username: null,
            password: null,
            firstLogin: null
        };
    }

    handleSubmit = async e => {
        e.preventDefault();
        e.persist();
        this.setState({ error: null });
        this.setState({ password: e.target.password.value });
        this.setState({ username: e.target.username.value });
        const formData = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        const res = await api.Post('/auth/login/', formData, false);
        const { data } = res;
        switch (res.status) {
            case 200:
                if (data.message === 'code sent') {
                    this.setState({ codeSent: true });
                    return;
                } else if (data.message === 'first login') {
                    if (!data.token) {
                        console.log('A token should have been sent');
                    }
                    saveToLocalStorage({ token: data.token });
                    this.setState({ firstLogin: true });
                } else {
                    // error unknown response
                }
                break;
            case 400:
                if (
                    data.non_field_errors[0] ===
                    'Unable to log in with provided credentials.'
                ) {
                    this.setState({ error: 'Invalid credentials.' });
                    setTimeout(() => {
                        this.setState({ error: null });
                    }, 5000);
                    console.log('Invalid credents.');
                    return;
                }
                break;
            // invalid token
            case 401:
                deleteFromLocalStorage('token');
                break;
            // TODO invalid user/pass
            case 404:
                break;
            // TODO server error
            case 500:
                console.log('server error');
                this.setState({ error: 'Server Error.' });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 5000);
            // fallthrough
            default:
                console.log(`Responded with status ${res.status}`);
        }
    };

    handleFactorSubmit = async e => {
        e.preventDefault();
        e.persist();
        this.setState({ error: null });
        const formData = {
            code: e.target.code.value,
            username: this.state.username,
            password: this.state.password
        };
        const response = await api.Post('/auth/loginfactor/', formData, false);
        const { data } = response;
        switch (response.status) {
            case 200:
                if (data.token) {
                    saveToLocalStorage({ token: data.token });
                    saveToLocalStorage({ user: data.user });
                    this.setState({ redirectToReferrer: true });
                    const { cookies } = this.props;
                    cookies.set('isAuthenticated', true, { path: '/' });
                    cookies.set('isAdmin', data.isAdmin, { path: '/' });
                    cookies.set('jwt', data.token, { path: '/' });
                }
                break;
            case 400:
                if (data.error === 'incorrect code') {
                    this.setState({ error: 'Incorrect code.' });
                    setTimeout(() => {
                        this.setState({ error: null });
                    }, 5000);
                    return;
                }
                break;
            case 401:
                deleteFromLocalStorage('token');
                const { cookies } = this.props;
                cookies.remove('isAuthenticated');
                break;
            case 404:
                this.setState({ error: 'Invalid credentials.' });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 5000);
                break;
            default:
                console.log('unknown response');
        }
    };

    handleFirstLogin = async e => {
        e.preventDefault();
        e.persist();
        this.setState({ error: null });
        const attributes = [
            'first_name',
            'last_name',
            'phone_number',
            'new_password'
        ];
        const formData = getAttributesFromEvent(attributes, e);
        formData.username = this.state.username;
        formData.password = this.state.password;

        const res = await api.Post('/auth/firstlogin/', formData, true);
        const { data } = res;

        // TODO handle response
        switch (res.status) {
            case 200:
                if (data.message === 'profile updated.') {
                    this.setState({ redirectToReferrer: true });
                } else {
                    console.log(data);
                    console.log(`HTTP Status (for error): ${res.status}`);
                    console.log(
                        `HTTP Status Text (for error): ${res.statusText}`
                    );
                    this.setState({ error: res.data.message });
                    setTimeout(() => {
                        this.setState({ error: null });
                    }, 5000);
                }
                break;
            // TODO handle case when information is missing
            default:
                // this.setState({ error: 'Something went wrong updating your profile. Check log for more info.'});
                console.log(`HTTP Status (for error): ${res.status}`);
                console.log(`HTTP Status Text (for error): ${res.statusText}`);
                this.setState({ error: res.message });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 5000);
        }
    };

    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        if (
            this.state.redirectToReferrer === true ||
            isAuthenticated === 'true'
        ) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div className="login">
                <div className="side">
                    <div className="grow">
                        <h1 className="logotype">MarcoPolo</h1>
                        {/* login form disappears when codeSent is true */}
                        {/* 2-factor form appears when codeSent is true */}
                        {!this.state.firstLogin && !this.state.codeSent && (
                            <LoginForm
                                login={this.handleSubmit}
                                error={this.state.error}
                            />
                        )}
                        {!this.state.firstLogin && this.state.codeSent && (
                            <FactorForm
                                login={this.handleFactorSubmit}
                                error={this.state.error}
                            />
                        )}
                        {this.state.firstLogin && (
                            <FirstLoginForm
                                updateProfile={this.handleFirstLogin}
                                error={this.state.error}
                            />
                        )}
                    </div>
                </div>
                <div className="right">
                    <img className="logo" src={logo} alt="logo" />
                </div>
            </div>
        );
    }
}

export default withCookies(Login);
