import React from 'react';

const AddUserForm =  ({ addUser, error }) => (
    <form onSubmit={addUser}>
        <div className = "errorClass">
            {error ? {error} : null}
        </div>
        <label htmlFor="email">New user email:</label>
        <input type="email" name="username" required/>
        <br/>
        <label htmlFor="password">New user password:</label>
        <input type="password" name="password" required/>
        <input className="btn" type="submit" name="submit" value="submit" />
    </form>
);

export default AddUserForm;