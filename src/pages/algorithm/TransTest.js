import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';
import TransactionList from "./TransactionList";

class TransTest extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div>
                <TransactionList backtestId={35}/>
            </div>
        )
    }

}

export default withCookies(TransTest)