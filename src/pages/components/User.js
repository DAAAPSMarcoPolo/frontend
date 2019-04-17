import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import edit from '../../assets/images/edit-icon.png';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
    saveToLocalStorage,
    getFromLocalStorage
} from '../../utils/localstorage';

class User extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies)
    };

    constructor(props) {
        super(props);
        this.state = {
            imagePreviewUrl: null,
            username: 'Username',
            tokenExpired: false
        };
        this.getProfilePicture = this.getProfilePicture.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    componentDidMount() {
        this.getProfilePicture();
        this.getUserInfo();
    }
    async getProfilePicture() {
        const response = await api.Get('/profilepicture/');
        if (response.status === 200) {
            const url = `https://marcopoloinvestment.club${response.data}`;
            this.setState({ imagePreviewUrl: url });
        }
    }
    getUserInfo = async () => {
        const res = await api.Get('/api/user/settings/');
        const { user } = res.data;
        if (user && user.username) {
            saveToLocalStorage({ user });
            this.setState({ username: user.username });
        } else if (!user) {
            this.logout();
        }
    };

    logout = () => {
        const { cookies } = this.props;
        cookies.set('isAuthenticated', false);
        cookies.set('isAdmin', false);
        cookies.remove('jwt');
        cookies.remove('email');
        this.setState({ tokenExpired: true });
    };

    addDefaultSrc(ev) {
        ev.target.src = `${edit}`;
    }
    render() {
        if (this.props.isAuthenticated === 'true' && !this.state.tokenExpired) {
            return (
                <Link className="user" to="/settings">
                    <div className="profile-nav">
                        {this.state.imagePreviewUrl && (
                            <img
                                className="profile-pic"
                                src={this.state.imagePreviewUrl}
                                alt="profile-pic"
                                onError={this.addDefaultSrc}
                            />
                        )}
                    </div>
                    <p>{this.state.username}</p>
                </Link>
            );
        } else return <Redirect to="/login" />;
    }
}
export default withCookies(User);
