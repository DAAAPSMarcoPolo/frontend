import React from 'react';

const ProfileForm = ({submit, error}) => (
    <form onSubmit={submit}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <label htmlFor="username">Email</label>
        <input type="text" name="username" required/>
        <br/>
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" required/>
        <br/>
        <label htmlFor="last_name">Last name</label>
        <input type="text" name="last_name" required/>
        <br/>
        <label htmlFor="password">New password</label>
        <input type="text" name="password" required/>
        <br/>
        <input className="btn" type="submit" name="submit" value="submit"/>
    </form>
);

export default ProfileForm;
