import React from 'react';

const Stats = () => (
    <div className="con rel">
      <h3>Statistics</h3>

      <table className="con-table left">
      <tr>
        <th>Start Amount</th>
      </tr>
      <tr>
        <td>--</td>
      </tr>
      <tr>
        <th>End Amount</th>
      </tr>
      <tr>
        <td>--</td>
      </tr>
      <tr>
        <th>% Gain</th>
      </tr>
      <tr>
        <td>--</td>
      </tr>
        <tr>
          <th>Length of Test</th>
          <th>Start</th>
          <th>End</th>
        </tr>
        <tr>
          <td>Transactions</td>
          <td>Stock</td>
          <td>Date</td>
        </tr>
        <tr>
          <th>Sharpe Ratio</th>
          <th>Alpha</th>
          <th>Beta</th>
        </tr>
        <tr>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </tr>
      </table>
      <div className="percent">
        <div className="margin-auto">
          <p className="subtext">Percent Gain</p>
          <h1>84%</h1>
        </div>
      </div>
    </div>
);

export default Stats;
