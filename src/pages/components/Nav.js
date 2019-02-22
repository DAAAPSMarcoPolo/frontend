import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect, Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import profile from '../../assets/images/profile.jpg';

import '../../assets/nav.css';

class Nav extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      open: false,
      imagePreviewUrl: null
    };
  }
  componentDidMount() {
    // const { cookies } = this.props;
    // const email = cookies.get('email');

    // return apiFetch('getPicture', {
    //   headers: {
    //    'Content-Type': 'text/plain'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: email
    //   })
    // }).then((response) => response.blob())
    //     .then((json) => {
    //       const url = window.URL.createObjectURL(json);
    //           if(json.success === false) {
    //               console.log('error', json.error);
    //               this.setState({ error: json.error });
    //           }
    //           else {
    //             this.setState({
    //               imagePreviewUrl: url
    //             });
    //           }
    //         });
  }
  handleClick() {
    if (!this.state.open) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       open: !prevState.open,
    }));
  }
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }
  shouldComponentUpdate() {
    return true;
  }
  logout = () => {
    const { cookies } = this.props;
    cookies.set('isAuthenticated', false);
    cookies.set('isAdmin', false);
    cookies.remove('jwt');
    cookies.remove('email');
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    const login = cookies.get('login');
    if (isAuthenticated === "false" && login === true) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="nav left" ref={node => { this.node = node; }}>
        <div onClick={this.handleClick} className="container">
          {isAuthenticated === "true"
            ?
            (
              <div>
              <div className="profile-nav">
              <Link to='/settings' onClick={this.handleClick}>
              <img className="profile-pic" src={profile} alt="profile-pic"/>
              <p>Username</p>
              </Link>
              </div>
              <div className="bar-con">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
              </div>
            ) :
            null
          }
        </div>
        {this.state.open && isAuthenticated === "true"
          ?
          (
            <div>
            <div className="profile-nav">
            <img className="profile-pic" src={profile} alt="profile-pic"/>
            <p>Username</p>
            </div>
            <div className="drop" >
            <Link to='/dashboard' onClick={this.handleClick}>Dashboard</Link>
            <Link to='/algorithms' onClick={this.handleClick}>Algorithms</Link>
            <Link to='/upload' onClick={this.handleClick}>Upload an Algorithm</Link>
            <Link to='/proposals' onClick={this.handleClick}>Proposals</Link>
            <Link to='/settings' onClick={this.handleClick}>Settings</Link>
            <Link to='/' onClick={this.logout}>Logout</Link>
          </div></div>) : null
        }
        <div className="user">
          {isAuthenticated === "true" && this.state.imagePreviewUrl ?
            (this.state.imagePreviewUrl.length > 0 ) ? (<img src={this.state.imagePreviewUrl} alt=""/>) : null
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default withCookies(Nav);
