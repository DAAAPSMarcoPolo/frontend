import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../assets/notfound.css';

class NotFound extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="not-found-container">
                <h1>404?!</h1>
                <h2>Oh Noes! Looks like you've lost your way!</h2>
                <Link className="not-found-link" to="/dashboard" onClick={this.handleClick}>Lets go back home</Link>
            </div>
        )
    }
}

export default NotFound;
