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
    ComponentDidMount() {
        // pull list of algorithms
    }
    render() {
        return (
            <div>
                <h5>(backtest) TODO:</h5>
                <ul>
                    <li>retrieve list of backtest ids/names</li>
                    <li>
                        for each item in list, create BacktestDetails object
                        (and tab)
                    </li>
                </ul>
            </div>
        );
    }
}

export default BacktestList;
