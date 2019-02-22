import React from 'react';

const EditProfile = ({submit, error, username, phone_number, first_name, last_name}) => (
    <form onSubmit={submit} className="con ref">
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <input type="email" name="username" placeholder="Username"  defaultValue={username} required/>
        <input type="text" name="first_name" placeholder="First Name" defaultValue={first_name} required/>
        <input type="text" name="last_name" placeholder="Last Name" defaultValue={last_name} required/>
        <input type="tel" name="phone_number" placeholder="Phone Number" defaultValue={phone_number} required/>
        <button  type="submit" name="submit" value="submit">Submit</button>
    </form>
);

export default EditProfile;
