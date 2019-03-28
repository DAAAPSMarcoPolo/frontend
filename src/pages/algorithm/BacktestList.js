import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';

const BacktestList = ({ backtests, backtestSelected, selectBacktest }) => (
    <div className="margins">
        <ul className="nav-tabs nav nav-overflow scroll">
            {backtests.map((el, i) => (
                <li
                    className={
                        'tab bt-nav-tab ' +
                        (backtestSelected &&
                        backtestSelected.backtest.id === el.backtest.id
                            ? 'active'
                            : '')
                    }
                    key={i}
                    onClick={() => selectBacktest(i)}
                >
                    {' '}
                    {el.backtest.id}
                </li>
            ))}
        </ul>
        <div className="padding">
            <table className="transaction-table center nav-overflow">
                <tr>
                    <th>Transaction Id</th>
                    <th>Stock</th>
                    <th>Buy Price</th>
                    <th>Buy Time</th>
                    <th>Quantity</th>
                    <th>Sell Price</th>
                    <th>Sell Time</th>
                </tr>
                {backtestSelected.trades.map((el, i) => (
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
