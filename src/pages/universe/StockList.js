import React, {Component} from 'react';
import './../../assets/universe.css';
import x_icon from "../../assets/images/x-icon.png";
import save_icon from "../../assets/images/save-icon.svg";
import clear_icon from "../../assets/images/clear-icon.svg";
import plus from "../../assets/images/plus-circle-icon.png";
import AddStocks from "./AddStocks";
import api from "../../utils/api";

class StockList extends Component{
    constructor(props){
        super(props);
        this.state = {
            addingStocks: false,
            values: [],
            currentUniverseId: null,
            stocklist: null,
            error: null,
            modifications: false,
            serverResponse:null
        };
        this.modifyStocksSwitch = this.modifyStocksSwitch.bind();
        this.handleModifyingStocks = this.handleModifyingStocks.bind();
        this.handleRemoveStock = this.handleRemoveStock.bind();
        this.handleRemoveValue = this.handleRemoveValue.bind();
        this.handleSave = this.handleSave.bind();
    }

    componentDidMount() {
        if (this.props.currentUniverse != null){
            this.setState({stocklist: this.props.currentUniverse.stocks})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentUniverse != null){
            if (prevProps.currentUniverse == null){
                this.setState({stocklist: this.props.currentUniverse.stocks})
            } else if (prevProps.currentUniverse.id !== this.props.currentUniverse.id) {
                this.setState({stocklist: this.props.currentUniverse.stocks})
            }
        }
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
            this.setState({ error: "Could not update universe" });
            setTimeout(() => { this.setState({error: null}); }, 5000);
            console.log("Something went wrong with updating the universe");
        } else {
            this.props.updateUniverse();
            this.setState({addingStocks: false});
        }
    };

    handleRemoveStock = (e, stock) => {
        e.preventDefault();
        e.persist();
        var synthesizedStocks = new Set(this.state.stocklist);
        synthesizedStocks.delete(stock);
        this.setState({modifications: true, stocklist: Array.from(synthesizedStocks.values())})
    };

    handleSave = async (e) =>{
        var synthesizedStocks = new Set(this.state.stocklist);
        this.state.values.forEach((item) => synthesizedStocks.add(item));
        console.log(synthesizedStocks.values());
        const formdata = { "universe": Array.from(synthesizedStocks.values()) };
        const response = await api.Put("/universe/" + this.props.currentUniverse.id + "/", formdata);

        //Response handling
        if (response.status !== 200){
            this.setState({ error: "Could not update universe" });
            setTimeout(() => { this.setState({error: null}); }, 5000);
            console.log("Something went wrong with updating the universe");
        } else {
            this.setState({modifications: false});
            await this.props.updateUniverse();
            this.setState({stocklist: this.props.currentUniverse.stocks, values:[], addingStocks: false});
            this.setState({ serverResponse: "Saved!" });
            setTimeout(() => { this.setState({serverResponse: null}); }, 3000);
        }
    };

    handleRemoveValue = (e, stock) =>{
        e.preventDefault();
        e.persist();
        var synthesizedStocks = new Set(this.state.values);
        synthesizedStocks.delete(stock);
        this.setState({modifications:true, values: Array.from(synthesizedStocks.values())})
    };

    clearModifications = (e) =>{
        this.setState({modifications: false, stocklist: this.props.currentUniverse.stocks, values:[]})
        this.setState({ serverResponse: "Modifications Cleared" });
        setTimeout(() => { this.setState({serverResponse: null}); }, 3000);
    };

    render(){
        if (this.state.stocklist == null){
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
                                    alt="plus-icon"
                                    onClick={this.modifyStocksSwitch}/>
                            </div>
                            <div>
                                {this.state.error && this.state.error}
                            </div>
                        </div>
                        <div className="flex-container">
                            <img
                                src={save_icon}
                                className="save-icon"
                                alt="save stock modifications"
                                onClick={this.handleSave}
                            />
                            <img
                                src={clear_icon}
                                className="save-icon"
                                alt="clear stock modifications"
                                onClick={this.clearModifications}
                            />
                        </div>
                        <ul className="universe-list stock-list value-list">
                            {this.state.values.map((stock, key)=>(
                                <li key={key}>
                                    <div className="flex-container stock-list value-list">
                                        {stock}
                                        <div>
                                            <img
                                                src={x_icon}
                                                className="stock-remove-button"
                                                alt="x-icon"
                                                onClick={(e) => this.handleRemoveValue(e, stock)}/>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul className="universe-list stock-list">
                            {this.state.stocklist.map((stock, key)=>(
                                <li key={key}>
                                    <div className="flex-container stock-list">
                                        {stock}
                                        <div>
                                            <img
                                                src={x_icon}
                                                className="stock-remove-button"
                                                alt="x-icon"
                                                onClick={(e) => this.handleRemoveStock(e, stock)}/>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="server-response">
                            {this.state.serverResponse && this.state.serverResponse}
                        </div>
                    </div>
                    <div className="add-stocks">
                        <AddStocks
                            enable={this.state.addingStocks}
                            handleModifyStocks={this.handleModifyingStocks}
                            values={this.state.values}
                            updateValues={(values) => {console.log(values); this.setState({values})}}/>
                    </div>
                </div>
            )
        }
    }
}

export default StockList;
