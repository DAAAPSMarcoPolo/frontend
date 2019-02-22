import React from 'react';


const AlpacaPreferencesForm = ({updateAlpacaKey}) => (
  <div>
      <form onSubmit={updateAlpacaKey}>
          <h2 className="serif">Update Alpaca API Key</h2>
          <input className="preferences-input" type="text" name="key_id" placeholder="key id"/>
          <input className="preferences-input" type="text" name="secret_key" placeholder="secret key"/>
          <input type="submit" name="submit" value="submit"/>
      </form>
  </div>
);

export default AlpacaPreferencesForm;
