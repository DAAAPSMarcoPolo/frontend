import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import x from '../../assets/images/x-icon.png';
import { instanceOf } from 'prop-types';

import '../../assets/nav.css';

class Nav extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies)
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    updateisOpen = () => {
        this.setState({ open: !this.state.open });
    };
    logout = () => {
        const { cookies } = this.props;
        cookies.set('isAuthenticated', false);
        cookies.set('isAdmin', false);
        cookies.remove('jwt');
        cookies.remove('email');
    };

    render() {
        if (this.props.isAuthenticated === 'true') {
            return (
                <div
                    onClick={this.handleClick}
                    className="contain nav left"
                    ref={node => {
                        this.node = node;
                    }}
                >
                    {this.state.open ? (
                        <div className="drop rel">
                            <img
                                className="icon roster"
                                src={x}
                                alt="x-icon"
                                onClick={this.updateisOpen}
                            />
                            <Link to="/dashboard" onClick={this.handleClick}>
                                Dashboard
                            </Link>
                            <Link to="/algorithms" onClick={this.handleClick}>
                                Algorithms
                            </Link>
                            <Link to="/upload" onClick={this.handleClick}>
                                Upload an Algorithm
                            </Link>
                            <Link to="/votes" onClick={this.handleClick}>
                                Votes
                            </Link>
                            <Link to="/universes" onClick={this.handleClick}>
                                Universes
                            </Link>
                            <Link to="/settings" onClick={this.handleClick}>
                                Settings
                            </Link>
                            <Link to="/" onClick={this.logout}>
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <div className="bar-con" onClick={this.updateisOpen}>
                            <div className="bar1" />
                            <div className="bar2" />
                            <div className="bar3" />
                        </div>
                    )}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default withCookies(Nav);
