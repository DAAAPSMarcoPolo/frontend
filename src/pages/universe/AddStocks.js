import React, {Component} from 'react';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react';
import AsyncSelect from 'react-select/lib/Async';
import api from '../../utils/api';

const sampleStocks = ["AAPL", "BA", "TSLA", "TTWO", "DGAZ", "GDL", "UGAZ"];

class AddStocks extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: sampleStocks,
            availableStocks: [],
            currUniverseId: null,
            value: []
        };
        this.handleSearchChange = this.handleSearchChange.bind();
    }

    //Sets the state of the selected values
    handleChange = (e, { searchQuery, value }) => {
        this.setState({searchQuery: "", value});
    };

    handleSearchChange = async (e, { searchQuery }) => {
        this.setState({ searchQuery });

        //Populate values with selected options (necessary for proper functionality)
        var currList = [];
        this.state.value.map((item) =>{
            currList.push({key: item, text: item, value: item});
        });

        if (searchQuery.length < 2){
            //Must have a minimum 2 letter search query
            this.setState({availableStocks: currList});
            return;
        } else {
            //Populate options with remaining query options if query is valid
            const response = await api.Get("/stocks/" + searchQuery);
            if (response.status === 200){
                response.data.stocks.map((item) => {
                    if (!(item.symbol in currList)){
                        currList.push({key: item.symbol, text: item.symbol, value: item.symbol});
                    }
                });
            }
            this.setState({availableStocks: currList});
        }
    };

    render(){
        if (this.props.enable === false){
            return null;
        } else {
            const { searchQuery, value, availableStocks } = this.state;
            return(
                <div>
                    <form onSubmit={(e) => {this.setState({value: [], searchQuery: ""}); this.props.handleModifyStocks(e, value)}}>
                        <Dropdown
                            fluid
                            multiple
                            onChange={this.handleChange}
                            onSearchChange={this.handleSearchChange}
                            options={availableStocks}
                            search
                            searchQuery={searchQuery}
                            selection
                            value={value}
                        />
                        <input type="submit"/>
                    </form>
                </div>
            );
        }
    }
}

export default AddStocks;