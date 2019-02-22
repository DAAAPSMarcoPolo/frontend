import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { apiFetch } from '../../utils/api';
import { saveToLocalStorage, deleteFromLocalStorage } from '../../utils/localstorage';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: '',
      first_name: '',
      last_name: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({ error: null });

    const formData = {
      body: JSON.stringify({
        "username": e.target.username.value,
        "first_name": e.target.first_name.value,
        "last_name": e.target.last_name.value,
        "password": e.target.password.value
      }),
      method: 'POST'
    }
    apiFetch('/profile/update/', formData)
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
  };

  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="page">
        <div className="logo">
          Profile
        </div>
        <div className="registerbox">
            <ProfileForm submit={this.handleSubmit} error={this.state.error} />
        </div>
      </div>
    );
  }
}

export default withCookies(Settings);
