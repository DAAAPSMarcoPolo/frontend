import React, { Component } from 'react';
import '../../assets/universe.css'

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
        const error = this.props.error
        if (!this.props.enabled){
            return null;
        } else {
            return (
                <div>
                    <form onSubmit={this.props.handleAddUniverse}>
                        <input id="newUniverseName" type="text" name="universeName"/>
                        <input className="submit-button" type="submit"/>
                        <div>
                            {error && error}
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default AddUniverse;