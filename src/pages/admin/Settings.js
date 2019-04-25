import React, { Component } from 'react';
import AlpacaPreferencesForm from './AlpacaPreferencesForm';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';
import './admin.css';
import x from '../../assets/images/x-icon.png';
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
            password: '',
            is_staff: null
        };
        this.showAlpacaPreferences = this.showAlpacaPreferences.bind(this);
        this.getUsersList = this.getUsersList.bind(this);
    }

    componentDidMount() {
        this.getUsersList();
    }

    async getUsersList() {
        const response = await api.Get('/users/list/');
        this.setState({ userslist: response.data.users });
    }

    handleRemoveUser = async (e, username) => {
        const formbody = {
            username: username
        };
        const response = await api.Delete('/users/list/', formbody);
        if (response.status === 401) {
            if (response.message) {
                this.setState({ error: response.message });
                setTimeout(() => { this.setState({error: null}); }, 5000);
            }
        }
    };

    handleSubmitAlpacaKey = async e => {
        e.preventDefault();
        e.persist();
        let formData = {
            key_id: e.target.key_id.value,
            secret_key: e.target.secret_key.value
        };
        const response = await api.Post('/alpaca/', formData);
    };

    showAlpacaPreferences = () => {
        this.setState({ showAlpaca: !this.state.showAlpaca });
    };

    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        let alpacaApiSettings;
        if (this.state.showAlpaca === false) {
            alpacaApiSettings = <button id="add-user-hide-button" onClick={this.showAlpacaPreferences}>Modify Alpaca
                Preferences</button>
        }
        if (isAuthenticated === 'false' || !isAuthenticated) {
            return <Redirect to="/login" />;
        }
        if (this.state.showAlpaca === false) {
            alpacaApiSettings = (
                <button
                    id="add-user-hide-button"
                    onClick={this.showAlpacaPreferences}
                >
                    Modify Alpaca Preferences
                </button>
            );
        } else if (this.state.showAlpaca === true) {
            alpacaApiSettings = (
                <div className="con rel">
                    <img
                        src={x}
                        className="icon roster"
                        alt="x-icon"
                        onClick={this.showAlpacaPreferences}
                    />
                    <AlpacaPreferencesForm
                        updateAlpacaKey={this.handleSubmitAlpacaKey}
                    />
                </div>
            );
        }
        return (
            <div className="page temptext">
                <h1>Settings Page</h1>
                <Profile />
                <br />
                <br />
                <UserList
                    users={this.state.userslist}
                    removeUser={this.handleRemoveUser}
                    isAdmin={isAdmin}
                    error={this.state.error}
                    getUsersList={this.getUsersList}
                />
                <br />
                <div className="con">{alpacaApiSettings}</div>
            </div>
        );
    }
}

export default withCookies(Settings);
