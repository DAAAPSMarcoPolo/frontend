import React, {Component} from 'react';
import './../../assets/universe.css';
import plus from "../../assets/images/plus-circle-icon.png";
import AddStocks from "./AddStocks";
import api from "../../utils/api";

class StockList extends Component{
    constructor(props){
        super(props);
        this.state = {
            addingStocks: false,
            additionalStockList: [],
            stocklist: null
        };
        this.modifyStocksSwitch = this.modifyStocksSwitch.bind();
        this.handleModifyingStocks = this.handleModifyingStocks.bind();
    }


    //Controls the addition of stocks
    modifyStocksSwitch = () => {
        this.setState({addingStocks: !this.state.addingStocks});
    };

    handleModifyingStocks = async (e, stocks) =>{
        e.preventDefault();
        e.persist();

        var synthesizedStocks = new Set(this.props.currentUniverse.stocks);
        stocks.map((item) => { synthesizedStocks.add(item) });
        const formdata = { "universe": Array.from(synthesizedStocks.values()) };
        const response = await api.Put("/universe/" + this.props.currentUniverse.id + "/", formdata);

        //Response handling
        if (response.status !== 200){
            console.log("Something went wrong with updating the universe");
        } else {
            this.props.updateUniverse();
            this.setState({addingStocks: false});
        }
    };

    render(){
        if (this.props.currentUniverse == null){
            return null;
        } else {
            return (
                <div className="flex-container">
                    <div className="flex-container stocks">
                        <div className="flex-container">
                            <h2>Stocks:</h2>
                            <div>
                                <img
                                    src={plus}
                                    className="universe-add"
                                    alt="x-icon"
                                    onClick={this.modifyStocksSwitch}/>
                            </div>
                        </div>
                        <ul className="universe-list stock-list">
                            {this.props.currentUniverse.stocks.map((stock, key)=>(
                                <li key={key}>{stock}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <AddStocks enable={this.state.addingStocks} handleModifyStocks={this.handleModifyingStocks} universe={this.props.currentUniverse}/>
                    </div>
                </div>
            )
        }
    }
}

export default StockList;