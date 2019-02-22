import React from 'react';

const EditProfile = ({submit, error}) => (
    <form onSubmit={submit} className="con ref">
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <input type="text" name="username" placeholder="Email" required/>
        <input type="text" name="first_name" placeholder="First Name" required/>
        <input type="text" name="last_name" placeholder="Last Name" required/>
        <input type="text" name="password" placeholder="Password" equired/>
        <button  type="submit" name="submit" value="submit">Submit</button>
    </form>
);

export default EditProfile;
