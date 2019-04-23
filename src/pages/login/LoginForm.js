import React from 'react';
import arrow from '../../assets/images/arrow.png';

const LoginForm = ({ login, error }) => (
    <form onSubmit={login}>
        <div className="errorClass">{error && error}</div>
        <input type="email" placeholder="email" name="username" required />
        <div>
            <input
                type="password"
                placeholder="password"
                name="password"
                required
            />
            <button className="btn-img">
                <img className="submit-arrow" src={arrow} alt="arrow" />
            </button>
        </div>
        <button className="submit-btn">Login</button>
        <a href="/reset">Forgot your password?</a>
        <br />
        <a href="/register">Create an Account</a>
        {/*TODO: Remove this since only admins can create and remove accounts*/}
    </form>
);

export default LoginForm;
