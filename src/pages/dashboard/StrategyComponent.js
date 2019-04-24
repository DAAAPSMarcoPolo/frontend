import React from 'react';
import LiveInstanceComponent from './LiveInstanceComponent';
import { Link } from 'react-router-dom';
import './strategy.css';
const StrategyComponent = ({ strategy, index, toggleCollapse }) => {
    console.log(index);
    console.log(strategy);
    let live_count = 0;
    strategy.backtests.forEach(backtest => {
        live_count += backtest.live_instances.length;
    });
    return (
        <div>
            <div
                className="card strategy-card mt-3"
                onClick={() => {
                    toggleCollapse(index);
                }}
            >
                <div className="row">
                    <div className="col-4">
                        <Link
                            className="link"
                            to={`/algorithms/${strategy.id}`}
                        >
                            {strategy.name}
                        </Link>
                    </div>
                    <div className="col-4 text-center">
                        {live_count} live instances
                    </div>
                    <div className="col-4 text-right">
                        {strategy.backtests.length} backtests
                    </div>
                </div>
            </div>
            <div
                className={
                    'live-list' + (strategy.collapsed ? ' collapsed' : '')
                }
            >
                {strategy.backtests.map((backtest, i) => (
                    <div key={i}>
                        {backtest.live_instances.map((live_instance, j) => (
                            <LiveInstanceComponent
                                strategy={strategy}
                                backtest={backtest}
                                live_instance={live_instance}
                                key={j}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StrategyComponent;
