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
        this.setAddStocks = this.setAddStocks.bind();
        this.handleAddingStocks = this.handleAddingStocks.bind();
    }

    setAddStocks = () => {
        this.setState({addingStocks: !this.state.addingStocks});
    };

    handleAddingStocks = async (e, stocks) =>{
        e.preventDefault();
        e.persist();
        var synthesizedStockList = [];
        stocks.map((item) =>{
            synthesizedStockList.push(item.value);
        });
        console.log(synthesizedStockList);
        const formdata = {
            "universe": synthesizedStockList,
        };
        console.log(formdata)
        const response = await api.Put("/universe/" + this.props.currentUniverse.id + "/", formdata);
        console.log(response);
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
                                    onClick={this.setAddStocks}/>
                            </div>
                        </div>
                        <ul className="universe-list">
                            {this.props.currentUniverse.stocks.map((stock, key)=>(
                                <li key={key}>{stock}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <AddStocks enable={this.state.addingStocks} handleAddStocks={this.handleAddingStocks} universe={this.props.currentUniverse}/>
                    </div>
                </div>
            )
        }
    }
}

export default StockList;