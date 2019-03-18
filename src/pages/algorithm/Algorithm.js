import React, { Component } from 'react';
import Algo from '../components/Algo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import api from '../../utils/api';
import {
    saveToLocalStorage,
    deleteFromLocalStorage
} from '../../utils/localstorage';
import { getAttributesFromEvent } from '../../utils/forms';

class Algorithm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            startDate: new Date(),
            endDate: new Date()
        };
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
    }

    handleStartDateSelect(startDate) {
        this.setState({ startDate });
    }

    handleEndDateSelect(endDate) {
        this.setState({ endDate });
    }

    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        return (
            <div>
                <h3>Algorithms</h3>
                <Algo data={{ a: 'Created 100 days ago' }} />
                <div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateSelect}
                        maxDate={new Date()}
                    />
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateSelect}
                        maxDate={new Date()}
                    />
                </div>
                <h5>TODO:</h5>
                <ul>
                    <li>GET</li>
                    <ul>
                        <li>
                            list all algorithms (and display stats for each one)
                        </li>
                        <ul>
                            <li>how many backtests</li>
                            <li>best backtest</li>
                            <li>how well the best backtest performed</li>
                        </ul>
                        <li>filter algos</li>
                        <ul>
                            <li>by user</li>
                            <li>by live/not live</li>
                        </ul>
                        <li>sort algos</li>
                        <ul>
                            <li>by user</li>
                            <li>by date uploaded</li>
                            <li>by number of backtests</li>
                            <li>by best performing algo performance</li>
                        </ul>
                    </ul>
                </ul>
            </div>
        );
    }
}

export default withCookies(Algorithm);
