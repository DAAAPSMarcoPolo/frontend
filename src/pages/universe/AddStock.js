import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { withCookies } from 'react-cookie';

class AddStock extends Component{
    constructor(props){
        super(props);
        this.state = {
            newstockname:null
        };
        this.add = this.add.bind();
    }

    add = async (e, thing) => {
        e.preventDefault();
        e.persist();
        if (e.target.newstockname !== null && e.target.newstockname !== ""){
            console.log("Adding stock", e.target.newstockname.value);
            console.log(thing)
        }
    };

    render(){
        const thing = "foo";
        return (
            <div>
                <h2>Add a stock</h2>
                <form onSubmit={event => this.add(event, thing)}>
                    <input type="text" name="newstockname"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
};

export default withCookies(AddStock);