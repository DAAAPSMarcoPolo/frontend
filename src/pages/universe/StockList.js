import React, {Component} from 'react';
import './../../assets/universe.css';
import plus from "../../assets/images/plus-circle-icon.png";
import AddStocks from "./AddStocks";

class StockList extends Component{
    constructor(props){
        super(props);
        this.state = {
            addingStocks: false,
            additionalStockList: []
        };
        this.setAddStocks = this.setAddStocks.bind();
        this.handleAddingStocks = this.handleAddingStocks.bind();
    }

    setAddStocks = () => {
        this.setState({addingStocks: !this.state.addingStocks});
        console.log("Modifying State", this.state.addingStocks);
    };

    handleAddingStocks = async (e) =>{
        console.log(e);
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
                        <AddStocks enable={this.state.addingStocks} handleAddStocks={this.handleAddingStocks}/>
                    </div>
                </div>
            )
        }
    }
}

export default StockList;