import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../utils/api';

class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
      }
  }
  componentDidMount() {
    this.getProfilePicture();
  }
  async getProfilePicture() {
    const response = await api.Get('/profilepicture/');
    console.log("response", response);
    if (response.status === 200) {
      // this.setState({ imagePreviewUrl: response.profile.avatar.url });
      console.log("success!");
    }
  }
  render() {
      if (this.props.isAuthenticated === "true") {
          return (
              <Link className="user" to='/settings'>
                  <div className="profile-nav">
                      <img className="profile-pic" src={this.state.imagePreviewUrl} alt="profile-pic"/>
                  </div>
                  <p>Username</p>
              </Link>
          );
      } else return null;
  };
}
export default User;
