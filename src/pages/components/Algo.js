import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/algo.css';
import arrow_right from '../../assets/images/Chevron_Circle_Right-512.png';
const Algo = ({ data }) => {
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
                    Algo name&nbsp;&nbsp;•&nbsp;&nbsp;
                    <Link to="/backtest" className="algo-link">
                        <p>13 backtests</p>
                    </Link>
                </p>
                <p className="col-4 boundaries-algo">BEST BACKTEST NAME</p>
                <p className="col-3 boundaries-algo">ALGO APPROVED</p>
            </div>
            {/* row two */}
            <div className="row">
                <p className="col-5 boundaries-algo secondary-text">{data.a}</p>
                <p className="col-1 boundaries-algo">Start</p>
                <p className="col-1 boundaries-algo">End</p>
                <p className="col-2 boundaries-algo">% Gain</p>

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
                    Backtest completed today at 5:00 PM
                </p>
                <p className="col-1 boundaries-algo secondary-text">$300.00</p>
                <p className="col-1 boundaries-algo secondary-text">$500.00</p>
                <p className="col-2 boundaries-algo secondary-text">+66.67%</p>
                <p className="col-3 boundaries-algo secondary-text">
                    <span role="img" aria-label="Approval">
                        ✖️
                    </span>{' '}
                    1 Denial
                </p>
            </div>
            <div className="arrow-background" />
            <Link to="/algo-details/1">
                <img src={arrow_right} className="algo-detail-arrow" alt="" />
            </Link>
        </div>
    );
};
export default Algo;
