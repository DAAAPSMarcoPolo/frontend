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
    }

    render(){
        if (!this.props.enabled){
            return null;
        } else {
            return (
                <div>
                    <form onSubmit={(e) => this.props.handleAddUniverse(e, this.state.stockList)}>
                        <input type="text" name="universeName"/>
                        <input type="submit"/>
                    </form>
                    <AddStocks enabled={true}/>
                </div>
            )
        }
    }
}

export default AddUniverse;