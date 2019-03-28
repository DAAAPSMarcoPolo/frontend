import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';

class BacktestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
              "trades": [
                  {
                      "id": 207,
                      "backtest_id": 16,
                      "symbol": "DGAZ",
                      "buy_time": "2019-03-27T00:18:17.251256Z",
                      "sell_time": "2019-03-27T00:18:17.251316Z",
                      "buy_price": 24.65,
                      "sell_price": 32.15,
                      "qty": 32
                  },
                  {
                      "id": 208,
                      "backtest_id": 16,
                      "symbol": "MSFT",
                      "buy_time": "2019-03-27T00:18:17.398419Z",
                      "sell_time": "2019-03-27T00:18:17.398472Z",
                      "buy_price": 87.66,
                      "sell_price": 88.2,
                      "qty": 88
                  }
              ]
        };
    }
    render() {
      const { backtests } = this.props;
      return (
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
    }
}

export default BacktestList;
