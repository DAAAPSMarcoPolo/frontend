import React, {Component} from 'react';
import {apiFetch, apiPost, apiGet, apiDelete} from '../../utils/api';
import EditProfile from './EditProfile';
import edit from '../../assets/images/edit-icon.png';
import x from '../../assets/images/x-icon.png';
import '../admin/admin.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showEditProfile: false,
            username: 'maudrey333@gmail.com',
            first_name: 'Audrey',
            last_name: 'Vincent',
            phone_number: '8124706350',
            password: 'ifyaw893usnfioaf',
            showConfirm: false
        };
        this.editProfile = this.editProfile.bind(this);
        this.editProfileWrap = this.editProfileWrap.bind(this);
    }
    editProfile = (e) => {
      e.preventDefault();
      e.persist();
      console.log('username value', e.target.username.value, 'state value', this.state.username);
      console.log('first_name value', e.target.first_name.value, 'state value', this.state.first_name);
      this.setState({ error: null });
      const formData = {
        body: JSON.stringify({
          "username": e.target.username.value,
          "first_name": e.target.first_name.value,
          "phone_number": e.target.phone_number.value,
          "last_name": e.target.last_name.value,
          "password": e.target.last_name.value,
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
  editProfileWrap = (e) => {
      this.setState({showConfirm: !this.state.showConfirm, user: ''});
      this.props.editProfile(e, this.state.user);
      this.forceUpdate();
  };
  showEditProfile = () => {
      this.setState({showEditProfile: !this.state.showEditProfile});
  };
  render() {
    return (
      <div className="con rel">
          <h2 className="serif">My Profile</h2>
          {this.state.showEditProfile ? (
            <div>
            <img className="icon roster" src={x} alt="x-icon" onClick={this.showEditProfile}/>
             <EditProfile submit={this.editProfile} error={this.state.error} phone_number={this.state.phone_number} username={this.state.username} first_name={this.state.first_name} last_name={this.state.last_name} />
            </div>
          ) : (
              <div>
              <img className="icon roster" src={edit} alt="edit-icon" onClick={this.showEditProfile}/>
              <div class="profile">
                <div className="profile-img"></div>
                <h3>{this.state.username}</h3>
                <h4>{this.state.first_name} {this.state.last_name}</h4>
                <p>{this.state.phone_number}</p>
                <button onClick={this.showEditPassword}>Update Password</button>
              </div>
              </div>
          )}
          {this.state.showConfirm ?
            <div className="overlay rel">
            <p>Please re-enter your password to update your profile.</p>
            <input type="text" name="password" placeholder="Password" required/>
            <button onClick={this.removeUserWrap}>Confirm</button>
            </div>
            :
            null}
      </div>
    );
  }
}

export default Settings;
