import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import BacktestForm from './BacktestForm';

class AlgorithmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showBacktestForm: false,
            startDate: new Date(),
            endDate: new Date()
        };
        this.toggleBacktestForm = this.toggleBacktestForm.bind(this);
        this.createBacktest = this.createBacktest.bind(this);
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
    }

    toggleBacktestForm = () => {
        this.setState({ showBacktestForm: !this.state.showBacktestForm });
    };

    createBacktest = () => {
        console.log('form submitted');
    };

    handleStartDateSelect(startDate) {
        this.setState({ startDate });
    }

    handleEndDateSelect(endDate) {
        this.setState({ endDate });
    }
    render() {
        const { algoID } = this.props.match.params;
        return (
            <div>
                <h3>Algorithm {algoID}</h3>
                <h5>2 Backtests in Progress</h5>
                {this.state.showBacktestForm ? (
                    <BacktestForm
                        submitForm={this.createBacktest}
                        exitForm={this.toggleBacktestForm}
                        parent={this}
                    />
                ) : (
                    <button onClick={this.toggleBacktestForm}>
                        Create new Backtest
                    </button>
                )}
            </div>
        );
    }
}

export default withCookies(AlgorithmDetails);
