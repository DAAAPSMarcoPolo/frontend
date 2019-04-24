import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BacktestForm from './BacktestForm';
import BacktestList from './BacktestList';
import BacktestGraph from './BacktestGraph';
import LiveInstanceList from './LiveInstanceList';
import LiveInstanceForm from './LiveInstanceForm';
import CancelLiveInstanceForm from './CancelLiveInstanceForm';
import BacktestVote from './BacktestVote';
import SortingButtons from './SortingButtons';
import BacktestFilters from './BacktestFilters';
import api from '../../utils/api.js';
import Stats from './Stats';
import LiveStats from './LiveStats';
import BacktestUniverse from './BacktestUniverse';
import '../../assets/algo.css';
import { getFromLocalStorage } from '../../utils/localstorage';
import queryString from 'query-string';

class AlgorithmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            backtestCount: '--',
            liveInstanceCount: '--',
            showBacktestForm: false,
            showLiveInstanceForm: false,
            strategy: this.props.match.params.algoID,
            universeId: null,
            algo_details: null,
            backtests: null,
            votes: null,
            backtestSelected: null,
            liveInstances: null,
            liveInstanceSelected: null,
            start_date: new Date() /* 2019-3-1 */,
            end_date: new Date(),
            stats: {
                initial_cash: '$500',
                end_cash: '--',
                num_days: 4,
                start_date: '4/9/2019',
                end_data: '--',
                percent_gain: '76%',
                backtestHistoryMode: true
            },
            loading: true,
            isLive: false,
            backtestSortMetric: 'date',
            filteredBacktests: null,
            filters: {
                vote_pending: false,
                vote_approved: false,
                vote_denied: false,
                user: false
            },
            noBacktests: false,
            funds: 0
        };
        this.toggleBacktestForm = this.toggleBacktestForm.bind(this);
        this.toggleLiveInstanceForm = this.toggleLiveInstanceForm.bind(this);
        this.createBacktest = this.createBacktest.bind(this);
        this.createLiveInstance = this.createLiveInstance.bind(this);
        this.stopLiveInstance = this.stopLiveInstance.bind(this);
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
        this.handleSelectUniverse = this.handleSelectUniverse.bind(this);
        this.getAlgorithmDetails = this.getAlgorithmDetails.bind(this);
        this.getBacktestList = this.getBacktestList.bind(this);
        this.getLiveInstanceList = this.getLiveInstanceList.bind(this);
        this.geAvailableFunds = this.geAvailableFunds.bind(this);
        this.selectBacktest = this.selectBacktest.bind(this);
        this.selectLiveInstance = this.selectLiveInstance.bind(this);
        this.toggleLive = this.toggleLive.bind(this);
        this.toggleBacktestmode = this.toggleBacktestmode.bind(this);
        this.selectSortMetric = this.selectSortMetric.bind(this);
        this.sortBacktests = this.sortBacktests.bind(this);
        this.filterBacktests = this.filterBacktests.bind(this);
    }

    async componentDidMount() {
        Promise.all([
            this.getBacktestList(),
            this.getLiveInstanceList(),
            this.getAlgorithmDetails(),
            this.geAvailableFunds()
        ]).then(() => {
            this.setState({
                loading: false,
                filteredBacktests: Array.from(this.state.backtests)
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevState.backtestSortMetric !== this.state.backtestSortMetric ||
            this.state.performSort
        ) {
            this.sortBacktests();
        }
        if (
            prevState.filters.vote !== this.state.filters.vote ||
            prevState.filters.user !== this.state.filters.user ||
            this.state.performFilter
        ) {
            this.filterBacktests();
        }
    }

    getBacktestList = async () => {
        const { algoID } = this.props.match.params;
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
        const queryParams = queryString.parse(this.props.location.search);
        let key = null;
        if (queryParams.backtest) {
            key = this.findBacktestKey(parseInt(queryParams.backtest));
        }
        if (this.state.backtestCount > 0 && key !== null) {
            this.selectBacktest(key, queryParams.backtest);
        } else if (this.state.backtestCount > 0) {
            this.selectBacktest(0, -1);
        }
        setTimeout(() => {
            this.setState({ error: null });
        }, 5000);
    };

    getAlgorithmDetails = async () => {
        const res = await api.Get(`/algorithm/${this.state.strategy}`);
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

    getLiveInstanceList = async () => {
        // GET /api/live/<strategy_id>
        console.log('this.state.strategy')
        const res = await api.Get(`/strategyliveinstances/${this.state.strategy}/`);
        console.log('getLiveInstanceList', res);
        if (res.status !== 200) {
            this.setState({ error: res.statusText });
        } else if (res.data) {
            this.setState({
                response: true,
                liveInstanceCount: res.data.length,
                liveInstances: res.data
            });
            console.log('liveInstances', this.state.liveInstances);
        }
        const queryParams = queryString.parse(this.props.location.search);
        let key = null;
        if (queryParams.liveinstance) {
            key = this.findLiveInstanceKey(parseInt(queryParams.liveinstance));
        }
        console.log('key: ' + key);
        if (this.state.liveInstanceCount > 0 && key !== null) {
            this.selectLiveInstance(key, queryParams.liveinstance);
            this.setState({ isLive: true });
        }
        if (this.state.liveInstanceCount > 0) {
            this.selectLiveInstance(0, -1);
        }
        setTimeout(() => {
            this.setState({ error: null });
        }, 5000);
    };
    geAvailableFunds = async () => {
        const res = await api.Get('/buyingpower');
        if (res.status !== 200) {
            setTimeout(() => {
                this.setState({ error: res.statusText });
            }, 5000);
        } else if (res.data.value) {
            this.setState({
                funds: res.data.value
            });
        }
        setTimeout(() => {
            this.setState({ error: null });
        }, 5000);
    };
    toggleBacktestForm = () => {
        this.setState({ showBacktestForm: !this.state.showBacktestForm });
    };

    toggleLiveInstanceForm = () => {
        this.setState({
            showLiveInstanceForm: !this.state.showLiveInstanceForm
        });
    };

    toggleLive = () => {
        this.setState({ isLive: !this.state.isLive });
        if (this.state.algo_details.live) {
            this.setState({ isLive: !this.state.isLive });
        } else {
            this.setState({
                error:
                    'No live instances yet, Create a new live instance from a backtest!'
            });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        }
    };

    selectLiveInstance = (i, id) => {
        const liveInstanceSelected = this.state.liveInstances[i];
        if (
            this.state.liveInstanceSelected &&
            id === this.state.liveInstanceSelected.live_instance.id
        ) {
            return;
        }
        /*
        const li = liveInstanceSelected.live_instance;

        const start = new Date(li.start_date);
        const end = new Date(li.end_date);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const per_gain = (
            ((li.end_cash - li.initial_cash) / li.initial_cash) *
            100
        ).toFixed(2);
        // accounting for weird db storage, add 4 (don't ask me why because I have no clue. but hey, it works)

        const stats = {};
        stats.initial_cash =
            '$ ' +
            this.numberWithCommas(
                liveInstanceSelected.live_instance.initial_cash.toFixed(2)
            );
        stats.end_cash =
            '$ ' +
            this.numberWithCommas(
                liveInstanceSelected.live_instance.end_cash.toFixed(2)
            );
        stats.percent_gain = per_gain === !NaN ? 0 : per_gain;
        stats.num_days = diffDays + 4;
        stats.start_date = `${start.getMonth()}-${start.getDate()}-${start.getFullYear()}`;
        stats.end_date = `${end.getMonth()}-${end.getDate()}-${end.getFullYear()}`;
        */
        this.setState({ liveInstanceSelected });
        console.log('liveInstanceSelected', liveInstanceSelected);
        return;
    };

    toggleBacktestmode = () => {
        this.setState({
            stats: {
                ...this.state.stats,
                backtestHistoryMode: !this.state.stats.backtestHistoryMode
            }
        });
    };

    findBacktestKey = id => {
        let i;
        for (i = 0; i < this.state.backtests.length; i++) {
            if (this.state.backtests[i].backtest.id === id) {
                return i;
            }
        }
    };

    findLiveInstanceKey = id => {
        let i;
        for (i = 0; i < this.state.liveInstances.length; i++) {
            if (this.state.liveInstances[i].live_instance.id === id) {
                return i;
            }
        }
    };

    selectBacktest = (i, id) => {
        let backtestSelected = null;
        this.state.backtests.map((item, i) => {
            if (item.backtest.id === id) {
                backtestSelected = item;
            }
        });

        if (backtestSelected === null) {
            backtestSelected = this.state.backtests[0];
        }

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
        stats.start_date = `${start.getMonth() +
            1}-${start.getDate()}-${start.getFullYear()}`;
        stats.end_date = `${end.getMonth() +
            1}-${end.getDate()}-${end.getFullYear()}`;
        stats.backtestHistoryMode = this.state.stats.backtestHistoryMode;
        //console.log(backtestSelected);
        stats.universe = backtestSelected.backtest.universe;
        this.setState({ backtestSelected, stats });
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
            this.getBacktestList();
        }
    };

    createLiveInstance = async e => {
        e.preventDefault();
        e.persist();
        // create live instance
        //Post /api/live/
        if (!this.state.strategy || !this.state.backtestSelected) {
            this.setState({ error: 'All fields are required!' });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        } else {
            const formData = {
                mode: 'start',
                backtest: this.state.backtestSelected.backtest.id,
                funds: e.target.initial_funds.value
            };
            const res = await api.Post('/live/', formData);
            if (res.status !== 200) {
                this.setState({ error: res.statusText, isLive: true });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 5000);
            }
            this.toggleLiveInstanceForm();
            this.getLiveInstanceList();
        }
    };

    stopLiveInstance = async e => {
        e.preventDefault();
        e.persist();
        // create live instance
        //Post /api/live/
        if (!this.state.strategy || !this.state.liveInstanceSelected) {
            this.setState({ error: 'All fields are required!' });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        } else {
            const formData = {
                mode: 'stop',
                id: this.state.liveInstanceSelected.live_instance.id
            };
            const res = await api.Post('/live/', formData);
            if (res.status !== 200) {
                this.setState({ error: res.statusText });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 5000);
            }
            console.log('cancel live instance', res);
            this.toggleLiveInstanceForm();
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

    selectSortMetric = (e, metric) => {
        e.preventDefault();
        e.persist();
        this.setState({ backtestSortMetric: metric });
    };

    selectFilter = (e, filter) => {
        e.preventDefault();
        e.persist();
        let filters = this.state.filters;
        switch (filter) {
            case 'vote_pending':
                filters.vote_pending = !filters.vote_pending;
                filters.vote_approved = false;
                filters.vote_denied = false;
                break;
            case 'vote_approved':
                filters.vote_approved = !filters.vote_approved;
                filters.vote_pending = false;
                filters.vote_denied = false;
                break;
            case 'vote_denied':
                filters.vote_denied = !filters.vote_denied;
                filters.vote_pending = false;
                filters.vote_approved = false;
                break;
            case 'user':
                filters.user = !filters.user;
                break;
        }
        this.setState({ filters, performFilter: true });
    };

    sortBacktests = () => {
        console.log('Sorting');
        let sortFunction;
        switch (this.state.backtestSortMetric) {
            case null:
                sortFunction = (a, b) => {
                    let dayA = new Date(a.backtest.created_at);
                    let dayB = new Date(b.backtest.created_at);
                    return (dayA - dayB) * -1;
                };
                break;
            case 'sharpe':
                sortFunction = (a, b) => {
                    return (a.backtest.sharpe - b.backtest.sharpe) * -1;
                };
                break;
            case 'date':
                sortFunction = (a, b) => {
                    let dayA = new Date(a.backtest.created_at);
                    let dayB = new Date(b.backtest.created_at);
                    return (dayA - dayB) * -1;
                };
                break;
            case 'gain':
                sortFunction = (a, b) => {
                    return (a.backtest.pct_gain - b.backtest.pct_gain) * -1;
                };
                break;
        }
        let sortedBacktests = this.state.filteredBacktests;
        if (sortedBacktests.length < 1) {
            this.setState({ noBacktests: true, performSort: false });
            console.log('Figure out how to show no backtests');
        } else {
            sortedBacktests.sort(sortFunction);
            this.setState({
                filteredBacktests: sortedBacktests,
                noBacktests: false,
                performSort: false
            });
            this.selectBacktest(0, sortedBacktests[0].backtest.id);
        }
    };

    filterBacktests = () => {
        console.log('Filtering');
        const filters = this.state.filters;
        let currentSet = this.state.backtests.map((item, key) => {
            if (filters.vote_pending) {
                if (item.backtest.vote_status === '') {
                    return item;
                } else {
                    return;
                }
            } else {
                return item;
            }
        });
        currentSet = currentSet.map((item, key) => {
            if (filters.vote_approved) {
                if (item.backtest.vote_status === 'approved') {
                    return item;
                } else {
                    return;
                }
            } else {
                return item;
            }
        });
        currentSet = currentSet.map((item, key) => {
            if (filters.vote_denied) {
                if (item.backtest.vote_status === 'denied') {
                    return item;
                } else {
                    return;
                }
            } else {
                return item;
            }
        });
        currentSet = currentSet.map((item, key) => {
            if (filters.user) {
                if (
                    item != null &&
                    item.backtest.user === getFromLocalStorage('user').id
                ) {
                    return item;
                } else {
                    return;
                }
            } else {
                return item;
            }
        });
        let filteredSet = [];
        currentSet.map((item, key) => {
            if (item != null) {
                filteredSet.push(item);
            }
        });
        console.log(filteredSet);
        this.setState({
            filteredBacktests: filteredSet,
            performSort: true,
            performFilter: false
        });
    };

    render() {
        const { algoID } = this.props.match.params;
        if (!this.state.loading) {
            return (
                <div className="fullWidth">
                    <div className="title-info">
                        <h3>{this.state.algo_details.name}</h3>
                            <h5>
                              {this.state.backtestCount} Backtests Total | {this.state.liveInstanceCount} Livetests Total
                            </h5>
                        <p>{this.state.algo_details.description}</p>
                        <div className="nav isLiveNav">
                            <p
                                onClick={this.toggleLive}
                                className={`${!this.state.isLive &&
                                    'toggleLive'} click`}
                            >
                                Backtest
                            </p>
                            <p
                                onClick={this.toggleLive}
                                className={`${this.state.isLive &&
                                    'toggleLive'} marginLeft click`}
                            >
                                Live
                            </p>
                        </div>
                    </div>
                    {!this.state.isLive && this.state.showBacktestForm ? (
                        <BacktestForm
                            error={this.state.error}
                            submitForm={this.createBacktest}
                            parent={this}
                            handleSelectUniverse={this.handleSelectUniverse}
                            showModal={this.state.showBacktestForm}
                            toggleState={this.toggleBacktestForm}
                            name="Backtest"
                        />
                    ) : (
                        <button
                            className="maxWidth position-corner greenButton marginLeft"
                            onClick={this.toggleBacktestForm}
                        >
                            New Backtest
                        </button>
                    )}
                    {this.state.showLiveInstanceForm ? (
                        <LiveInstanceForm
                            error={this.state.error}
                            submitForm={this.createLiveInstance}
                            parent={this}
                            showModal={this.state.showLiveInstanceForm}
                            toggleState={this.toggleLiveInstanceForm}
                            name="Live Instance"
                            funds={this.state.funds}
                        />
                    ) : (
                        <button
                            className="maxWidth position-corner greenButton"
                            onClick={this.toggleLiveInstanceForm}
                        >
                            {!this.state.isLive
                              ? 'New Live Instance'
                              : 'Cancel Live Instance'}
                        </button>
                    )}
                    {this.state.isLive && this.state.showLiveInstanceForm ? (
                        <CancelLiveInstanceForm
                            error={this.state.error}
                            submitForm={this.stopLiveInstance}
                            parent={this}
                            showModal={this.state.showLiveInstanceForm}
                            toggleState={this.toggleLiveInstanceForm}
                            name="Cancel Live Instance"
                            id={
                                this.state.liveInstanceSelected.live_instance.id
                            }
                        />
                    ) : null}
                    <div className="errorClass">
                        {' '}
                        {this.state.error && this.state.error ? (
                            <div class="alert">{this.state.error}</div>
                        ) : null}
                    </div>
                    {!this.state.isLive && this.state.backtestSelected && (
                        <div>

                            {this.state.noBacktests ? (
                                <h2>No Backtests to show</h2>
                            ) : (
                                <div>
                                    {!this.state.stats.backtestHistoryMode ? (
                                        <div>
                                            <SortingButtons
                                                updateMetric={this.selectSortMetric}
                                                currentMetric={this.state.backtestSortMetric}
                                            />
                                            <BacktestFilters
                                                updateFilter={this.selectFilter}
                                                currentFilters={this.state.filters}
                                            />
                                            <BacktestList
                                                id={algoID}
                                                backtests={
                                                    this.state.filteredBacktests
                                                }
                                                backtestSelected={
                                                    this.state.backtestSelected
                                                }
                                                selectBacktest={
                                                    this.selectBacktest
                                                }
                                                isLive={false}
                                            />
                                        </div>
                                    ) : (
                                        <BacktestGraph
                                            id={algoID}
                                            backtests={
                                                this.state.filteredBacktests
                                            }
                                            backtestSelected={
                                                this.state.backtestSelected
                                            }
                                            selectBacktest={this.selectBacktest}
                                            isLive={false}
                                        />
                                    )}
                                </div>
                            )}
                            {this.state.noBacktests ? null : (
                                <div>
                                    <Stats
                                        start={
                                            this.state.algo_details.created_at
                                        }
                                        data={this.state.stats}
                                        toggleMode={this.toggleBacktestmode}
                                    />
                                    <BacktestVote
                                        data={this.state.backtestSelected}
                                        castVote={this.castVote}
                                    />
                                    <BacktestUniverse
                                        universe={this.state.stats.universe}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {this.state.isLive && this.state.liveInstanceSelected && (
                        <div>
                            <LiveInstanceList
                                id={algoID}
                                liveInstances={this.state.liveInstances}
                                liveInstanceSelected={
                                    this.state.liveInstanceSelected
                                }
                                selectLiveInstance={this.selectLiveInstance}
                                isLive={
                                    this.state.liveInstanceSelected
                                        .live_instance.live
                                }
                            />
                            <LiveStats
                                start={this.state.algo_details.created_at}
                                data={this.state.stats}
                            />
                        </div>
                    )}
                </div>
            );
        } else {
            return <p className="loading" />;
        }
    }
}

export default AlgorithmDetail;
