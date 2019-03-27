import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';

class BacktestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
                {
                    transactions: '#2193891823',
                    date: '2019-02-03T08:15:30-05:00',
                    stock: 'APPL'
                },
                {
                    transactions: '#2193891823',
                    date: '2019-02-03T08:15:30-05:00',
                    stock: 'APPL'
                },
                {
                    transactions: '#3193891823',
                    date: '2019-02-03T08:15:30-05:00',
                    stock: 'APPL'
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
          <table className="con-table">
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
      );
    }
}

export default BacktestList;
