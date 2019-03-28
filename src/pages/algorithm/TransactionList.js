import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';
import '../../assets/transactionList.css';


class TransactionList extends Component{
    constructor(props){
        super(props);
        this.state ={
            transactions: null,
        };
        this.loadTransactions = this.loadTransactions.bind(this);
    }

    componentDidMount() {
        this.loadTransactions();
    }

    loadTransactions = async ()=> {
        if (this.props.backtestId == null){
            console.log("Please supply a value to 'backtestId' to TransactionList component");
            return;
        }
        const response = await api.Get("/backtest/"+ this.props.backtestId + "/");
        console.log(response);
        this.setState({transactions: response.data.trades});
    };

    render(){
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        if (isAuthenticated === 'false' || !isAuthenticated) {
            return <Redirect to="/login" />;
        }

        if (this.props.backtestId == null){
            return (
                <div>
                    ERROR: No Backtest ID supplied to component
                </div>
            )
        } else if (this.state.transactions == null){
            return (
                <div>
                    Loading Transactions...
                </div>
            )
        } else {
            return (
                <div className="table-responsive transaction-container table-wrapper-scroll-y">
                    <table className="table">
                        <thead className="transaction-head">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">Buy Time</th>
                                <th scope="col">Sell Time</th>
                                <th scope="col">Buy Price</th>
                                <th scope="col">Sell Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="table-wrapper-scroll-y">
                            {
                                this.state.transactions.map((transaction, i)=>{
                                    return(
                                        <tr key={i} className="transaction-row">
                                            <th scope="row">{transaction.id}</th>
                                            <th>{transaction.symbol}</th>
                                            <th>{transaction.buy_time}</th>
                                            <th>{transaction.sell_time}</th>
                                            <th>{transaction.buy_price}</th>
                                            <th>{transaction.sell_price}</th>
                                            <th>{transaction.qty}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            )
        }
    }
}

export default withCookies(TransactionList);