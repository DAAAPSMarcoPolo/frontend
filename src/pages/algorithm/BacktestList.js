import React, {Component} from 'react';
import '../../assets/algo.css';

class BacktestList extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <div className="backtest margins">
                <ul className="nav-tabs nav-overflow scroll-hide">
                    {this.props.backtests &&
                    this.props.backtests.map((backtest, i) => (
                        <li
                            className={`tab select-backtest ${this.props.backtestSelected
                                .backtest.id === backtest.backtest.id && 'active'}`}
                            key={i}
                            onClick={() => this.props.selectBacktest(i, backtest.backtest.id,)}
                        >
                            {' '}
                            <div style={{color: `${this.props.isLive ? '#FA6353' : '#44E8AE'}`, display: 'inline'}}>•&nbsp;</div>{`${new Date(
                            backtest.backtest.created_at
                        ).getFullYear()}-${new Date(
                            backtest.backtest.created_at
                        ).getMonth()+1}-${new Date(
                            backtest.backtest.created_at
                        ).getDate()}`}
                        </li>
                    ))}
                </ul>
                <div className="padding">
                    <table className="transaction-table nav-overflow">
                        <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Buy Price</th>
                            <th>Buy Date</th>
                            <th>Quantity</th>
                            <th>Sell Price</th>
                            <th>Sell Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.backtestSelected.trades &&
                        this.props.backtestSelected.trades.map((el, i) => (
                            <tr key={i}>
                                <td className="tab trans-col">{el.symbol}</td>
                                <td className="tab trans-col">
                                    $ {el.buy_price.toFixed(2)}
                                </td>
                                <td className="tab trans-col">
                                    {`${new Date(
                                        el.buy_time
                                    ).getFullYear()}-${new Date(
                                        el.buy_time
                                    ).getMonth()+1}-${new Date(
                                        el.buy_time
                                    ).getDate()}`}
                                </td>
                                <td className="tab trans-col">{el.qty}</td>
                                <td className="tab trans-col">
                                    $ {el.sell_price.toFixed(2)}
                                </td>
                                <td className="tab trans-col">
                                    {`${new Date(
                                        el.sell_time
                                    ).getFullYear()}-${new Date(
                                        el.sell_time
                                    ).getMonth()+1}-${new Date(
                                        el.sell_time
                                    ).getDate()}`}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
/*const BacktestList = ({ backtests, backtestSelected, selectBacktest, isLive }) => (
    <div className="backtest margins">
        <ul className="nav-tabs nav-overflow scroll-hide">
            {backtests &&
                backtests.map((backtest, i) => (
                    <li
                        className={`tab select-backtest ${backtestSelected
                            .backtest.id === backtest.backtest.id && 'active'}`}
                        key={i}
                        onClick={() => selectBacktest(i, backtest.backtest.id,)}
                    >
                        {' '}
                        <div style={{color: `${isLive ? '#FA6353' : '#44E8AE'}`, display: 'inline'}}>•&nbsp;</div>{`${new Date(
                                    backtest.backtest.created_at
                                ).getFullYear()}-${new Date(
                                    backtest.backtest.created_at
                                ).getMonth()+1}-${new Date(
                                    backtest.backtest.created_at
                                ).getDate()}`}
                    </li>
                ))}
        </ul>
        <div className="padding">
            <table className="transaction-table nav-overflow">
              <thead>
                  <tr>
                      <th>Stock</th>
                      <th>Buy Price</th>
                      <th>Buy Date</th>
                      <th>Quantity</th>
                      <th>Sell Price</th>
                      <th>Sell Date</th>
                  </tr>
                </thead>
                <tbody>
                {backtestSelected.trades &&
                    backtestSelected.trades.map((el, i) => (
                        <tr key={i}>
                            <td className="tab trans-col">{el.symbol}</td>
                            <td className="tab trans-col">
                                $ {el.buy_price.toFixed(2)}
                            </td>
                            <td className="tab trans-col">
                                {`${new Date(
                                    el.buy_time
                                ).getFullYear()}-${new Date(
                                    el.buy_time
                                ).getMonth()+1}-${new Date(
                                    el.buy_time
                                ).getDate()}`}
                            </td>
                            <td className="tab trans-col">{el.qty}</td>
                            <td className="tab trans-col">
                                $ {el.sell_price.toFixed(2)}
                            </td>
                            <td className="tab trans-col">
                                {`${new Date(
                                    el.sell_time
                                ).getFullYear()}-${new Date(
                                    el.sell_time
                                ).getMonth()+1}-${new Date(
                                    el.sell_time
                                ).getDate()}`}
                            </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    </div>
);*/

export default BacktestList;
