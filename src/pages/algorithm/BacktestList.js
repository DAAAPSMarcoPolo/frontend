import React from 'react';
import '../../assets/algo.css';

const BacktestList = ({ backtests, backtestSelected, selectBacktest }) => (
    <div className="backtest margins">
        <ul className="nav-tabs nav-overflow scroll-hide">
            {backtests &&
                backtests.map((backtest, i) => (
                    <li
                        className={`tab select-backtest ${backtestSelected
                            .backtest.id === backtest.backtest.id && 'active'}`}
                        key={i}
                        onClick={() => selectBacktest(i, backtest.backtest.id)}
                    >
                        {' '}
                        {backtest.backtest.id}
                    </li>
                ))}
        </ul>
        <div className="padding">
            <table className="transaction-table nav-overflow">
                <tr>
                    <th>Stock</th>
                    <th>Buy Price</th>
                    <th>Buy Date</th>
                    <th>Quantity</th>
                    <th>Sell Price</th>
                    <th>Sell Date</th>
                </tr>
                {backtestSelected.trades &&
                    backtestSelected.trades.map((el, i) => (
                        <tr key={i}>
                            <td className="tab">{el.symbol}</td>
                            <td className="tab">${el.buy_price}</td>
                            <td className="tab">
                                {`${new Date(
                                    el.buy_time
                                ).getFullYear()}-${new Date(
                                    el.buy_time
                                ).getMonth()}-${new Date(
                                    el.buy_time
                                ).getDate()}`}
                            </td>
                            <td className="tab">{el.qty}</td>
                            <td className="tab">{el.sell_price}</td>
                            <td className="tab">
                                {`${new Date(
                                    el.sell_time
                                ).getFullYear()}-${new Date(
                                    el.sell_time
                                ).getMonth()}-${new Date(
                                    el.sell_time
                                ).getDate()}`}
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
    </div>
);

export default BacktestList;
