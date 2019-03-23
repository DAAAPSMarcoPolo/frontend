import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Backtest from './Backtest';
import Stats from './Stats';
import '../../assets/algo.css';

class AlgorithmDetail  extends Component {
    ComponentDidMount() {
      // pull list of algorithms
    }
    render() {
        return (
            <div className="">
              <Stats/>
              <Backtest/>
            </div>
        )
    }
}

export default AlgorithmDetail;