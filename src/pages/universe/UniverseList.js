import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';
import '../../assets/universe.css'

class UniverseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            universeList: null,
            mockUniverseList : [
                "Universe 1",
                "Universe 2",
                "Universe 3",
                "Universe 4"
            ]
        };
        this.getUniverses = this.getUniverses.bind();
    }

    mockUniverseList = [
        {
            "id": 29,
            "name": "test universe",
            "updated": "2019-03-18T02:19:35.252054Z",
            "user": 5,
            "stocks": [
                "AAPL",
                "UGAZ"
            ]
        },
        {
            "id": 30,
            "name": "test universe",
            "updated": "2019-03-18T02:20:16.724334Z",
            "user": 5,
            "stocks": [
                "UGAZ",
                "AAPL"
            ]
        },
        {
            "id": 31,
            "name": "test universe",
            "updated": "2019-03-18T02:29:00.792914Z",
            "user": 5,
            "stocks": [
                "DGAZ",
                "UGAZ",
                "AAPL"
            ]
        },
        {
            "id": 32,
            "name": "test universe",
            "updated": "2019-03-18T02:29:31.593230Z",
            "user": 5,
            "stocks": [
                "AAPL",
                "MAXR",
                "UGAZ"
            ]
        },
        {
            "id": 43,
            "name": "S&P500",
            "updated": "2019-03-23T17:34:26.043504Z",
            "user": 5,
            "stocks": []
        },
        {
            "id": 44,
            "name": "S&P500",
            "updated": "2019-03-23T17:59:49.839061Z",
            "user": 5,
            "stocks": [
                "AAPL",
                "MMM"
            ]
        }
    ];


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
            mylist = (<div>Loading Stock List</div>);
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