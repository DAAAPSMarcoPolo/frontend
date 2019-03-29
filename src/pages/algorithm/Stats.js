import React from 'react';

const Stats = ({ data }) => (
    <div className="con rel">
        <h3>Statistics</h3>

        <table className="con-table left">
            <tr>
                <th>Start Amount</th>
            </tr>
            <tr>
                <td>{data.initial_cash}</td>
            </tr>
            <tr>
                <th>End Amount</th>
            </tr>
            <tr>
                <td>{data.end_cash}</td>
            </tr>
            <br />
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
        </table>
        <div className="percent">
            <div className="margin-auto">
                <p className="subtext">Percent Gain</p>
                <h1>{data.percent_gain}%</h1>
            </div>
        </div>
    </div>
);

export default Stats;
