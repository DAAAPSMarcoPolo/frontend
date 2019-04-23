import React from 'react';

const ResetForm = ({ reset, error, response }) => (
    <div>
        <form onSubmit={reset}>
            <div className="errorClass">{error && error}</div>
            <input
                type="text"
                name="username"
                placeholder="johndoe@example.com"
                required
            />
            <input type="password" name="new_password" required />
            <button type="submit">Save new password</button>
        </form>
        <div className="response">{response}</div>
    </div>
);

export default ResetForm;
