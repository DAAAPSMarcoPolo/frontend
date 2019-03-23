import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../../utils/api';
import edit from '../../assets/images/edit-icon.png';

class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
        imagePreviewUrl: null
      }
      this.getProfilePicture = this.getProfilePicture.bind(this);
  }
  componentDidMount() {
    this.getProfilePicture();
  }
  async getProfilePicture() {
      const response = await api.Get('/profilepicture/');
      if (response.status === 200) {
        const url = `https://marcopoloinvestment.club${response.data}`;
        this.setState({ imagePreviewUrl: url });
      }
  }
  addDefaultSrc(ev) {
    ev.target.src =`${edit}`;
  }
  render() {
      if (this.props.isAuthenticated === "true") {
          return (
              <Link className="user" to='/settings'>
                  <div className="profile-nav">
                      {this.state.imagePreviewUrl && <img className="profile-pic" src={this.state.imagePreviewUrl} alt="profile-pic" onError={this.addDefaultSrc}/>}
                  </div>
                  <p>Username</p>
              </Link>
          );
      } else return null;
  };
}
export default User;
