import React, { Component } from 'react';
import api from '../../utils/api';
import '../../assets/universe.css'
import AddStocks from './AddStocks';

class AddUniverse extends Component{
    constructor(props){
        super(props);
        this.state = {
            stockList : []
        };
        this.handleModifyStocks = this.handleModifyStocks.bind();
    }

    handleModifyStocks = (e, value) => {
        e.preventDefault();
        e.persist();
        this.setState({stocklist: value});
        console.log(value);
    };

    render(){
        if (!this.props.enabled){
            return null;
        } else {
            return (
                <div>
                    <form onSubmit={this.props.handleAddUniverse}>
                        <input id="newUniverseName" type="text" name="universeName"/>
                        <input type="submit"/>
                    </form>
                </div>
            )
        }
    }
}

export default AddUniverse;