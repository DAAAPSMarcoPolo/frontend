import React from 'react';

const EditProfile = ({submit, error, username, phone_number, first_name, last_name}) => (
    <form onSubmit={submit} className="con ref">
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <input type="text" name="username" placeholder={username} required/>
        <input type="text" name="first_name" placeholder={first_name} required/>
        <input type="text" name="last_name" placeholder={last_name} required/>
        <input type="text" name="last_name" placeholder={phone_number} required/>
        <button  type="submit" name="submit" value="submit">Submit</button>
    </form>
);

export default EditProfile;
