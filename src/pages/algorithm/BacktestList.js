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

const BacktestList = ({ backtests, selectTab, backtestSelected, transactions }) => (
  <div className="backtest margins">
    <ul className="nav-tabs nav nav-overflow scroll">
      {backtests.map((backtest, i) => <li className={`tab select-backtest ${backtestSelected === backtest.backtest.id && 'active'}`} key={i} onClick={(e) => selectTab(backtest.backtest.id, e)}> {backtest.backtest.id}</li> )}
    </ul>
    <div className="transaction_table">
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
        {transactions && transactions.map((transactions, i) =>
          <tr key={i}>
             <td className="tab">
              #{transactions.id}
             </td>
             <td className="tab">
              {transactions.symbol}
             </td>
             <td className="tab">
              ${transactions.buy_price}
             </td>
             <td className="tab">
              {transactions.buy_time}
             </td>
             <td className="tab">
              {transactions.qty}
             </td>
             <td className="tab">
              {transactions.sell_price}
             </td>
             <td className="tab">
              {transactions.sell_time}
             </td>
          </tr>
        )}
      </table>
    </div>
);

export default BacktestList;
