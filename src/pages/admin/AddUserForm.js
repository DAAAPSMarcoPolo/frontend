import React from 'react';

const AddUserForm = ({addUser, error}) => (
    <form onSubmit={addUser}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <div id="addFormParent">
            <div>
                <label className="form-item" htmlFor="email">New user email:</label>
                <br/>
                <label className="form-item" htmlFor="password">New user password:</label>
            </div>
            <div>
                <input className="addform form-item" type="email" name="username" required/>
                <br/>
                <input className="addform form-item" type="password" name="password" required/>
            </div>
        </div>
        <input className="addbtn" type="submit" name="submit" value="submit"/>
    </form>
);

export default AddUserForm;