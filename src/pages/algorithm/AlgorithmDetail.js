import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BacktestForm from './BacktestForm';
import BacktestList from './BacktestList';
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
            response: false,
            showBacktestForm: false,
            strategy: this.props.match.params.algoID,
            universeId: null,
            algo_details: null,
            backtests: null,
            backtestSelected: null,
            start_date: new Date() /* 2019-3-1 */,
            end_date: new Date()
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
    componentDidMount() {
        this.getBacktestList();
        this.getAlgorithmDetails();
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
          if (this.state.backtestCount > 0) {
              this.selectBacktest(0);
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
      const response = await api.Get("/backtest/"+ this.state.backtestSelected + "/");
      console.log('transform', response);
      this.setState({transactions: response.data.trades});
      console.log('this.state.transactions', this.state.transactions);
    };

    toggleBacktestForm = () => {
        this.setState({ showBacktestForm: !this.state.showBacktestForm });
    };
    selectBacktest = i => {
        const backtestSelected = this.state.backtests[i];
        console.log(this.state.backtests);
        const bt = backtestSelected.backtest;
        const start = new Date(bt.start_date);
        const end = new Date(bt.end_date);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const per_gain = (
            ((bt.end_cash - bt.initial_cash) / bt.initial_cash) *
            100
        ).toFixed(2);
        console.log(per_gain);
        backtestSelected.backtest.percent_gain =
            per_gain === !NaN ? 0 : per_gain;
        backtestSelected.backtest.num_days = diffDays;
        backtestSelected.backtest.start_date = `${start.getMonth()}-${start.getDay()}-${start.getFullYear()}`;
        backtestSelected.backtest.end_date = `${end.getMonth()}-${end.getDay()}-${end.getFullYear()}`;
        this.setState({ backtestSelected });
        console.log('set backtest: ' + backtestSelected);
        return;
    };
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
          }
          this.toggleBacktestForm();
          setTimeout(() => {
              this.setState({ error: null });
          }, 5000);
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
        if (this.state.algo_details) {
            return (
                <div className="fullWidth">
                  <div className="title-info">
                    <h3>{this.state.algo_details.name}</h3>
                    <h5>{this.state.backtestCount} Backtests Total</h5>
                    <p>{this.state.algo_details.description}</p>
                    <div className="errorClass"> {this.state.error && this.state.error}</div>
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
                        <button className="maxWidth position-corner greenButton" onClick={this.toggleBacktestForm}>Create new Backtest</button>
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
                            data={this.state.backtestSelected.backtest}
                        />
                    )}
                    {this.state.backtestSelected && (
                        <BacktestVote data={this.state.backtestSelected} />
                    )}
                </div>
            );
        } else {
            return <p className="loading" />;
        }
    }
}

export default AlgorithmDetail;
