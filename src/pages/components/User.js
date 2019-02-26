import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../../assets/images/profile.jpg';

const User = ({isAuthenticated}) => {
  if (isAuthenticated === "true") {
    return (
      <Link className="user" to='/settings'>
        <div className="profile-nav">
          <img className="profile-pic" src={profile} alt="profile-pic"/>
        </div>
        <p>Username</p>
      </Link>
    );
  } else return null;
};
export default User;
