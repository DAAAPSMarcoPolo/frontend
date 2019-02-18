import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api';
import '../../assets/login.css';
import logo from '../../assets/images/logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({redirectToReferrer: true, error: null});
    console.log(`username: ${e.target.username.value}`)
    console.log(`password: ${e.target.password.value}`)
    const formData = {
      body: JSON.stringify({
        "username": e.target.username.value,
        "password": e.target.password.value
      }),
      method: 'POST'
    }
    const data = await apiFetch('/auth/login/', formData)
      .then(res => {
        return res.json().then(data => {
          return { data }
        })
    });
    console.log(data);
  };

  render() {
    if (this.state.redirectToReferrer === true) {
      return (<Redirect to="/dashboard"/>);
    }
    return (
      <div className="login">
        <div className="side">
            <div className="grow">
              <div className="logotype">
                MarcoPolo
              </div>
              <div className="registerbox">
                <LoginForm login={this.handleSubmit} error={this.state.error} />
              </div>
            </div>
        </div>
        <div className="right">
          <img className="logo" src={logo}/>
        </div>
      </div>
    );
  }
}


export default Login;
