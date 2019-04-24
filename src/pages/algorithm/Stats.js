import React from 'react';

const Stats = ( props ) => (
    <div className="con rel backtest-flex-child">
        <h3>Statistics</h3>
        <table className="con-table left">
          <thead>
            <tr>
                <th>Start Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{props.data.initial_cash}</td>
            </tr>
            <tr>
                <th>End Amount</th>
            </tr>
            <tr>
                <td>{props.data.end_cash}</td>
            </tr>
            <tr>
            <th>Sharpe Ratio</th>
            </tr>
            <tr>
            <td>{props.data.sharpe}</td>
            </tr>
            <tr>
                <th>Length of Test</th>
                <th>Start</th>
                <th>End</th>
            </tr>
            <tr>
                <td>{props.data.num_days} Days</td>
                <td>{props.data.start_date}</td>
                <td>{props.data.end_date}</td>
            </tr>
          </tbody>
        </table>
		<div className={`nav BacktestModeNav`}>
			<p onClick={props.toggleMode} className={`${!props.data.backtestHistoryMode && 'toggleLive'} click`}>Table</p>
			<p onClick={props.toggleMode} className={`${props.data.backtestHistoryMode && 'toggleLive'} marginLeft click`}>Graph</p>
		</div>
        <div className="percent">
            <div className="margin-auto">
                <p className="subtext">Percent Gain</p>
                <h1>{props.data.percent_gain}%</h1>
            </div>
        </div>
    </div>
);

export default Stats;
