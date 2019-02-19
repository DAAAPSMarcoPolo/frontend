import React from 'react';


const AlpacaPreferencesForm = ({updateAlpacaKey}) => (
  <div>
      <form onSubmit={updateAlpacaKey}>
          Update Alpaca API Key:
          <input className="preferences-input" type="text" name="alpacaKey"/>
          <input type="submit" name="submit" value="submit"/>
      </form>
  </div>
);

export default AlpacaPreferencesForm;