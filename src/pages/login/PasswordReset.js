import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import logo from '../../assets/images/logo.png';
import RequestResetForm from './RequestResetForm';
import ResetForm from './ResetForm';

class PasswordReset extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const request = this.props.match.params.token ? true : false;
        this.state = {
            error: null,
            responseMessage: null,
            requestedReset: request,
            redirectToLogin: null
        };
    }

    sendReset = async e => {
        e.preventDefault();
        e.persist();

        const formData = {
            username: e.target.username.value
        };

        if (!formData.username) {
            this.setState({ error: 'Must enter username.' });
            setInterval(() => {
                this.setState({
                    error: null
                });
            }, 5000);
            return;
        }

        const res = await api.Post('/reset', formData, false);
        if (res.status !== 200) {
            this.setState({ error: res.data.error });
            setInterval(() => {
                this.setState({
                    error: null
                });
            }, 5000);
            return;
        }
        this.setState({
            responseMessage: res.data.message
        });
    };

    setPassword = async e => {
        e.preventDefault();
        e.persist();

        const formData = {
            username: e.target.username.value,
            new_password: e.target.new_password.value
        };

        if (!formData.username || !formData.new_password) {
            this.setState({ error: 'Must enter all info.' });
            setInterval(() => {
                this.setState({
                    error: null
                });
            }, 5000);
            return;
        }
        const reset_token = this.props.match.params.token;

        const res = await api.Put(`/reset/${reset_token}`, formData, false);
        if (res.status !== 200) {
            this.setState({ error: res.data.error });
            setInterval(() => {
                this.setState({
                    error: null
                });
            }, 5000);
            return;
        }

        this.setState({
            responseMessage: res.data.message,
            requestedReset: true
        });
        setInterval(() => {
            this.setState({
                redirectToLogin: true
            });
        }, 3000);
    };

    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        if (isAuthenticated === 'true') {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div>
                {!this.state.requestedReset && (
                    <RequestResetForm
                        reset={this.sendReset}
                        error={this.state.error}
                        response={this.state.responseMessage}
                    />
                )}
                {this.state.requestedReset &&
                    this.props.match.params.token &&
                    !this.state.redirectToLogin && (
                        <ResetForm
                            reset={this.setPassword}
                            error={this.state.error}
                            response={this.state.responseMessage}
                        />
                    )}
                {this.state.redirectToLogin && <Redirect to="/login" />}
            </div>
        );
    }
}

export default withCookies(PasswordReset);
