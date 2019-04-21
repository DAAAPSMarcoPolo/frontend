import React, {Component} from 'react';
import '../../assets/algo.css';
import {ReactComponent as SortIcon} from "../../assets/images/sort-icon.svg";

const sortingIcon = (metric, currMetric, status) => {
    if (metric === currMetric){
        switch(status){
        case "descending":
            return (
                <SortIcon className="sort-icon" width="1em" fill="#3ecc9a"/>
            );
        case "ascending":
            return (
                <SortIcon className="sort-icon" width="1em" fill="#3ecc9a" transform="rotate(180)"/>
            );
        case null:
            return (
                null
            );
        }
    } else {
        return null;
    }
};

class BacktestList extends Component {
    constructor(props){
        super(props);
        this.state = {
            tradeSortMetric: null,
            tradeSortStatus: null,
            sortedTrades: null
        };
        this.selectTradeSortMetric = this.selectTradeSortMetric.bind();
        this.sortTrades = this.sortTrades.bind();
    }

    componentDidMount() {
        this.setState({
            sortedTrades: Array.from(this.props.backtestSelected.trades),
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.backtestSelected !== null){
            if (prevProps.backtestSelected.backtest.id !== this.props.backtestSelected.backtest.id){
                this.setState({sortedTrades: Array.from(this.props.backtestSelected.trades)})
            }
        } else if (this.props.backtestSelected !== null) {
            this.setState({sortedTrades: Array.from(this.props.backtestSelected.trades)})
        }
    }

    selectTradeSortMetric = (e, metric) => {
        let status;
        if (this.state.tradeSortMetric === metric){
            switch(this.state.tradeSortStatus){
                case null:
                    this.setState({tradeSortStatus:'descending'});
                    status = "descending";
                    break;
                case 'descending':
                    this.setState({tradeSortStatus:'ascending'});
                    status = "ascending";
                    break;
                case 'ascending':
                    this.setState({tradeSortStatus:null});
                    status = null;
                    break;
            }
        } else {
            this.setState({tradeSortMetric: metric, tradeSortStatus:'descending'});
            status = "descending";
        }
        this.sortTrades(metric, status);
    };

    sortTrades = (metric, status) =>{
        let trades = this.state.sortedTrades;
        if (status == null){
            this.setState({sortedTrades: Array.from(this.props.backtestSelected.trades)});
            return;
        }
        let sortFunction;
        switch(metric){
            case'symbol':
                sortFunction = (first, second) =>{
                    if (status === "descending") {
                        return first.symbol.localeCompare(second.symbol) * -1;
                    } else if (status === "ascending"){
                        return first.symbol.localeCompare(second.symbol);
                    } else {
                        return 0;
                    }
                };
                break;
            case'buy_price':
                sortFunction = (first, second) =>{
                    if (status === "descending") {
                        return (first.buy_price - second.buy_price) * -1;
                    } else if (status === "ascending"){
                        return first.buy_price - second.buy_price;
                    } else {
                        return 0;
                    }
                };
                break;
            case'buy_time':
                sortFunction = (first, second) =>{
                    let dayFirst = new Date(first.buy_time);
                    let daySecond = new Date(second.buy_time);
                    if (status === "descending") {
                        return (dayFirst - daySecond) * -1;
                    } else if (status === "ascending"){
                        return dayFirst - daySecond;
                    } else {
                        return 0;
                    }
                };
                break;
            case'qty':
                sortFunction = (first, second) =>{
                    if (status === "descending") {
                        return (first.qty - second.qty) * -1;
                    } else if (status === "ascending"){
                        return (first.qty - second.qty);
                    } else {
                        return 0;
                    }
                };
                break;
            case'sell_price':
                sortFunction = (first, second) =>{
                    if (status === "descending") {
                        return (first.sell_price - second.sell_price) * -1;
                    } else if (status === "ascending"){
                        return (first.sell_price - second.sell_price);
                    } else {
                        return 0;
                    }
                };
                break;
            case'sell_time':
                sortFunction = (first, second) =>{
                    let dayFirst = new Date(first.sell_time);
                    let daySecond = new Date(second.sell_time);
                    if (status === "descending") {
                        return (dayFirst - daySecond) * -1;
                    } else if (status === "ascending"){
                        return dayFirst - daySecond;
                    } else {
                        return 0;
                    }
                };
                break;
        }
        trades.sort(sortFunction);
        this.setState({sortedTrades: trades});
    };

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
                            <th onClick={(e) => this.selectTradeSortMetric(e, "symbol")}>Stock{sortingIcon("symbol", this.state.tradeSortMetric, this.state.tradeSortStatus)}</th>
                            <th onClick={(e) => this.selectTradeSortMetric(e, "buy_price")}>Buy Price{sortingIcon("buy_price", this.state.tradeSortMetric, this.state.tradeSortStatus)}</th>
                            <th onClick={(e) => this.selectTradeSortMetric(e, "buy_time")}>Buy Date{sortingIcon("buy_time", this.state.tradeSortMetric, this.state.tradeSortStatus)}</th>
                            <th onClick={(e) => this.selectTradeSortMetric(e, "qty")}>Quantity{sortingIcon("qty", this.state.tradeSortMetric, this.state.tradeSortStatus)}</th>
                            <th onClick={(e) => this.selectTradeSortMetric(e, "sell_price")}>Sell Price{sortingIcon("sell_price", this.state.tradeSortMetric, this.state.tradeSortStatus)}</th>
                            <th onClick={(e) => this.selectTradeSortMetric(e, "sell_time")}>Sell Date{sortingIcon("sell_time", this.state.tradeSortMetric, this.state.tradeSortStatus)}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.sortedTrades &&
                        this.state.sortedTrades.map((el, i) => (
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
