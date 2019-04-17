import React from 'react';
import '../../assets/vote.css';
import { getFromLocalStorage } from '../../utils/localstorage';
import api from '../../utils/api';

const BacktestVote = ({ data, castVote }) => {
    let title;
    if (data.votes) {
        switch (data.votes.status) {
            case 'approved':
                title = <h5>Approved</h5>;
                break;
            case 'denied':
                title = <h5>Denied</h5>;
                break;
            default:
                title = <h5>Vote pending</h5>;
        }
    }

    let votes = [];
    let currUser = getFromLocalStorage('user');
    if (!currUser) {
        // TODO get current user
        console.log('no user somehow...');
    }
    if (data.votes.list) {
        data.votes.list.forEach(v => {
            let vote = '❔';
            if (v.vote === true) {
                vote = '✓';
            } else if (v.vote === false) {
                vote = '×';
            }
            // allow current user to cast their own vote
            if (v.user === currUser.id && v.vote === true) {
                vote = (
                    <div>
                        <button
                            className="vote-btn current-vote"
                            disabled={true}
                        >
                            ✓
                        </button>
                        <button
                            className="vote-btn"
                            onClick={() => castVote('deny')}
                        >
                            ×
                        </button>
                    </div>
                );
            } else if (v.user === currUser.id && v.vote === false) {
                vote = (
                    <div>
                        <button
                            className="vote-btn"
                            onClick={() => castVote('approve')}
                        >
                            ✓
                        </button>
                        <button
                            className="vote-btn current-vote"
                            disabled={true}
                        >
                            ×
                        </button>
                    </div>
                );
            } else if (v.user === currUser.id) {
                vote = (
                    <div>
                        <button
                            className="vote-btn"
                            onClick={() => castVote('approve')}
                        >
                            ✓
                        </button>
                        <button
                            className="vote-btn"
                            onClick={() => castVote('deny')}
                        >
                            ×
                        </button>
                    </div>
                );
            }
            votes.push(
                <li>
                    {v.user__username}: {vote}
                </li>
            );
        });
    }

    return (
        <div className="con">
            {title}
            <ul>{votes}</ul>
        </div>
    );
};

export default BacktestVote;
