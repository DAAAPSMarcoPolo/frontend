import React from 'react';

const LiveStats = ({ data }) => (
    <div className="con rel live-stats">
        <h3>Live Statistics</h3>

        <table className="con-table left">
          <thead>
            <tr>
                <th>Start Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{data.live_instance.starting_cash}</td>
            </tr>
            <tr>
                <th>Current Cash</th>
            </tr>
            <tr>
                <td>{(data.live_instance.starting_cash+
                    data.live_instance.starting_cash*data.pct_gain).toFixed(2)}</td>
            </tr>

            <tr>
                <th>Live Since</th>
            </tr>
            <tr>
            {`${new Date(
                    data.live_instance.created_at
                ).getFullYear()}-${new Date(
                    data.live_instance.created_at
                ).getMonth()+1}-${new Date(
                    data.live_instance.created_at
                ).getDate()}`
            }
            </tr>
          </tbody>
        </table>
        <div className={`percent ${parseInt(data.pct_gain) <= 0 ? 'percentRed' : 'percentGreen'}`}>
            <div className="margin-auto">
                <p className="subtext">Percent Gain</p>
                <h1>{(100*data.pct_gain).toFixed(2)}%</h1>
            </div>
        </div>
    </div>
);

export default LiveStats;
