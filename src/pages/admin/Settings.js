import React, {Component} from 'react';
import AlpacaPreferencesForm from './AlpacaPreferencesForm'
import {Redirect} from 'react-router-dom';
import {apiFetch, apiPost, apiGet, apiDelete} from '../../utils/api';
import { withCookies } from 'react-cookie';
import './admin.css';
import UserList from './UserList';
import Profile from '../profile/Profile';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlpaca: false,
            userslist: null,
            error: '',
            username: '',
            first_name: '',
            last_name: '',
            password: ''
        };
        this.showAlpacaPreferences = this.showAlpacaPreferences.bind(this);
        this.getUsersList = this.getUsersList.bind(this);
    }

    componentDidMount() {
        this.getUsersList();
    }

    async getUsersList() {
        const response = await apiGet('/users/list/');
        this.setState({userslist: response.data.users});
    };

    handleSubmitNewUser = async (e) => {
        e.preventDefault();
        e.persist();
        console.log(`username: ${e.target.username.value}`);
        console.log(`password: ${e.target.password.value}`);
        const formData = {
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            }),
            method: 'POST'
        };
        const data = await apiFetch('/auth/adduser/', formData)
            .then(res => {
                return res.json().then(data => {
                    return {data}
                })
            });
        console.log(data);
    };

    handleRemoveUser = async (e, username) => {
        console.log("Removing a user:", username);
        const formbody = {
            username: username
        };
        const response =  await apiDelete('/users/list/', formbody);
        console.log(response);
    };

    handleSubmitAlpacaKey = async (e) => {
        e.preventDefault();
        e.persist();
        let formData = {
            "user": 5,
            "key_id": e.target.key_id.value,
            "secret_key": e.target.secret_key.value
        };
        const response = await apiPost('/alpaca/', formData);
        console.log(response.status);
    };

  handleSubmitAlpacaKey = async (e) => {
    e.preventDefault();
    e.persist();
    console.log(`new key: ${e.target.alpacaKey.value}`);
    const formData = {
        body: JSON.stringify({
            "alpacaKey" : e.target.alpacaKey.value
        }),
        method: 'POST'
    };
    const data = await apiFetch('/api/alpaca/', formData)
        .then(res => {
            return res.json()
        })
    console.log('data', data);
  };
  showAlpacaPreferences = () => {
      this.setState({showAlpaca: !this.state.showAlpaca})
  };
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    const isAdmin = cookies.get('isAdmin');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }

    let alpacaApiSettings;
    if (this.state.showAlpaca === false) {
        alpacaApiSettings = <button id="add-user-hide-button" onClick={this.showAlpacaPreferences}>Modify Alpaca Preferences</button>
    } else if (this.state.showAlpaca === true) {
        alpacaApiSettings = (
            <div>
                <AlpacaPreferencesForm updateAlpacaKey={this.handleSubmitAlpacaKey}/>
                <button id="add-user-hide-button" onClick={this.showAlpacaPreferences}>Hide</button>
            </div>
        )
    }

    return (
      <div className="page temptext">
          <h1>Settings Page</h1>
          <Profile />
          <br/><br/>
          <UserList users={this.state.userslist} removeUser={this.handleRemoveUser} isAdmin={isAdmin} error={this.state.error} />
          <br/>
          <div className="con">
              {alpacaApiSettings}
          </div>
      </div>
    );
  }
}

export default withCookies(Settings);
