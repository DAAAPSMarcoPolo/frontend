import React, { Component } from 'react';
import LoginForm from './LoginForm';
import FactorForm from './FactorForm';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api';
import { saveToLocalStorage, deleteFromLocalStorage } from '../../utils/localstorage';
import '../../assets/login.css';
import logo from '../../assets/images/logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null,
      codeSent: false,
      username: null,
      password: null,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({error: null});
    console.log(`username: ${e.target.username.value}`)
    console.log(`password: ${e.target.password.value}`)
    this.setState({password: e.target.password.value});
    const formData = {
      body: JSON.stringify({
        "username": e.target.username.value,
        "password": e.target.password.value
      }),
      method: 'POST'
    }
    await apiFetch('/auth/login/', formData)
      .then(res => {
        return res.json().then(data => {
          // handle 2-factor
          if (res.status === 200 && data.message === 'code sent') {
            this.setState({codeSent: true, username: data.user.username});
            console.log(data)
          }
          if (res.status === 200 && data.token) {
            saveToLocalStorage({token: data.token});
            console.log(data);
            // TODO first login stuff if needed
          } else if (res.status === 401) {
            deleteFromLocalStorage('token');
          }
        })
    });
  };

  handleFactorSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({error: null});
    const formData = {
      body: JSON.stringify({
        "code": e.target.code.value,
        "username": this.state.username,
        "password": this.state.password
      }),
      method: 'POST'
    }
    await apiFetch('/auth/loginfactor/', formData)
      .then(res => {
        return res.json().then(data => {
          if (res.status === 200 && data.token) {
            saveToLocalStorage({token: data.token});
            // logged in
            this.setState({redirectToReferrer: true})
          } else if (res.status === 401) {
            deleteFromLocalStorage('token');
          }
        })
    });
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
              {!this.state.codeSent && <LoginForm login={this.handleSubmit} error={this.state.error} />}
              {this.state.codeSent && <FactorForm login={this.handleFactorSubmit} error={this.state.error} />}
            </div>
        </div>
        <div className="right">
          <img className="logo" src={logo} alt="logo"/>
        </div>
      </div>
    );
  }
}
export default Login;
