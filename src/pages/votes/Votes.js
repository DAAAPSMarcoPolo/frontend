import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import './votes.css';
import { getFromLocalStorage } from '../../utils/localstorage';

class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: null
        };
        this.getUserVotes = this.getUserVotes.bind(this);
        this.pendingBtns = this.pendingBtns.bind(this);
        this.acceptedBtns = this.acceptedBtns.bind(this);
        this.deniedBtns = this.deniedBtns.bind(this);
        this.castVote = this.castVote.bind(this);
    }

    componentDidMount() {
        this.getUserVotes();
    }

    async getUserVotes() {
        const user = getFromLocalStorage('user');
        const response = await api.Get(`/user/${user.id}/votes`);
        const { votes } = response.data;
        this.setState({ votes });
        console.log(votes);
    }

    castVote = async (vote, backtest) => {
        const formData = {
            vote
        };
        const res = await api.Post(`/backtest/${backtest}/vote`, formData);
        if (res.status === 200) {
            await this.getUserVotes();
        } else {
            this.setState({ error: res.statusText });
            setTimeout(() => {
                this.setState({ error: null });
            }, 5000);
        }
    };

    pendingBtns(backtest) {
        return (
            <div className="vote-btn-grp">
                <button
                    className="vote-btn"
                    onClick={() => this.castVote('approve', backtest)}
                >
                    ✓
                </button>
                <button
                    className="vote-btn"
                    onClick={() => this.castVote('deny', backtest)}
                >
                    ×
                </button>
            </div>
        );
    }

    acceptedBtns(backtest) {
        return (
            <div className="vote-btn-grp">
                <button className="vote-btn current-vote" disabled={true}>
                    ✓
                </button>
                <button
                    className="vote-btn"
                    onClick={() => this.castVote('deny', backtest)}
                >
                    ×
                </button>
            </div>
        );
    }

    deniedBtns(backtest) {
        return (
            <div className="vote-btn-grp">
                <button
                    className="vote-btn"
                    onClick={() => this.castVote('accept', backtest)}
                >
                    ✓
                </button>
                <button className="vote-btn current-vote" disabled={true}>
                    ×
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.votes &&
                        this.state.votes.map((vote, i) => (
                            <li className="vote-row" key={i}>
                                <div className="d-inline-block mr-2">
                                    Backtest id: {vote.backtest},
                                </div>
                                <div className="d-inline-block">
                                    Vote:{' '}
                                    {vote.vote === null
                                        ? this.pendingBtns(vote.backtest)
                                        : vote.vote
                                        ? this.acceptedBtns(vote.backtest)
                                        : this.deniedBtns(vote.backtest)}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default Votes;
