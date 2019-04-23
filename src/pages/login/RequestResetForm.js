import React from 'react';

const RequestResetForm = ({ reset, error, response }) => (
    <div>
        <form onSubmit={reset}>
            <div className="errorClass">{error && error}</div>
            <input
                type="text"
                name="username"
                placeholder="johndoe@example.com"
                required
            />
            <button type="submit">Send reset email</button>
        </form>
        <div className="response">{response}</div>
    </div>
);

export default RequestResetForm;
