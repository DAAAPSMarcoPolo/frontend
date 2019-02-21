import React, {Component} from 'react';
import AddUserForm from './AddUserForm'
import AlpacaPreferencesForm from './AlpacaPreferencesForm'
import {Redirect} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { apiFetch } from '../../utils/api';
import './admin.css';
import UserList from './UserList';
import add from '../../assets/images/plus-circle-icon.png';

/*TODO: Remove this for production*/
const mockUsers = [
    "Abigail",
    "Danny",
    "Audrey",
    "Sean",
    "Avnish",
    "Pranay"
];

class Admin extends Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          showAdd: false,
          showAlpaca: false
      };
      this.showAddUser = this.showAddUser.bind(this);
      this.showAlpacaPreferences = this.showAlpacaPreferences.bind(this);
  }

  handleSubmitNewUser = async (e) => {
    e.preventDefault();
    e.persist();
    this.setState({redirectToReferrer: true, error: null});
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
          return { data }
        })
    });
    console.log(data);
  };

  handleRemoveUser = async (e, username) => {
    console.log("Removing a user");
    console.log(username)
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
  };

  showAddUser = () => {
      this.setState({showAdd: !this.state.showAdd})
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
          <h1>Admin Tools</h1>
          <div className="con rel">
            <h2 className="serif">Team Roster</h2>
            <img src={add} className="icon roster" alt="plus-icon" id="add-user-hide-button" onClick={this.showAddUser}/>
            <UserList users={mockUsers} removeUser={this.handleRemoveUser} refresh={mockUsers}/>
            {this.state.showAdd ? (
              <div>
                <AddUserForm addUser={this.handleSubmitNewUser}/>
                <button id="add-user-hide-button" onClick={this.showAddUser}>Cancel</button>
              </div>
            ) : null}
          </div>
          <br/>
          <div className="con">
              {alpacaApiSettings}
          </div>
      </div>
    );
  }
}

export default withCookies(Admin);
