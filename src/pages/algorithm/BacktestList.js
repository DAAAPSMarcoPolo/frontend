import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';

const BacktestList = ({ backtests, backtestSelected, selectBacktest }) => (
    <div className="backtest margins">
        <ul className="nav-tabs nav nav-overflow scroll">
            {backtests && backtests.map((backtest, i) => <li className={`tab select-backtest ${backtestSelected.backtest.id === backtest.backtest.id && 'active'}`} key={i} onClick={() => selectBacktest(i)}> {backtest.backtest.id}</li> )}
        </ul>
        <div className="padding">
            <table className="transaction-table nav-overflow">
                <tr>
                    <th>Transaction Id</th>
                    <th>Stock</th>
                    <th>Buy Price</th>
                    <th>Buy Time</th>
                    <th>Quantity</th>
                    <th>Sell Price</th>
                    <th>Sell Time</th>
                </tr>
                {backtestSelected.trades && backtestSelected.trades.map((el, i) => (
                    <tr key={i}>
                        <td className="tab">#{el.id}</td>
                        <td className="tab">{el.symbol}</td>
                        <td className="tab">${el.buy_price}</td>
                        <td className="tab">{el.buy_time}</td>
                        <td className="tab">{el.qty}</td>
                        <td className="tab">{el.sell_price}</td>
                        <td className="tab">{el.sell_time}</td>
                    </tr>
                ))}
            </table>
        </div>
    </div>
);

export default BacktestList;
