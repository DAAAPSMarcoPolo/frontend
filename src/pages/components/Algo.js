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
    complete
}) => {
    return (
        // TODO name, created on, how many backtests
        // best backtest (and performance)
        // owner
        // whether it is live or not
        // current vote status if available
        // latest backtest started
        // link to detailed view
        <div className="card algo-card">
            {/* row one */}
            <div className="row">
                <p className="col-5 boundaries-algo">
                    {name}&nbsp;&nbsp;•&nbsp;&nbsp;
                    <Link to={`/algorithms/${algoId}`} className="algo-link">
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
                    This is created by User {user}
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
                <p className="col-5 boundaries-algo">
                    Backtest status:{' '}
                    {complete ? 'Backtest Complete' : 'No Backtests Created'}
                </p>
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
            <Link to="/algorithms/29">
                <img src={arrow_right} className="algo-detail-arrow" alt="" />
            </Link>
        </div>
    );
};
export default Algo;
