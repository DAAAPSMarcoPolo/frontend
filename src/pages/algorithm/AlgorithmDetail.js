import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BacktestForm from './BacktestForm';
import BacktestList from './BacktestList';
import BacktestVote from './BacktestVote';
import api from '../../utils/api.js';
import Stats from './Stats';
import '../../assets/algo.css';
import { getFromLocalStorage } from '../../utils/localstorage';

class AlgorithmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            backtestCount: '--',
            showBacktestForm: false,
            strategy: this.props.match.params.algoID,
            universeId: null,
            algo_details: null,
            backtests: null,
            votes: null,
            backtestSelected: null,
            start_date: new Date() /* 2019-3-1 */,
            end_date: new Date(),
            stats: {},
            loading: true
        };
        this.toggleBacktestForm = this.toggleBacktestForm.bind(this);
        this.createBacktest = this.createBacktest.bind(this);
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
        this.handleSelectUniverse = this.handleSelectUniverse.bind(this);
        this.getAlgorithmDetails = this.getAlgorithmDetails.bind(this);
        this.getBacktestList = this.getBacktestList.bind(this);
        this.selectBacktest = this.selectBacktest.bind(this);
    }
    async componentDidMount() {
        Promise.all([this.getBacktestList(), this.getAlgorithmDetails()]).then(
            () => {
                this.setState({ loading: false });
            }
        );
    }
    getBacktestList = async () => {
        const { algoID } = this.props.match.params;
        console.log('algoId', algoID);
        // GET /api/algorithm/
        const res = await api.Get(`/strategybacktests/${algoID}`);
        console.log('getBacktestList', res);
        if (res.status !== 200) {
            this.setState({ error: res.statusText });
        } else if (res.data) {
            this.setState({
                response: true,
                backtestCount: res.data.length,
                backtests: res.data
            });
            console.log('backtests', this.state.backtests);
        }
        if (this.state.backtestCount > 0) {
            this.selectBacktest(0, -1);
        }
        setTimeout(() => {
            this.setState({ error: null });
        }, 5000);
    };
    getAlgorithmDetails = async () => {
        const { algoID } = this.props.match.params;
        const res = await api.Get(`/algorithm/${algoID}`);
        console.log('Algorithm Details', res);
        if (res.status !== 200) {
            this.setState({ error: res.statusText });
        } else if (res.data) {
            this.setState({
                algo_details: res.data.algo_details
            });
        }
        setTimeout(() => {
            this.setState({ error: null });
        }, 5000);
    };
    getBacktestDetail = async () => {
        const response = await api.Get(
            '/backtest/' + this.state.backtestSelected + '/'
        );
        console.log('transform', response);
        this.setState({ transactions: response.data.trades });
        console.log('this.state.transactions', this.state.transactions);
    };

    toggleBacktestForm = () => {
        this.setState({ showBacktestForm: !this.state.showBacktestForm });
    };
    selectBacktest = (i, id) => {
        const backtestSelected = this.state.backtests[i];
        if (
            this.state.backtestSelected &&
            id === this.state.backtestSelected.backtest.id
        ) {
            return;
        }
        const bt = backtestSelected.backtest;
        const start = new Date(bt.start_date);
        const end = new Date(bt.end_date);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const per_gain = (
            ((bt.end_cash - bt.initial_cash) / bt.initial_cash) *
            100
        ).toFixed(2);
        // accounting for weird db storage, add 4 (don't ask me why because I have no clue. but hey, it works)
        const stats = {};
        stats.initial_cash =
            '$ ' +
            this.numberWithCommas(
                backtestSelected.backtest.initial_cash.toFixed(2)
            );
        stats.end_cash =
            '$ ' +
            this.numberWithCommas(
                backtestSelected.backtest.end_cash.toFixed(2)
            );
        stats.sharpe = backtestSelected.backtest.sharpe;
        stats.percent_gain = per_gain === !NaN ? 0 : per_gain;
        stats.num_days = diffDays + 4;
        stats.start_date = `${start.getMonth()}-${start.getDate()}-${start.getFullYear()}`;
        stats.end_date = `${end.getMonth()}-${end.getDate()}-${end.getFullYear()}`;
        this.setState({ backtestSelected, stats });
        return;
    };

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    createBacktest = async e => {
        e.preventDefault();
        e.persist();
        if (!this.state.strategy || !this.state.universeId) {
            this.setState({ error: 'All fields are required!' });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        } else {
            const formData = {
                strategy: this.state.strategy,
                universe: this.state.universeId,
                start_date: e.target.startDate.value,
                end_date: e.target.endDate.value,
                initial_funds: e.target.initial_funds.value
            };
            const res = await api.Post('/backtest/', formData);
            if (res.status !== 200) {
                this.setState({ error: res.statusText });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 5000);
            }
            this.toggleBacktestForm();
        }
    };

    handleStartDateSelect(startDate) {
        this.setState({ startDate });
    }

    handleEndDateSelect(endDate) {
        this.setState({ endDate });
    }
    handleSelectUniverse = async (id, e) => {
        e.persist();
        await this.setState({ universeId: id });
    };
    castVote = async vote => {
        const bt_id = this.state.backtestSelected.backtest.id;
        const formData = {
            vote
        };
        console.log(formData);
        const res = await api.Post(`/backtest/${bt_id}/vote`, formData);
        if (res.status === 200) {
            await this.retrieveVotes();
        } else {
            this.setState({ error: res.statusText });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        }
    };

    retrieveVotes = async () => {
        const bt_id = this.state.backtestSelected.backtest.id;
        const res = await api.Get(`/backtest/${bt_id}/vote`);
        if (res.status !== 200) {
            this.setState({ error: res.statusText });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
            return;
        }
        let { backtests } = this.state;
        let i;
        for (i = 0; i < backtests.length; i++) {
            if (backtests[i].backtest.id === bt_id) {
                break;
            }
        }
        let backtestSelected = this.state.backtestSelected;
        backtestSelected.votes = res.data.votes;
        backtests[i] = backtestSelected;
        console.log(res);
        this.setState({ backtests, backtestSelected });
        console.log(backtests);
        console.log(i);
        console.log(backtestSelected);
    };

    render() {
        const { algoID } = this.props.match.params;
        if (!this.state.loading) {
            return (
                <div className="fullWidth">
                    <div className="title-info">
                        <h3>{this.state.algo_details.name}</h3>
                        <h5>{this.state.backtestCount} Backtests Total</h5>
                        <p>{this.state.algo_details.description}</p>
                        <div className="errorClass">
                            {' '}
                            {this.state.error && this.state.error}
                        </div>
                    </div>
                    {this.state.showBacktestForm ? (
                        <BacktestForm
                            error={this.state.error}
                            submitForm={this.createBacktest}
                            exitForm={this.toggleBacktestForm}
                            parent={this}
                            handleSelectUniverse={this.handleSelectUniverse}
                        />
                    ) : (
                        <button
                            className="maxWidth position-corner greenButton"
                            onClick={this.toggleBacktestForm}
                        >
                            Create new Backtest
                        </button>
                    )}
                    {this.state.backtestSelected && (
                        <BacktestList
                            id={algoID}
                            backtests={this.state.backtests}
                            backtestSelected={this.state.backtestSelected}
                            selectBacktest={this.selectBacktest}
                        />
                    )}
                    {this.state.backtestSelected && (
                        <Stats
                            start={this.state.algo_details.created_at}
                            data={this.state.stats}
                        />
                    )}
                    {this.state.backtestSelected && (
                        <BacktestVote
                            data={this.state.backtestSelected}
                            castVote={this.castVote}
                        />
                    )}
                </div>
            );
        } else {
            return <p className="loading" />;
        }
    }
}

export default AlgorithmDetail;
