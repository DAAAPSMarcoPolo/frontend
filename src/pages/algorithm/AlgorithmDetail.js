import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import BacktestForm from './BacktestForm';
import BacktestList from './BacktestList';
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
            strategy: 34,
            universeId: null,
            algo_details: null,
            backtests: null,
            backtestSelected: null,
            start_date: new Date(), /* 2019-3-1 */
            end_date: new Date(),
            stats: {
              "id": 16,
              "complete": true,
              "start_date": "2018-01-01T00:00:00Z",
              "end_date": "2019-03-01T00:00:00Z",
              "initial_cash": 2000,
              "end_cash": 4093.0496,
              "sharpe": 2.89,
              "created_at": "2019-03-27T00:18:08.572453Z",
              "strategy": 34,
              "universe": 20,
              "user": 5
            }
        };
        this.toggleBacktestForm = this.toggleBacktestForm.bind(this);
        this.createBacktest = this.createBacktest.bind(this);
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
        this.handleSelectUniverse = this.handleSelectUniverse.bind(this);
        this.getAlgorithmList = this.getAlgorithmList.bind(this);
        this.getBacktestList = this.getBacktestList.bind(this);
        this.getAlgorithmList = this.getAlgorithmList.bind(this);

    }
    componentDidMount() {
      this.getBacktestList();
      this.getAlgorithmList();
    }
    getBacktestList = async () => {
      const { algoID } = this.props.match.params;
      console.log('algoId', algoID);
      // GET /api/algorithm/
      const res = await api.Get(`/strategybacktests/${algoID}`);
      console.log('getBacktestList',res);
      if (res.status !== 200) {
        this.setState({ error:res.statusText});
      } else if (res.data) {
        this.setState({ response: true, backtestCount: res.data.length, backtests: res.data });
        if (res.data.length > 0) {
          console.log('res.length', res.data.length, res.data[0].backtest.id);
          this.setState({ backtestSelected:  res.data[0].backtest.id });
        }
        console.log('backtest selected', this.state.backtestSelected);
      }
      setTimeout(() => {
        this.setState({error: null});
      }, 5000)

    };
    getAlgorithmList = async () => {
      const { algoID } = this.props.match.params;
      console.log('algoId', algoID);
      // GET /api/algorithm/
      const res = await api.Get(`/algorithm/${algoID}`);
      console.log('AlgorithmList', res);
      if (res.status !== 200) {
        this.setState({ error:res.statusText});
      } else if (res.data) {
          this.setState({ algo_details: res.data.algo_details });
          // res.data.length
      }
      setTimeout(() => {
        this.setState({error: null});
      }, 5000)

    };
    toggleBacktestForm = () => {
        this.setState({ showBacktestForm: !this.state.showBacktestForm });
    };

    createBacktest = async (e) => {
      e.preventDefault();
      e.persist();
      if (!this.state.strategy || !this.state.universeId) {
        this.setState({ error: 'All fields are required!'});
        setTimeout(() => {
          this.setState({error: null});
        }, 5000)
      }
      const formData = {
          strategy: this.state.strategy,
          universe: this.state.universeId,
          start_date: e.target.startDate.value,
          end_date: e.target.endDate.value,
          initial_funds: e.target.initial_funds.value
      }
      const res = await api.Post('/backtest/', formData);
      if (res.status !== 200) {
        this.setState({ error:res.statusText});
      }
      this.toggleBacktestForm();
      setTimeout(() => {
        this.setState({error: null});
      }, 5000)
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
    selectBacktest = (backtestId, e) => {
      e.persist();
      console.log('backtestId', backtestId);
      if (backtestId !== this.state.backtestSelected) {
        this.setState({ backtestSelected: backtestId });
      }
      this.getBacktestList();
    };
    render() {
        const { algoID } = this.props.match.params;
        const { algo_details } = this.state;
        if (this.state.algo_details) {
          return (
              <div className="fullWidth">
                  <h3>{this.state.algo_details.name}</h3>
                  <h5>{this.state.backtestCount} Backtests Total</h5>
                  <p>{this.state.algo_details.description}</p>
                  <div className="errorClass"> {this.state.error && this.state.error} </div>
                  {this.state.showBacktestForm ? (
                      <BacktestForm
                          error={this.state.error}
                          submitForm={this.createBacktest}
                          exitForm={this.toggleBacktestForm}
                          parent={this}
                          handleSelectUniverse={this.handleSelectUniverse}
                      />
                  ) : (
                      <button className="maxWidth position-corner greenButton" onClick={this.toggleBacktestForm}>
                          Create new Backtest
                      </button>
                  )}
                  {this.state.response &&
                    <BacktestList
                      id={algoID}
                      backtests={this.state.backtests}
                      selectTab={this.selectBacktest}
                      backtestSelected={this.state.backtestSelected}
                    />
                  }
                  <Stats
                    start={this.state.algo_details.created_at}
                  />
              </div>
          );
        } else {
          return <p>Algorithm Details Loading</p>
        }
    }
}

export default withCookies(AlgorithmDetail);
