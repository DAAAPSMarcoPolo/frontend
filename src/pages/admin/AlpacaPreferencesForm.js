import React from 'react';


const AlpacaPreferencesForm = ({updateAlpacaKey}) => (
  <div>
      <form onSubmit={updateAlpacaKey}>
          Update Alpaca API Key:
          <input className="preferences-input" type="text" name="key_id" defaultValue="key id"/>
          <input className="preferences-input" type="text" name="secret_key" defaultValue="secret key"/>
          <input type="submit" name="submit" value="submit"/>
      </form>
  </div>
);

export default AlpacaPreferencesForm;