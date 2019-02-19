import React from 'react';

const AddUserForm = ({addUser, error}) => (
    <form onSubmit={addUser}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <div>
            <div>
                <label htmlFor="email">New user email:</label>
                <br/>
                <label htmlFor="password">New user password:</label>
            </div>
            <div>
                <input className="preferences-input" type="email" name="username" required/>
                <br/>
                <input className="preferences-input" type="password" name="password" required/>
            </div>
        </div>
        <input className="addbtn" type="submit" name="submit" value="submit"/>
    </form>
);

export default AddUserForm;