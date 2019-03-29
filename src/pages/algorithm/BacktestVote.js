import React from 'react';
import { Link } from 'react-router-dom';

const BacktestVote = ({ data }) => {
    let title;
    if (data.votes) {
      switch (data.votes.status) {
          case 'approved':
              title = <h5>Approved</h5>;
              break;
          case 'denied':
              title = <h5>Denied</h5>;
              break;
          default:
              title = <h5>Vote not created</h5>;
      }
    }

    let votes = [];
    if (data.votes) {
        data.votes.forEach(v => {
            votes.push(
                <li>
                    {v.name}: {v.status}
                </li>
            );
        });
    }

    return (
        <div className="card bg-dark">
            <h4>Backtest vote component</h4>
            {title}
            <ul>{votes}</ul>
        </div>
    );
};

export default BacktestVote;
