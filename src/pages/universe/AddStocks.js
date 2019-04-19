import React, {Component} from 'react';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react';
import AsyncSelect from 'react-select/lib/Async';
import '../../assets/universe.css';
import api from '../../utils/api';

const sampleStocks = ["AAPL", "BA", "TSLA", "TTWO", "DGAZ", "GDL", "UGAZ"];

class AddStocks extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: sampleStocks,
            availableStocks: [],
            currUniverseId: null,
            value: [],
            error: null
        };
        this.handleSearchChange = this.handleSearchChange.bind();
    }

    handleChange = (e, { searchQuery, value }) => {
        console.log('value', value);
        this.setState({ value });
    };

    handleSearchChange = async (e, { searchQuery }) => {
        this.setState({ searchQuery });
        var currList = [];

        this.state.value.map((item) =>{
            currList.push({key: item, text: item, value: item});
        });

        if (searchQuery.length < 2){
            return;
        } else {
            const response = await api.Get("/stocks/" + searchQuery.toUpperCase());
            if (response.status === 200){
                response.data.stocks.map((item) => {
                    if (!(item.symbol in currList)){
                        currList.push({key: item.symbol, text: item.symbol, value: item.symbol});
                    }
                });
            } else {
                this.setState({error: 'Error retrieving stocks for search'});
                setTimeout(() => { this.setState({error: null}); }, 5000);
            }
        }
        this.setState({availableStocks: currList});
    };

    render(){
        if (this.props.enable === false){
            return null;
        } else {
            const { searchQuery, value, availableStocks } = this.state;
            return(
                <div>
                    <form
                        onSubmit={(e) => {
                            this.setState({value: [], searchQuery: ""});
                            this.props.handleModifyStocks(e, value)
                        }}>
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
                        <input className="submit-button" type="submit"/>
                        <div className="errorClass">
                            {this.state.error && this.state.error}
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default AddStocks;
