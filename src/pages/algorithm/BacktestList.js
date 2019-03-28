import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';

const BacktestList = ({ backtests }) => (
  <div className="margins">
    <ul className="nav-tabs nav nav-overflow scroll">
      {backtests.map((backtest, i) => <li className="tab" key={i}> {backtest.backtest.id}</li> )}
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
        {backtests.map((trades, i) =>
          <tr key={i}>
             <td className="tab">
              #{trades.trades.id}
             </td>
             <td className="tab">
              {trades.trades.symbol}
             </td>
             <td className="tab">
              ${trades.trades.buy_price}
             </td>
             <td className="tab">
              {trades.trades.buy_time}
             </td>
             <td className="tab">
              {trades.trades.qty}
             </td>
             <td className="tab">
              {trades.trades.sell_price}
             </td>
             <td className="tab">
              {trades.trades.sell_time}
             </td>
          </tr>
        )}
      </table>
    </div>
  </div>
);

export default BacktestList;
