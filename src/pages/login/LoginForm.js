import React from 'react';

const LoginForm = ({login, error}) => (
    <form onSubmit={login}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <label htmlFor="email">email </label>
        <input type="email" name="username" required/>
        <label htmlFor="password">password </label>
        <input type="password" name="password" required/>
        <br/>
        <input className="btn" type="submit" name="submit" value="submit"/>
        <a href="/request-password-reset">Forgot your password?</a>
        <br/>
        <a href="/register">Create an Account</a>
        {/*TODO: Remove this since only admins can create and remove accounts*/}
    </form>
);

export default LoginForm;
