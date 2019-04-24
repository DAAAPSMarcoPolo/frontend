import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import api from '../../utils/api';
import StrategyComponent from './StrategyComponent';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            strategies: null,
            collapsed: true
        };
        this.getDashboardData = this.getDashboardData.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    async getDashboardData() {
        const res = await api.Get('/dashboard');
        if (res.status !== 200) {
            this.setState({
                error: 'There was a problem retrieving dashboard info...'
            });
            setInterval(() => {
                this.setState({ error: null });
            }, 5000);
        }
        const { strategies } = res.data;
        strategies.forEach((strategy, i) => {
            strategies[i]['collapsed'] = true;
        });
        this.setState({
            strategies
        });
    }

    toggleCollapse(key) {
        const { strategies } = this.state;
        strategies[key]['collapsed'] = !strategies[key]['collapsed'];
        this.setState({ strategies });
    }

    toggleAll() {
        const strategies = this.state.strategies;
        for (const key in strategies) {
            strategies[key]['collapsed'] = !this.state.collapsed;
        }

        this.setState({ strategies, collapsed: !this.state.collapsed });
    }

    componentDidMount() {
        this.getDashboardData();
    }

    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        if (isAuthenticated === 'false' || !isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <div className="text-right header-link">
                    <div onClick={this.toggleAll}>
                        {this.state.collapsed ? 'expand all' : 'collapse all'}
                    </div>
                </div>
                {this.state.strategies &&
                    this.state.strategies.map((strategy, i) => (
                        <StrategyComponent
                            key={i}
                            strategy={strategy}
                            index={i}
                            toggleCollapse={this.toggleCollapse}
                        />
                    ))}
            </div>
        );
    }
}

export default withCookies(Dashboard);
