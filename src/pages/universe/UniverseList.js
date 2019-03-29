import React, { Component } from 'react';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';
import '../../assets/universe.css'

class UniverseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            universeList: null
        };
        this.getUniverses = this.getUniverses.bind();
        this.addStock = this.addStock.bind();
        this.add = this.add.bind();
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

    render(){
        return (
            <div>
                <div className="container">
                    <h2>Universes</h2>
                    <div className="panel-group">
                        {
                            this.state.universeList != null ?
                            (
                                <div className="panel-group">
                                {this.state.universeList.map((item) => (
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href={"#expand" + item.id}>{item.name}</a>
                                            </h4>
                                        </div>
                                        <div id={"expand" + item.id} className="panel-collapse collapse">
                                            <ul className="list-group stock-list">
                                                <li>
                                                    <form onSubmit={event => this.add(event, item)}>
                                                        <input type="text" name="newstockname" placeholder="Add Stock"/>
                                                        <input type="submit"/>
                                                    </form>
                                                </li>
                                                {
                                                    item.stocks.map((stock) => (
                                                        <li className="list-group-item">{stock}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            ):(
                                <div>Loading Universes</div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(UniverseList);
