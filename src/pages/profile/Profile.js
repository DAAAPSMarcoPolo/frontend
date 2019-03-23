import React, { Component } from 'react';
import api from '../../utils/api';
import EditProfile from './EditProfile';
import edit from '../../assets/images/edit-icon.png';
import x from '../../assets/images/x-icon.png';
import '../admin/admin.css';
import {BACKEND_DIR} from '../../utils/config';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showEditProfile: false,
            user: {
                username: '',
                first_name: '',
                last_name: '',
                profile__phone_number: ''
            },
            showConfirm: false,
            file: null,
            imagePreviewUrl: '',
            filename: '',
            showUpload: false,
            showPass: false
        };
        this.editProfile = this.editProfile.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.savePicture = this.savePicture.bind(this);
    }

    async getProfilePicture() {
        const response = await api.Get('/profilepicture/');
        if (response.status === 200) {
          const url = `https://marcopoloinvestment.club${response.data}`;
          this.setState({ imagePreviewUrl: url });
        }
        console.log('getProfilePicture', response);
    }

    async componentDidMount() {
        const formData = {
            username: this.state.username
        };
        this.getProfilePicture();
        const res = await api.Get('/api/user/settings/');
        const { user } = res.data;
        this.setState({ user });
    }

    editProfile = e => {
        e.preventDefault();
        e.persist();
        this.setState({ error: null });
        const formData = {
            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            phone_number: e.target.phone_number.value
        };
        api.Post('/user/settings/', formData).then(res => {
            return res.json().then(data => {
                if (res.status === 200 && data.token) {
                    // the response returned a success
                    console.log('/user/settings/', 'success');
                    this.setState({ showConfirm: !this.state.showConfirm });
                } else if (res.status === 401) {
                    if (res.message) {
                        this.setState({ error: res.message });
                    }
                }
            });
        });
    };
    updatePassword = e => {
        e.preventDefault();
        e.persist();
        this.setState({ error: null });
        const formData = {
            password: e.target.old_password.value,
            new_password: e.target.new_password.value
        };
        api.Put('/user/settings/', formData).then(res => {
            return res.json().then(data => {
                if (res.status === 200 && data.token) {
                    // the response returned a success
                    console.log('/user/settings/', 'success');
                    this.setState({ showConfirm: !this.state.showConfirm });
                } else if (res.status === 401) {
                    if (res.message) {
                        this.setState({ error: res.message });
                    }
                }
            });
        });
    };
    async handleImageChange(e) {
      e.preventDefault();
      e.persist();
      // let reader = new FileReader();
      const file = e.target.files[0];
      console.log('file', file);
      this.setState({
        file: file,
        filename: file.name,
        imagePreviewUrl: file
      });
      // reader.readAsDataURL(file);
    }
    async savePicture(e) {
      e.preventDefault();
      e.persist();

      if (this.state.file != null) {
        const formData = new FormData();
        console.log('pic', this.state.file);
        formData.append('avatar', this.state.file);
        const response = await api.PostFile('/profilepicture/', formData);
        console.log(response);
        if (response.status === 200) {
            // the response returned a success
            const url = `https://marcopoloinvestment.club${response.data}`;
            console.log('url', url);
            console.log(
                '/profilepicture/',
                'success',
                response,
                'url',
                response.data
            );
            this.setState({ imagePreviewUrl: url });
            // this.setState({showConfirm: !this.state.showConfirm});
        } else if (response.status === 401) {
            if (response.message) {
              this.setState({ error: response.message });
            }
        }
      } else {
        console.log("please upload a file");
      }
    };
    showEditProfile = () => {
        this.setState({ showEditProfile: !this.state.showEditProfile });
    };
    showUploadImage = () => {
        this.setState({ showUpload: !this.state.showUpload });
    };
    showEditPassword = () => {
        this.setState({ showPass: !this.state.showPass });
    };

    render() {
        const { user } = this.state;
        return (
            <div className="con rel">
                <div className="profile-circle">
                    <img
                        src={this.state.imagePreviewUrl}
                        alt="profile-pic"
                        className="profile-img"
                    />
                </div>
                <h2 className="serif">My Profile</h2>
                {this.state.showEditProfile ? (
                    <div>
                        <img
                            className="icon roster"
                            src={x}
                            alt="x-icon"
                            onClick={this.showEditProfile}
                        />
                        <EditProfile
                            submit={this.editProfile}
                            error={this.state.error}
                            phone_number={user.profile__phone_number}
                            username={user.username}
                            first_name={user.first_name}
                            last_name={user.last_name}
                        />
                    </div>
                ) : (
                    <div>
                        <img
                            className="icon roster"
                            src={edit}
                            alt="edit-icon"
                            onClick={this.showEditProfile}
                        />
                        <div className="profile">
                            <h3>{user.username}</h3>
                            <h4>
                                {user.first_name} {user.last_name}
                            </h4>
                            <p>{user.profile__phone_number}</p>
                            {!this.state.showPass ? (
                                <button onClick={this.showEditPassword}>
                                    Update Password
                                </button>
                            ) : null}
                        </div>
                    </div>
                )}
                {this.state.showUpload ? (
                    <form className="image-upload" onSubmit={this.savePicture}>
                        <h1>Profile Options</h1>
                        <input
                            className="fileInput"
                            type="file"
                            onChange={this.handleImageChange}
                            required
                        />
                        <button className="submitButton" type="submit">
                            Upload New Profile Image
                        </button>
                    </form>
                ) : (
                    <button onClick={this.showUploadImage}>Upload image</button>
                )}
                {this.state.showPass ? (
                    <form onSubmit={this.updatePassword}>
                        <h3>Update Password</h3>
                        <input
                            type="text"
                            name="old_password"
                            placeholder="Old Password"
                            required
                        />
                        <input
                            type="text"
                            name="new_password"
                            placeholder="New Password"
                            required
                        />
                        <button className="submitButton" type="submit">
                            Update Password
                        </button>
                    </form>
                ) : null}
            </div>
        );
    }
}

export default Settings;
