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
        <div>
          <ul className="nav-tabs nav nav-overflow scroll">
            {backtests.map((backtest, i) => <li className="tab" key={i}> {backtest}</li> )}
          </ul>
          <div className="padding">
            <table className="transaction-table center">
              <tr>
                <th>Transactions</th>
                <th>Stock</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Change</th>
              </tr>
              <tr>
                <td>Transactions</td>
                <td>Stock</td>
                <td>Date</td>
                <td>Amount</td>
                <td>Change</td>
              </tr>
              <tr>
                <td>Transactions</td>
                <td>Stock</td>
                <td>Date</td>
                <td>Amount</td>
                <td>Change</td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
}

export default BacktestList;
