import React from 'react';
import '../../assets/algo.css';

const LiveInstanceList = ({ liveInstances, liveInstanceSelected, selectLiveInstance, isLive }) => (
    <div className="backtest margins">
        <ul className="nav-tabs nav-overflow scroll-hide">
            {liveInstances &&
                liveInstances.map((backtest, i) => (
                    <li
                        className={`tab select-backtest ${liveInstanceSelected
                            .backtest.id === backtest.backtest.id && 'active'}`}
                        key={i}
                        onClick={() => selectLiveInstance(i, backtest.backtest.id)}
                    >
                        {' '}
                        <div style={{color: `${isLive ? '#FA6353' : '#44E8AE'}`, display: 'inline'}}>•&nbsp;</div>
                        {backtest.backtest.id}
                    </li>
                ))}
        </ul>
        <div className="padding">
            <table className="transaction-table nav-overflow">
              <thead>
                  <tr>
                      <th>Stock</th>
                      <th>Open Price</th>
                      <th>Buy Date</th>
                      <th>Quantity</th>
                      <th>Close Price</th>
                      <th>Close Date</th>
                  </tr>
              </thead>
              <tbody>
                  {liveInstanceSelected.trades &&
                      liveInstanceSelected.trades.map((el, i) => (
                          <tr key={i}>
                              <td className="tab trans-col">{el.symbol}</td>
                              <td className="tab trans-col">
                                  $ {el.open_price.toFixed(2)}
                              </td>
                              <td className="tab trans-col">
                                  {`${new Date(
                                      el.open_date
                                  ).getFullYear()}-${new Date(
                                      el.open_date
                                  ).getMonth()}-${new Date(
                                      el.open_date
                                  ).getDate()}`}
                              </td>
                              <td className="tab trans-col">{el.qty}</td>
                              <td className="tab trans-col">
                                  $ {el.close_price.toFixed(2)}
                              </td>
                              <td className="tab trans-col">
                                  {`${new Date(
                                      el.close_date
                                  ).getFullYear()}-${new Date(
                                      el.close_date
                                  ).getMonth()}-${new Date(
                                      el.close_date
                                  ).getDate()}`}
                              </td>
                          </tr>
                      ))}
              </tbody>
            </table>
        </div>
    </div>
);

export default LiveInstanceList;
