import React from 'react';

const AddUserForm = ({addUser, error}) => (
    <form onSubmit={addUser}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
          <div>
              <input className="preferences-input" type="email" name="username" placeholder="username" required/>
              <br/>
              <input className="preferences-input" type="password" name="password" placeholder="password" required/>
          </div>
        <button type="submit" name="submit" value="submit">Add new user</button>
      {/* <button name="cancel" type="button" onClick={showAddUser}>Cancel</button> */}
    </form>
);

export default AddUserForm;
