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
          showConfirm: false,
          file: '',
          imagePreviewUrl: '',
    };
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {

    const formData = {
      user: {
        "username": "maudrey333@gmail.com"
      }
    }
    apiGet('/profilepicture/', formData)
      .then(res => {
        return res.json().then(data => {
          if (res.status === 200 && data.token) {
            // the response returned a success
            console.log('/profilepicture/', 'success')
            const url = window.URL.createObjectURL(data);
            this.setState({ imagePreviewUrl: url });
            // this.setState({showConfirm: !this.state.showConfirm});
          } else if (res.status === 401) {
            if (res.message) {
              this.setState({ error: res.message });
            }
          }
        })
    });
  }
  editProfile = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({ error: null });
    const formData = {
      body: JSON.stringify({
        "username": e.target.username.value,
        "first_name": e.target.first_name.value,
        "last_name":  e.target.last_name.value,
        "phone_number": e.target.phone_number.value
      }),
      method: 'POST'
    }
    apiFetch('/user/settings/', formData)
      .then(res => {
        return res.json().then(data => {
          if (res.status === 200 && data.token) {
            // the response returned a success
            console.log('/user/settings/', 'success')
            this.setState({showConfirm: !this.state.showConfirm});
          } else if (res.status === 401) {
            if (res.message) {
              this.setState({ error: res.message });
            }
          }
        })
    });
  }
  showEditProfile = () => {
      this.setState({showEditProfile: !this.state.showEditProfile});
  };
  render() {
    return (
      <div className="con rel">
        <div className="profile-circle">
        {this.state.imagePreviewUrl ?
          <img src={this.state.imagePreviewUrl} alt="profile-pic" className="profile-img"/>
        :
          <div className="profile-img"></div>
        }
        </div>
          <h2 className="serif">My Profile</h2>
          {this.state.showEditProfile ? (
            <div>
            <img className="icon roster" src={x} alt="x-icon" onClick={this.showEditProfile}/>
             <EditProfile submit={this.editProfile} error={this.state.error} phone_number={this.state.phone_number} username={this.state.username} first_name={this.state.first_name} last_name={this.state.last_name} />
            </div>
          ) : (
              <div>
              <img className="icon roster" src={edit} alt="edit-icon" onClick={this.showEditProfile}/>
              <div className="profile">
                <h3>{this.state.username}</h3>
                <h4>{this.state.first_name} {this.state.last_name}</h4>
                <p>{this.state.phone_number}</p>
                <button onClick={this.showEditPassword}>Update Password</button>
              </div>
              </div>
          )}
      </div>
    );
  }
}

export default Settings;
