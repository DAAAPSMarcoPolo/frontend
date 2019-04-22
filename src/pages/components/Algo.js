import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';
import arrow_right from '../../assets/images/Chevron_Circle_Right-512.png';

const Algo = ({
    name,
    algoId,
    description,
    user,
    created_at,
    approved,
    best_backtest,
    start,
    end,
    sharpe,
    complete,
    status
}) => {
    return (
        // TODO name, created on, how many backtests
        // best backtest (and performance)
        // owner
        // whether it is live or not
        // current vote status if available
        // latest backtest started
        // link to detailed view
        <div className={`card algo-card ${status ? 'borderGreen' : 'borderRed'}`}>
            {/* row one */}
            <div className="row">
                <p className="col-5 boundaries-algo">
                    {name}&nbsp;&nbsp;•&nbsp;&nbsp;
                    <Link to={`/algorithms/${algoId}`} className="algo-link" key={algoId}>
                        <p>#{algoId}</p>
                    </Link>
                </p>
                <p className="col-4 boundaries-algo">
                    Best Backest:{' '}
                    {best_backtest
                        ? `#${best_backtest}`
                        : 'No Backtests Created'}
                </p>
                <p className="col-3 boundaries-algo">
                    ALGO {approved ? 'APPROVED' : 'PENDING'}
                </p>
            </div>
            {/* row two */}
            <div className="row">
                <p className="col-5 boundaries-algo secondary-text">
                    Created on by User {user}
                </p>
                <p className="col-1 boundaries-algo">Start</p>
                <p className="col-1 boundaries-algo">End</p>
                <p className="col-2 boundaries-algo">Sharpe</p>

                <p className="col-3 boundaries-algo secondary-text">
                    <span role="img" aria-label="Approval">
                        ✔️
                    </span>{' '}
                    3 Approvals
                </p>
            </div>
            {/* row three */}
            <div className="row">
                <div className="col-5 boundaries-algo">
                  <p>Status:&nbsp;
                  <span className="secondary-text">
                   {
                      (!best_backtest)
                      ? 'No Backtests Created'
                      : (complete)
                      ? 'Backtest Complete'
                      : 'Backest in Progress'
                    }
                    </span>
                    </p>
                    <p className="secondary-text">
                    {
                      (!status)
                      ? 'No Live Instance Created'
                      : 'Live Instance in Progress'
                    }
                    </p>
                </div>
                <p className="col-1 boundaries-algo secondary-text">${start}</p>
                <p className="col-1 boundaries-algo secondary-text">${end}</p>
                <p className="col-2 boundaries-algo secondary-text">
                    {sharpe}
                </p>
                <p className="col-3 boundaries-algo secondary-text">
                    <span role="img" aria-label="Approval">
                        ✖️
                    </span>{' '}
                    1 Denial
                </p>
            </div>
            <div className="arrow-background" />
            <Link to="/algorithms/29"  key={algoId}>
                <img src={arrow_right} className="algo-detail-arrow" alt="" />
            </Link>
        </div>
    );
};
export default Algo;
