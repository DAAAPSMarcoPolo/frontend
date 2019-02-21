import React from 'react';

const FirstLoginForm = ({updateProfile, error}) => (
    <form onSubmit={updateProfile}>
        <div className="errorClass">
            {error ? error : null}
        </div>
        <label htmlFor="first_name">First Name</label>
        <input type="text" name="first_name" required placeholder="Jon"/>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" required placeholder="Snow"/>
        <label htmlFor="phone_number">Phone Number</label>
        <input type="telephone" name="phone_number" required placeholder="1234567891"/>
        <label htmlFor="new_password">New Password</label>
        <input type="password" name="new_password" required />
        <input className="btn" type="submit" name="submit" value="submit"/>
    </form>
);

export default FirstLoginForm;
