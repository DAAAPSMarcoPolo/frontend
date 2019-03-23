import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import BacktestForm from './BacktestForm';
import BacktestList from './BacktestList';
import api from '../../utils/api.js';

class AlgorithmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showBacktestForm: false,
            startDate: new Date(),
            endDate: new Date(),
            algo_details: {
                approved: null,
                created_at: '',
                description: '',
                name: '',
                user: null
            }
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

    async componentDidMount() {
        // TODO get algorithm
        const { data } = await api.Get(
            `/algorithms/${this.props.match.params.algoID}`
        );

        this.setState({
            algo_details: data.algo_details,
            bt_list: data.bt_list
        });

        console.log(data);
    }

    render() {
        const { algoID } = this.props.match.params;
        const { algo_details } = this.state;
        return (
            <div>
                <h3>{algo_details.name}</h3>
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
                <BacktestList id={algoID} />
            </div>
        );
    }
}

export default withCookies(AlgorithmDetails);
