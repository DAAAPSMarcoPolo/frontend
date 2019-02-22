import React, {Component} from 'react';
import {apiFetch, apiPost, apiGet, apiDelete} from '../../utils/api';
import EditProfile from './EditProfile';
import edit from '../../assets/images/edit-icon.png';
import '../admin/admin.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showProfile: false,
            username: '',
            first_name: '',
            last_name: '',
            password: ''
        };
        this.handleEditProfile = this.handleEditProfile.bind(this);
    }
    handleEditProfile = (e) => {
      e.preventDefault();
      e.persist();
      console.log('form value', e.target.last_name.value, 'state value', this.state.last_name);
      this.setState({ error: null });
      const formData = {
        body: JSON.stringify({
          "username": (e.target.username.value ? e.target.username.value : this.state.username),
          "first_name":  (e.target.first_name.value ? e.target.first_name.value : this.state.first_name),
          "phone_number":  (e.target.phone_number.value ? e.target.phone_number.value : this.state.phone_number),
          "last_name": (e.target.last_name.value ? e.target.last_name.value : this.state.last_name),
          "password": (e.target.last_name.value ? e.target.last_name.value : this.state.last_name),
        }),
        method: 'POST'
      }
      apiFetch('/user/settings/', formData)
        .then(res => {
          return res.json().then(data => {
            if (res.status === 200 && data.token) {
              // the response returned a success
              console.log('/user/settings/', 'success')
            } else if (res.status === 401) {
              if (res.message) {
                this.setState({ error: res.message });
              }
            }
          })
      });
    };
  showEditProfile = () => {
      this.setState({showProfile: !this.state.showProfile});
  };
  render() {
    return (
      <div className="con rel">
          <h2 className="serif">My Profile</h2>
          <img className="icon roster" src={edit} alt="edit-icon" onClick={this.showEditProfile}/>
          {this.state.showProfile ? <EditProfile submit={this.handleEditProfile} error={this.state.error} />
          :
            (
              <div class="profile">
                <div className="profile-img"></div>
              </div>
            )
          }
      </div>
    );
  }
}

export default Settings;
