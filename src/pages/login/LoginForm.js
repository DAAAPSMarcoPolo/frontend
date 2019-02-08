import React from 'react';

const LoginForm = ({login, error}) => (
    <form onSubmit={login}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <input type="email" placeholder="email" name="username" required/>
        <input type="password" placeholder="password" name="password" required/>
        <br/>
        <input className="btn" type="submit" name="submit" value="submit"/>
        <a href="/request-password-reset">Forgot your password?</a>
        <br/>
        <a href="/register">Create an Account</a>
        {/*TODO: Remove this since only admins can create and remove accounts*/}
    </form>
);

export default LoginForm;
