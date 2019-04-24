import React from 'react';
import '../../assets/algo.css';

const BacktestUniverse = ({ universe }) => (
  <div className="con rel con-overflow backtest-flex-child">
  <h3>Universe: {universe.name}</h3>
  <table className="con-table left">
    <thead>
      <tr>
          <th>Stock</th>
      </tr>
    </thead>
    <tbody>
    {
      universe.stocks.map((stock) => <tr><td>{stock}</td></tr>)
    }
    </tbody>
  </table>
</div>
);

export default BacktestUniverse;
