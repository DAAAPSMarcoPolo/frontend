import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import BacktestVote from './components/BacktestVote';

class Dashboard extends Component {
    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        if (isAuthenticated === 'false' || !isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="page">
                <p>Dashboard</p>
                <BacktestVote
                    data={{
                        voteCreated: true,
                        votes: [
                            { name: 'Sean', status: 'Approved' },
                            { name: 'Dan', status: 'Approved' }
                        ]
                    }}
                />
            </div>
        );
    }
}

export default withCookies(Dashboard);
