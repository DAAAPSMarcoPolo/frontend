import React from 'react';
import '../../assets/algo.css';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';


const BacktestGraph = ({ backtests, backtestSelected, selectBacktest, isLive }) => (
    <div className="backtest margins">
        <ul className="nav-tabs nav-overflow scroll-hide">
            {backtests &&
                backtests.map((backtest, i) => (
                    <li
                        className={`tab select-backtest ${backtestSelected
                            .backtest.id === backtest.backtest.id && 'active'}`}
                        key={i}
                        onClick={() => selectBacktest(i, backtest.backtest.id,)}
                    >
                        {' '}
                        <div style={{color: `${isLive ? '#FA6353' : '#44E8AE'}`, display: 'inline'}}>•&nbsp;</div>{`${new Date(
                                    backtest.backtest.created_at
                                ).getFullYear()}-${new Date(
                                    backtest.backtest.created_at
                                ).getMonth()+1}-${new Date(
                                    backtest.backtest.created_at
                                ).getDate()}`}
                    </li>
                ))}
        </ul>
        <div className="padding">
        {backtestSelected.graph.length ? (
            <ResponsiveContainer className="transactionGraph nav-overflow">
            <AreaChart data={backtestSelected.graph}>
                <Area animationDuration={3500} dot={false}type="monotone" dataKey="value" stroke="#3ecc9a" fill='#82f2cb' />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => value} />
            </AreaChart>
        </ResponsiveContainer>
        ) : 'Backtest was run before graphing functionality was implemented'
        }
            
        </div>
    </div>
);

export default BacktestGraph;
