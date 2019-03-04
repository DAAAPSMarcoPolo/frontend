import React from 'react';

const FirstLoginForm = ({updateProfile, error}) => (
    <form onSubmit={updateProfile}>
        <div className="errorClass">
            {error && error}
        </div>
        <input type="text" name="first_name" required placeholder="First Name"/>
        <input type="text" name="last_name" required placeholder="Last Name"/>
        <input type="telephone" name="phone_number" required placeholder="Phone Number"/>
        <input type="password" name="new_password" placeholder="New Password" required/>
        <button className="btn" type="submit" name="submit" value="submit">Submit</button>
    </form>
);

export default FirstLoginForm;
