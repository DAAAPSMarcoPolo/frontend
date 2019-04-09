import React, {Component} from 'react';
import Select from 'react-select';
import api from '../../utils/api';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class AddStocks extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: [],
            availableStocks: [],
            currUniverseId: null
        };
        this.getAvailableStocks = this.getAvailableStocks.bind();
        this.populateStockList = this.populateStockList.bind();
    }

    componentDidMount() {
        this.getAvailableStocks();
        this.populateStockList();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.universe.id !== prevProps.universe.id){
            this.setState({selectedOption: []});
            this.populateStockList();
        }
    }

    populateStockList = () => {
        const currStockList = this.props.universe.stocks;
        var currList = [];
        currStockList.map((item) => {
            currList.push({value:item, label:item});
        });
        this.setState({selectedOption: currList});
        this.setState({currUniverse: this.props.universe.id});
    };

    getAvailableStocks = async () => {
        const response = await api.Get("/stocks/");
        if (response.status === 200){
            response.data.stocks.map((item) => {
                var currList = this.state.availableStocks.slice();
                currList.push({value: item.symbol, label: item.symbol});
                this.setState({availableStocks: currList});
            });
        } else {

        }
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption: selectedOption});
    };

    render(){
        if (this.props.enable === false){
            return null;
        } else {
            const selectedOption = this.state.selectedOption;
            return(
                <div className="multiselect">
                    <form onSubmit={(e) => this.props.handleAddStocks(e, this.state.selectedOption)}>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.availableStocks}
                            isMulti="true"
                            name="stocknames"/>
                        <input type="submit"/>
                    </form>
                </div>
            );
        }
    }
}

export default AddStocks;