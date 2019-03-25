
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';
import UniverseList from './UniverseList'

class Universe extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        if (isAuthenticated === 'false' || !isAuthenticated) {
            return <Redirect to="/login" />;
        }

        return (
            <div>
                <UniverseList/>
            </div>
        )
    }
};

export default withCookies(Universe);