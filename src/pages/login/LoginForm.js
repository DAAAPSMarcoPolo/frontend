import React from 'react';
import arrow from '../../assets/images/arrow.png';

const LoginForm = ({login, error}) => (
    <form onSubmit={login}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <input type="email" placeholder="email" name="username" required/>
        <div>
          <input type="password" placeholder="password" name="password" required/>
          <img className="submit-arrow" src={arrow} />
        </div>
        <button className="submit-btn">Login</button>
        <a href="/request-password-reset">Forgot your password?</a>
        <br/>
        <a href="/register">Create an Account</a>
        {/*TODO: Remove this since only admins can create and remove accounts*/}
    </form>
);

export default LoginForm;
