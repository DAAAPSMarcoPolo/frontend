import React, { Component } from 'react';
import LoginForm from './LoginForm';
import FactorForm from './FactorForm';
import FirstLoginForm from './FirstLoginForm';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { apiPost } from '../../utils/api';
import { saveToLocalStorage, deleteFromLocalStorage } from '../../utils/localstorage';
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

  handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({error: null});
    this.setState({password: e.target.password.value});
    this.setState({username: e.target.username.value});
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    const res = await apiPost('/auth/login/', formData, false);
    console.log(res);
    const {data} = res;
    console.log(data);
    switch(res.status) {
      case 200:
        if (data.message === 'code sent') {
          this.setState({codeSent: true});
          return;
        } else if (data.message === 'first login') {
          if (!data.token) {
            console.log('A token should have been sent')
          }
          saveToLocalStorage({token: data.token});
          this.setState({firstLogin: true});
        } else {
          // error unknown response
        }
        break;
      case 400:
        if (data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
          this.setState({ error: 'Invalid credentials.' });
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
        // fallthrough
      default:
        console.log(`Responded with status ${res.status}`);

    }
    /*await apiFetch('/auth/login/', formData)
      .then(res => {
        return res.json().then(data => {
          // handle 2-factor
          if (res.status === 200 && data.message === 'code sent') {
            this.setState({codeSent: true, username: e.target.username.value});
            console.log(data)
          }
          if (res.status === 200 && data.token) {
            saveToLocalStorage({token: data.token});
            const { cookies } = this.props;
            cookies.set('jwt', data.token);
            console.log(data);
            // TODO first login stuff if needed
          } else if (res.status === 401) {
            deleteFromLocalStorage('token');
            const { cookies } = this.props;
            cookies.set('jwt', '');
          }
        })
    });*/
  };

  handleFactorSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({error: null});
    const formData = {
      code: e.target.code.value,
      username: this.state.username,
      password: this.state.password
    }
    const response = await apiPost('/auth/loginfactor/', formData, false);
    const {data} = response;
    switch (response.status) {
      case 200:
        if (data.token) {
          saveToLocalStorage({token: data.token});
          this.setState({redirectToReferrer: true})
          const { cookies } = this.props;
          cookies.set('isAuthenticated', true);
          cookies.set('isAdmin', data.isAdmin);
          cookies.set('login', true);
          cookies.set('jwt', data.token);
          cookies.set('token', '');
        }
        break;
      case 400:
        if (data.error === 'incorrect code') {
          this.setState({ error: 'Incorrect code.' });
          return;
        }
        break;
      case 401:
        deleteFromLocalStorage('token');
        const { cookies } = this.props;
        cookies.set('isAuthenticated', false, { path: '/' });
        break;
      case 404:
        this.setState({ error: 'Invalid credentials.' })
        break;
      default:
        console.log('unknown response')
    }
  }

  handleFirstLogin = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({error: null});
    const attributes = ['first_name', 'last_name', 'phone_number', 'new_password']
    const formData = getAttributesFromEvent(attributes, e);
    formData.username = this.state.username;
    formData.password = this.state.password;

    const res = await apiPost('/auth/firstlogin/', formData, true);
    const {data} = res;

    // TODO handle response
    switch(res.status) {
      case 200:
        if (data.message === 'profile updated.') {
          this.setState({redirectToReferrer: true})
        } else {
          console.log(data)
          //this.setState({error: 'Something went wrong updating your profile. Check log for more info.'});
          console.log(`HTTP Status (for error): ${res.status}`)
          console.log(`HTTP Status Text (for error): ${res.statusText}`)
        }
        break;
      // TODO handle case when information is missing
      default:
        // this.setState({ error: 'Something went wrong updating your profile. Check log for more info.'});
        console.log(`HTTP Status (for error): ${res.status}`);
        console.log(`HTTP Status Text (for error): ${res.statusText}`);
    }

  }
  render() {
    if (this.state.redirectToReferrer === true) {
      return (<Redirect to="/dashboard"/>);
    }
    return (
      <div className="login">
        <div className="side">
            <div className="grow">
              <h1 className="logotype">
                MarcoPolo
              </h1>
              {/* login form disappears when codeSent is true */}
              {/* 2-factor form appears when codeSent is true */}
              {!this.state.firstLogin && !this.state.codeSent && <LoginForm login={this.handleSubmit} error={this.state.error} />}
              {!this.state.firstLogin && this.state.codeSent && <FactorForm login={this.handleFactorSubmit} error={this.state.error} />}
              {this.state.firstLogin && <FirstLoginForm updateProfile={this.handleFirstLogin} error={this.state.error} />}
            </div>
        </div>
        <div className="right">
          <img className="logo" src={logo} alt="logo"/>
        </div>
      </div>
    );
  }
}
export default withCookies(Login);
