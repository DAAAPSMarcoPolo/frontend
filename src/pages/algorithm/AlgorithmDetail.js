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
            showBacktestForm: false,
            strategy: 34,
            backtestSelected: '',
            start_date: new Date(), /* 2019-3-1 */
            end_date: new Date(),
            algo_details: {
                approved: null,
                created_at: '',
                description: '',
                name: 'name',
                user: null,
                backtests: [
                  "backtest 1",
                  "backtest 2",
                  "backtest 3",
                  "backtest 4",
                  "backtest 5",
                  "backtest 6"
                ]
            },
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
    }

    toggleBacktestForm = () => {
        this.setState({ showBacktestForm: !this.state.showBacktestForm });
    };

    createBacktest = async (e) => {
      e.preventDefault();
      e.persist();
      const formData = {
          strategy: this.state.strategy,
          universe: e.target.universe.value,
          start_date: e.target.startDate.value,
          end_date: e.target.endDate.value,
          initial_funds: e.target.initial_funds.value
      }
      const res = await api.Post('/backtest/', formData);
      if (res.status !== 200) {
        console.log('uhhhh');
        this.setState({ error:res.statusText});
      } else {
        this.toggleBacktestForm();
      }
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

    async componentDidMount() {
      const { algoID } = this.props.match.params;

      // TODO get algorithm
      // const { data } = await api.Get(`/algorithms/${this.props.strategy}`);

      // const universe = await api.Get(`/universe/`);
      // console.log('universe'. universe);
      //
      // const backtests = await api.Get(`/backtest/${this.state.backtestSelected}/`);
      // console.log('backtests'. backtests);
      //
      // this.setState({
      //     algo_details: data.algo_details,
      //     bt_list: data.bt_list
      // });
    }

    render() {
        const { algoID } = this.props.match.params;
        const { algo_details } = this.state;
        return (
            <div className="fullWidth">
                <h3>{this.state.algo_details.name}</h3>
                <h5>2 Backtests in Progress</h5>
                <div className="errorClass"> {this.state.error && this.state.error} </div>
                {this.state.showBacktestForm ? (
                    <BacktestForm
                        error={this.state.error}
                        submitForm={this.createBacktest}
                        exitForm={this.toggleBacktestForm}
                        parent={this}
                    />
                ) : (
                    <button className="maxWidth position-corner greenButton" onClick={this.toggleBacktestForm}>
                        Create new Backtest
                    </button>
                )}
                <BacktestList id={algoID} backtests={this.state.algo_details.backtests} />
                <Stats stats={this.state.stats}/>
            </div>
        );
    }
}

export default withCookies(AlgorithmDetail);
