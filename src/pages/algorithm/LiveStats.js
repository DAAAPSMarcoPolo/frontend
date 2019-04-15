import React from 'react';

/*
"id": 1,
"live_trade_instance_id": 19,
"symbol": "AAPL",
"open": true,
"open_date": "2019-04-10T16:43:15.619000Z",
"close_date": null,
"qty": 1,
"open_price": 2,
"close_price": null
*/

const LiveStats = ({ data }) => (
    <div className="con rel">
        <h3>Statistics</h3>

        <table className="con-table left">
          <thead>
            <tr>
                <th>Start Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{data.initial_cash}</td>
            </tr>
            <tr>
                <th>End Amount</th>
            </tr>
            <tr>
                <td>{data.end_cash}</td>
            </tr>

            <tr>
                <th>Length of Test</th>
                <th>Start</th>
                <th>End</th>
            </tr>
            <tr>
                <td>{data.num_days}</td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
            </tr>
            <tr>
                <th>Sharpe Ratio</th>
                <th>Alpha</th>
                <th>Beta</th>
            </tr>
            <tr>
                <td>{data.sharpe}</td>
                <td>--</td>
                <td>--</td>
            </tr>
          </tbody>
        </table>
        <div className="percent">
            <div className="margin-auto">
                <p className="subtext">Percent Gain</p>
                <h1>{data.percent_gain}%</h1>
            </div>
        </div>
    </div>
);

export default LiveStats;
