import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api';
import { saveToLocalStorage, deleteFromLocalStorage } from '../../utils/localstorage';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null,
      username: null,
      first_name: null,
      last_name: null,
      password: null
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
    if (this.state.redirectToReferrer === true) {
      return (<Redirect to="/dashboard"/>);
    }
    return (
      <div className="page bgorange">
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

// const Settings = () => (
//   <div>
//     <p>Settings Page</p>
//     <form>
//       <input name="name" type="text" />
//     </form>
//   </div>
// );

export default Settings;
