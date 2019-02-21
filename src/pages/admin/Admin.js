import React, {Component} from 'react';
import AddUserForm from './AddUserForm'
import AlpacaPreferencesForm from './AlpacaPreferencesForm'
import {Redirect} from 'react-router-dom';
import {apiFetch, apiPost, apiGet, apiDelete} from '../../utils/api';
import './admin.css';
import UserList from './UserList';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            error: null,
            showAdd: false,
            showAlpaca: false,
            userslist: null
        }
        ;
        this.showAddUser = this.showAddUser.bind(this);
        this.showAlpacaPreferences = this.showAlpacaPreferences.bind(this);
        this.hide = this.hide.bind(this);
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

    showAddUser() {
        this.setState({showAdd: true, showAlpaca: false})
    };

    showAlpacaPreferences() {
        this.setState({showAdd: false, showAlpaca: true})
    };

    hide() {
        this.setState({showAdd: false, showAlpaca: false})
    };

    render() {
        if (this.state.redirectToReferrer === true) {
            return (<Redirect to="/dashboard"/>);
        }

        let addUserOption;
        if (this.state.showAdd === false) {
            addUserOption = <button id="add-user-hide-button" onClick={this.showAddUser}>Add new user</button>
        } else if (this.state.showAdd === true) {
            addUserOption = (
                <div>
                    <AddUserForm addUser={this.handleSubmitNewUser}/>
                    <button id="add-user-hide-button" onClick={this.hide}>Hide</button>
                </div>
            )
        }

        let alpacaApiSettings;
        if (this.state.showAlpaca === false) {
            alpacaApiSettings = <button id="add-user-hide-button" onClick={this.showAlpacaPreferences}>Modify Alpaca
                Preferences</button>
        } else if (this.state.showAlpaca === true) {
            alpacaApiSettings = (
                <div>
                    <AlpacaPreferencesForm updateAlpacaKey={this.handleSubmitAlpacaKey}/>
                    <button id="add-user-hide-button" onClick={this.hide}>Hide</button>
                </div>
            )
        }

        return (
            <div className="page bgorange temptext">
                <div className="logo">
                    simplif.ai
                </div>
                <h1>Admin Tools</h1>
                <UserList users={this.state.userslist} removeUser={this.handleRemoveUser}/>
                <div>
                    {addUserOption}
                    {alpacaApiSettings}
                </div>
            </div>
        );
    }
}

export default Admin;
