import React from 'react';
import { Link } from 'react-router-dom';
import './live-instance.css';

const LiveInstanceComponent = ({ strategy, backtest, live_instance }) => {
    const border = selectBorder(backtest, live_instance);

    console.log(live_instance);
    return (
        <div>
            <a
                href={`/algorithms/${strategy.id}?liveinstance=${
                    live_instance.id
                }`}
                className={'card live-card mt-1' + border}
            >
                {/* 
                information available:
                    backtest: related backtest id, backtest vote status
                    live instance: id, starting cash, buying power, status
            */}
                <div className="row headers">
                    <div className="col-4 grey">
                        Related Backtest:{' '}
                        <Link
                            className="link"
                            to={`/algorithms/${strategy.id}?backtest=${
                                backtest.id
                            }`}
                        >
                            #{backtest.id}
                        </Link>
                    </div>
                    <div className="col-5">Status</div>
                    <div className="col-3">Vote Status</div>
                </div>
                <div className="row">
                    <div className="col-4 headers grey">
                        Live Instance:{' '}
                        <Link
                            className="link"
                            to={`/algorithms/${strategy.id}?liveinstance=${
                                live_instance.id
                            }`}
                        >
                            #{live_instance.id}
                        </Link>
                    </div>
                    <div className="col-5">
                        {live_instance.live ? 'Running' : 'Stopped'}
                    </div>
                    <div className="col-3">
                        {backtest.vote_status === ''
                            ? 'Pending'
                            : backtest.vote_status === 'approved'
                            ? 'Approved'
                            : 'Denied'}
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 headers">Buying Power</div>
                    <div className="col-5" />
                    <div className="col-3" />
                </div>
                <div className="row">
                    <div className="col-4">
                        $
                        {numberWithCommas(
                            live_instance.buying_power.toFixed(2)
                        )}
                    </div>
                    <div className="col-5" />
                    <div className="col-3" />
                </div>
                <div />
            </a>
        </div>
    );
};

const selectBorder = (backtest, live_instance) => {
    // border green when trading is live
    if (live_instance.live && backtest.vote_status === 'approved') {
        return ' border-green';
    }
    // border yellow when (retroactively) denied but still running
    else if (live_instance.live) {
        return ' border-yellow';
    }
    // border blue when paused/stopped but still has majority approval
    else if (backtest.vote_status === 'approved') {
        return ' border-blue';
    }
    // border red when stopped and denied
    else {
        return ' border-red';
    }
};

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default LiveInstanceComponent;
