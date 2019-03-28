import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../../assets/algo.css';
import Algo from '../components/Algo';

class AlgorithmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Backtest Complete",
            algolist: [
              {
                  "name": "Algorithm 2",
                  "strategy": 34,
                  "date-created": "2019-02-03T08:15:30-05:00",
                  "recent-activity": "2019-03-06T08:15:30-05:00"
              },
              {
                  "name": "Algorithm 2",
                  "strategy": 34,
                  "date-created": "2019-02-03T08:15:30-05:00",
                  "recent-activity": "2019-03-06T08:15:30-05:00"
              },
              {
                  "name": "Algorithm 3",
                  "strategy": 34,
                  "date-created": "2019-02-03T08:15:30-05:00",
                  "recent-activity": "2019-03-06T08:15:30-05:00"
              }
            ]
        }
    }
    render() {
        return (
            <div className="">
              <ul className="list">
                { this.state.algolist.map((algo, i) => <Link className="transform" to={`/algorithms/${algo.strategy}`}><Algo key={i} name={algo.name}/></Link> ) }
              </ul>
            </div>
        )
    }
}

export default AlgorithmList;
