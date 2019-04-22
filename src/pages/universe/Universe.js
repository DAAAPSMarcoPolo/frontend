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
            currentUniverseId: null,
            error: null,
            addUniverseError: null
        };
        this.getUniverses = this.getUniverses.bind();
        this.setUniverse = this.setUniverse.bind();
        this.changeAddUniverseState = this.changeAddUniverseState.bind();
        this.handleAddUniverse = this.handleAddUniverse.bind();
        this.updateCurrentUniverse = this.updateCurrentUniverse.bind();
    }

    componentDidMount(){
        this.getUniverses();
    }

    getUniverses = async ()=> {
        const response = await api.Get('/universe/');
        console.log(response);
        if (response.status === 200){
            this.setState({universeList: response.data, error:null});
        } else {
            this.setState({error: "Could not retrieve universes"})
            console.log("Could not retrieve universe data");
        }

        if (this.state.currentUniverseId !== null){
            this.updateCurrentUniverse(this.state.currentUniverseId);
        }
    };

    setUniverse = (e, id) =>{
        this.setState({currentUniverseId: id}); //item is expecting an id for the corresponding universe
        this.setState({addingUniverse: false});
        this.updateCurrentUniverse(id);
    };

    updateCurrentUniverse = (id) => {
        console.log("Getting universe:", id);
        if (this.state.universeList === null){
            this.setState({currentUniverse: null});
        }
        this.state.universeList.map((universe) => {
           if (universe.id === id){
               this.setState({currentUniverse: universe});
           }
        });
        return null;
    };

    changeAddUniverseState = () =>{
        this.setState({addingUniverse: !this.state.addingUniverse});
        this.setState({currentUniverse: null});
    };

    handleAddUniverse = async (e) => {
        e.preventDefault();
        e.persist();
        const formdata = {
            "universe": [],
            "name": e.target.universeName.value
        };

        const response = await api.Post("/universe/", formdata);
        console.log(response);
        if (response.status === 201){
            this.changeAddUniverseState();
            this.getUniverses();
            this.setState({currentUniverseId: response.data.id});
            this.updateCurrentUniverse(response.data.id);
            console.log(response);
        } else if (response.status === 409){
            this.setState({addUniverseError: "Cannot create universe with duplicate name"});
            setTimeout(() => { this.setState({error: null}); }, 5000);
        } else {
            this.setState({addUniverseError: "Error creating new universe"});
            setTimeout(() => { this.setState({error: null}); }, 5000);
        }
    };

    render(){
        return (
            <div className="container flex-container con">
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
                    <div className="errorClass">
                        {this.state.error && this.state.error}
                    </div>
                    <UniverseList universeList={this.state.universeList} setUniverse={this.setUniverse} selection={this.state.currentUniverse}/>
                </div>
                <div className="universe-pane">
                    <StockList currentUniverse={this.state.currentUniverse} updateUniverse={this.getUniverses} />
                </div>
                <div className="universe-pane">
                    <AddUniverse enabled={this.state.addingUniverse} handleAddUniverse={this.handleAddUniverse} error={this.state.addUniverseError}/>
                </div>
            </div>
        )
    }
}

export default Universe;
