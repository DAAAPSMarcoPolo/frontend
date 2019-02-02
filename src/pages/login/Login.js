import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({redirectToReferrer: true, error: null});
  };

  render() {
    if (this.state.redirectToReferrer === true) {
      return (<Redirect to="/dashboard"/>);
    }
    return (
      <div className="page bgorange">
        <div className="logo">
          simplif.ai
        </div>
        <h1>Login</h1>
        <div className="registerbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} />
        </div>
      </div>
    );
  }
}


export default Login;
