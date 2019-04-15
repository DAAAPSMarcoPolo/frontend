import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BacktestForm from './BacktestForm';
import BacktestList from './BacktestList';
import LiveInstanceForm from './LiveInstanceForm';
import BacktestVote from './BacktestVote';
import api from '../../utils/api.js';
import Stats from './Stats';
import '../../assets/algo.css';

class AlgorithmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            backtestCount: '--',
            showBacktestForm: false,
            showLiveInstanceForm: false,
            strategy: this.props.match.params.algoID,
            universeId: null,
            algo_details: null,
            backtests: null,
            backtestSelected: null,
            start_date: new Date() /* 2019-3-1 */,
            end_date: new Date(),
            stats: {},
            loading: true,
            isLive: false
        };
        this.toggleBacktestForm = this.toggleBacktestForm.bind(this);
        this.toggleLiveInstanceForm = this.toggleLiveInstanceForm.bind(this);
        this.createBacktest = this.createBacktest.bind(this);
        this.createLiveInstance = this.createLiveInstance.bind(this);
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
        this.handleSelectUniverse = this.handleSelectUniverse.bind(this);
        this.getAlgorithmDetails = this.getAlgorithmDetails.bind(this);
        this.getBacktestList = this.getBacktestList.bind(this);
        this.selectBacktest = this.selectBacktest.bind(this);
        this.toggleLive = this.toggleLive.bind(this);
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
    toggleLiveInstanceForm = () => {
        this.setState({ showLiveInstanceForm: !this.state.showLiveInstanceForm });
    };
    toggleLive = () => {
        if (this.state.algo_details.live) {
          this.setState({ isLive: !this.state.isLive });
        } else {
          this.setState({ error: 'No live instances yet, Create a new live instance from a backtest!' });
          setTimeout(() => {
              this.setState({ error: null });
          }, 5000);
        }
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
        console.log('backtestSelected', backtestSelected);
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
            mode: "start",
            backtest: this.state.backtestSelected.backtest.id,
            funds: e.target.initial_funds.value
        };
        const res = await api.Post('/live/', formData);
        if (res.status !== 200) {
            this.setState({ error: res.statusText });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        }
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
    render() {
        const { algoID } = this.props.match.params;
        if (!this.state.loading) {
            return (
                <div className="fullWidth">
                    <div className="title-info">
                        <h3>{this.state.algo_details.name}</h3>
                        <h5>{this.state.backtestCount} Backtests Total</h5>
                        <p>{this.state.algo_details.description}</p>
                        <div className="nav isLiveNav">
                          <p onClick={this.toggleLive} className={`${!this.state.isLive && 'toggleLive'} click`}>Backtest</p>
                          <p onClick={this.toggleLive} className={`${this.state.isLive && 'toggleLive'} marginLeft click`}>Live</p>
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
                            Create new Backtest
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
                        />
                    ) : (
                        <button
                            className="maxWidth position-corner greenButton"
                            onClick={this.toggleLiveInstanceForm}
                        >
                            Create new Live Instance
                        </button>
                    )}
                    <div className="errorClass">
                      {' '}
                      {this.state.error && this.state.error}
                    </div>
                    {this.state.backtestSelected && (
                      <div>
                        <BacktestList
                            id={algoID}
                            backtests={this.state.backtests}
                            backtestSelected={this.state.backtestSelected}
                            selectBacktest={this.selectBacktest}
                        />
                        <Stats
                          start={this.state.algo_details.created_at}
                          data={this.state.stats}
                        />
                        <BacktestVote data={this.state.backtestSelected} />
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
