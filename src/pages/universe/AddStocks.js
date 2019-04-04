import React, {Component} from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class AddStocks extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: null
        }
    }

    componentDidMount() {
        console.log("Populate the list of options");
    }

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
                    <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    isMulti="true"/>
                </div>
            );
        }
    }
}

export default AddStocks;