import React from 'react';
import arrow from '../../assets/images/arrow.png';

const FactorForm = ({login, error}) => (
    <form onSubmit={login}>
        <div className="errorClass">
            {error ? {error} : null}
        </div>
        <div>
          <input type="text" name="code" placeholder="Code" required/>
          <img className="submit-arrow" src={arrow} alt="arrow" />
        </div>
        <button className="submit-btn"  type="submit" name="submit" value="submit">Submit</button>
        <a href="/request-password-reset">Didn't receive a code?</a>
    </form>
);

export default FactorForm;
