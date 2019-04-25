import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import './votes.css';
import { getFromLocalStorage } from '../../utils/localstorage';
import VoteComponent from './VoteComponent';

class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vote_data: null,
            collapsed: true
        };
        this.getUserVotes = this.getUserVotes.bind(this);
        this.castVote = this.castVote.bind(this);
        this.toggleCollapseAll = this.toggleCollapseAll.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        this.getUserVotes();
    }

    async getUserVotes() {
        const user = getFromLocalStorage('user');
        const response = await api.Get(`/user/${user.id}/votes`);
        const { vote_data } = response.data;
        const old_vote_data = this.state.vote_data;
        for (const key in vote_data) {
            if (
                old_vote_data &&
                old_vote_data.hasOwnProperty(key) &&
                vote_data.hasOwnProperty(key)
            ) {
                vote_data[key]['collapsed'] = old_vote_data[key]['collapsed'];
            } else if (vote_data.hasOwnProperty(key)) {
                vote_data[key]['collapsed'] = true;
            }
        }
        this.setState({ vote_data });
    }

    castVote = async (vote, backtest) => {
        if (vote === 'accept' && backtest.backtestvote__vote === true) {
            return;
        } else if (vote === 'deny' && backtest.backtestvote__vote === false) {
            return;
        }
        const formData = {
            vote
        };
        const res = await api.Post(`/backtest/${backtest.id}/vote`, formData);
        if (res.status === 200) {
            await this.getUserVotes();
        } else {
            this.setState({ error: res.statusText });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        }
    };

    toggleCollapse(s_id) {
        const { vote_data } = this.state;
        for (const key in vote_data) {
            if (
                vote_data.hasOwnProperty(key) &&
                vote_data[key]['algorithm_id'] === s_id
            ) {
                vote_data[key]['collapsed'] = !vote_data[key]['collapsed'];
            }
        }
        this.setState({ vote_data });
    }

    toggleCollapseAll() {
        const { vote_data } = this.state;
        for (const key in vote_data) {
            if (vote_data.hasOwnProperty(key)) {
                vote_data[key]['collapsed'] = !this.state.collapsed;
            }
        }
        this.setState({ collapsed: !this.state.collapsed, vote_data });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.vote_data && (
                        <div className="text-right">
                            <div
                                onClick={this.toggleCollapseAll}
                                className="toggle-text"
                            >
                                {this.state.collapsed
                                    ? 'expand all'
                                    : 'collapse all'}
                            </div>
                        </div>
                    )}
                    {this.state.vote_data &&
                        this.state.vote_data.map((strategy, i) => (
                            <div key={i}>
                                <div
                                    className="card strategy-card mt-3"
                                    onClick={() => {
                                        this.toggleCollapse(
                                            strategy.algorithm_id
                                        );
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-3">
                                            {strategy.algorithm_name}
                                        </div>
                                        <div className="col-3 text-center">
                                            {getCount(strategy, 'approved')}{' '}
                                            approved
                                        </div>
                                        <div className="col-3 text-center">
                                            {getCount(strategy, '')} pending
                                        </div>
                                        <div className="col-3 text-right">
                                            {getCount(strategy, 'denied')}{' '}
                                            denied
                                        </div>
                                    </div>
                                </div>
                                {strategy.backtests.map((backtest, j) => (
                                    <div
                                        className={
                                            strategy.collapsed
                                                ? 'collapsed'
                                                : ''
                                        }
                                        key={j}
                                    >
                                        <VoteComponent
                                            backtest={backtest}
                                            strategy={strategy}
                                            castVote={this.castVote}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

const getCount = (strategy, status) => {
    let count = 0;
    strategy.backtests.forEach(backtest => {
        if (backtest.vote_status === status) {
            count++;
        }
    });
    return count;
};

export default Votes;
