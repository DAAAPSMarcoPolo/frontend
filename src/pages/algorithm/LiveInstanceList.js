import React from 'react';
import '../../assets/algo.css';

const LiveInstanceList = ({ liveInstances, liveInstanceSelected, selectLiveInstance, isLive }) => (
    <div className="backtest margins">
        <ul className="nav-tabs nav-overflow scroll-hide">
            {liveInstances &&
                liveInstances.map((live, i) => (
                    <li
                        className={`tab select-backtest
                          ${liveInstanceSelected.live_instance.id === live.live_instance.id && 'active'}`}
                        key={i}
                        onClick={() => selectLiveInstance(i, live.live_instance.id)}
                    >
                        {' '}
                        <div style={{color: `${live.live_instance.live ? '#44E8AE' : '#FA6353'}`, display: 'inline'}}>•&nbsp;</div>
                        {live.live_instance.id}
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
                                  $ {el.open_price ? el.open_price.toFixed(2) : '--'}
                              </td>
                              <td className="tab trans-col">
                                  {el.open_date ? `${new Date(
                                      el.open_date
                                  ).getFullYear()}-${new Date(
                                      el.open_date
                                  ).getMonth()}-${new Date(
                                      el.open_date
                                  ).getDate()}` : '--'}
                              </td>
                              <td className="tab trans-col">{el.qty}</td>
                              <td className="tab trans-col">
                                  $ {el.close_price ? el.close_price.toFixed(2) : '--'}
                              </td>
                              <td className="tab trans-col">
                                  {el.close_date ?
                                    `${new Date(
                                      el.close_date
                                  ).getFullYear()}-${new Date(
                                      el.close_date
                                  ).getMonth()}-${new Date(
                                      el.close_date
                                  ).getDate()}`
                                  : '--'}
                              </td>
                          </tr>
                      ))}
              </tbody>
            </table>
        </div>
    </div>
);

export default LiveInstanceList;
