import React, { Component } from 'react';
import api from '../../utils/api';
import '../../assets/universe.css';
import AddUniverse from './AddUniverse';
import UniverseList from './UniverseList';
import StockList from './StockList';
import plus from '../../assets/images/plus-circle-icon.png';

class Universe extends Component {
    constructor(props){
        super(props);
        this.state = {
            universeList: null,
            addingUniverse: false,
            currentUniverse: null
        };
        this.getUniverses = this.getUniverses.bind();
        this.addStock = this.addStock.bind();
        this.add = this.add.bind();
        this.setUniverse = this.setUniverse.bind();
        this.changeAddUniverseState = this.changeAddUniverseState.bind();
        this.handleAddUniverse = this.handleAddUniverse.bind();
    }

    componentDidMount(){
        this.getUniverses();
    }

    getUniverses = async ()=> {
        //TODO: call API to get the universe list
        const response = await api.Get('/universe/');
        console.log(response);
        if (response.status === 200){
            this.setState({universeList: response.data});
        } else {
            console.log("Could not retrieve universe data");
        }
    };

    addStock = async (e)=> {
        console.log("This.");
    };

    add = async (e, universe) => {
        e.preventDefault();
        e.persist();
        if (e.target.newstockname !== null && e.target.newstockname.value !== ""){
            console.log("Adding stock", e.target.newstockname.value);
            console.log(universe.id);
            console.log(universe);
            let stocks = universe.stocks;
            stocks.unshift(e.target.newstockname.value);
            const formdata = {
                "universe": stocks,
            };
            //console.log("/universe/" + universe.id + "/");
            console.log(formdata)
            const response = await api.Put("/universe/" + universe.id + "/", formdata);
            console.log(response);
        }
    };

    setUniverse = (e, item) =>{
        this.setState({currentUniverse: item});
        this.setState({addingUniverse: false});
        console.log()
    };

    changeAddUniverseState = () =>{
        this.setState({addingUniverse: !this.state.addingUniverse});
        this.setState({currentUniverse: null});
    };

    handleAddUniverse = (e, stockList) => {
        e.preventDefault();
        e.persist();
        console.log("Add function call to create new universe");
        console.log(stockList);
    };

    render(){
        return (
            <div className="flex-container">
                <div className="universe-pane">
                    <div className="flex-container">
                        <h2>Universes</h2>
                        <div>
                            <img
                                src={plus}
                                className="universe-add"
                                alt="x-icon"
                                onClick={this.changeAddUniverseState}/>
                        </div>
                    </div>
                    <UniverseList universeList={this.state.universeList} setUniverse={this.setUniverse} selection={this.state.currentUniverse}/>
                </div>
                <div className="universe-pane">
                    <StockList currentUniverse={this.state.currentUniverse} />
                </div>
                <div className="universe-pane">
                    <AddUniverse enabled={this.state.addingUniverse} handleAddUniverse={this.handleAddUniverse}/>
                </div>
            </div>
        )
    }
}

export default Universe;
