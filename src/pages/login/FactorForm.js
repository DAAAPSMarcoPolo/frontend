import React from 'react';

const FactorForm = ({login, error}) => (
    <form onSubmit={login}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <label htmlFor="code">Code </label>
        <input type="text" name="code" required/>
        <br/>
        <input className="btn" type="submit" name="submit" value="submit"/>
    </form>
);

export default FactorForm;
