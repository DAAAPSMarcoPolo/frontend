import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../../assets/algo.css';

class Backtest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
              {
                  "transactions": "#2193891823",
                  "date": "2019-02-03T08:15:30-05:00",
                  "stock": "APPL"
              },
              {
                  "transactions": "#2193891823",
                  "date": "2019-02-03T08:15:30-05:00",
                  "stock": "APPL"
              },
              {
                  "transactions": "#3193891823",
                  "date": "2019-02-03T08:15:30-05:00",
                  "stock": "APPL"
              }
            ]
        }
    }
    render() {
        return (
            <div className="">
              <ul className="list">
                {this.state.transactions.map((backtest, i) => <li className="con" key={i}> {backtest.name}</li> )}
              </ul>
            </div>
        )
    }
}

export default Backtest;
