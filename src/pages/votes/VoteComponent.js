import React from 'react';
import { Link } from 'react-router-dom';
import x_icon from '../../assets/images/x-icon.png';
import check_icon from '../../assets/images/check-icon.png';

const VoteComponent = ({ strategy, backtest, castVote }) => {
    const { border, statusText } = selectStatus(backtest.vote_status);
    return (
        <div className={`card vote-card mt-1 ${border}`}>
            <div className="row">
                <div className="col-4">Backtest #{backtest.id}</div>
                <div className="col-4" />
                <div className="col-4" />
            </div>
            <div className="row">
                <div className="col-4">{statusText}</div>
                <div className="col-4" />
                <div className="col-4">
                    <div
                        className={`vote-btn ${
                            backtest.backtestvote__vote === true ? 'active' : ''
                        }`}
                        onClick={() => castVote('approve', backtest)}
                    >
                        <img src={check_icon} />
                    </div>
                    <div
                        className={`vote-btn ${
                            backtest.backtestvote__vote === false
                                ? 'active'
                                : ''
                        }`}
                        onClick={() => castVote('deny', backtest)}
                    >
                        <img src={x_icon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const selectStatus = status => {
    if (status === 'approved') {
        return { border: ' border-green', statusText: 'Approved' };
    } else if (status === 'denied') {
        return { border: ' border-red', statusText: 'Denied' };
    } else {
        return { border: ' border-yellow', statusText: 'Pending' };
    }
};

export default VoteComponent;
