import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

    render(){
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        let mylist;
        if (this.state.universeList != null){
            mylist = (
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
                                    <li><button>Add a Stock (no functionality ATM)</button></li>
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
            );
        } else {
            mylist = (<div>Loading Universes</div>);
            this.getUniverses();
        }


        return (
            <div>
                <div className="container">
                    <h2>Universes</h2>
                    <div className="panel-group">
                        {mylist}
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(UniverseList);