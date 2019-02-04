import React, { Component } from 'react';
import LoginForm from '../login/LoginForm';
import { Redirect } from 'react-router-dom';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({redirectToReferrer: true, error: null});
  };

  render() {
    if (this.state.redirectToReferrer === true) {
      return (<Redirect to="/dashboard"/>);
    }
    return (
      <div className="page bgorange">
        <div className="logo">
          simplif.ai
        </div>
        <h1>Login</h1>
        <div className="registerbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} />
        </div>
      </div>
    );
  }
}

// const Settings = () => (
//   <div>
//     <p>Settings Page</p>
//     <form>
//       <input name="name" type="text" />
//     </form>
//   </div>
// );

export default Settings;
