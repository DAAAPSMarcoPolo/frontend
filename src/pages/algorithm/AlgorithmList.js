import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../../assets/algo.css';

class AlgorithmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Backtest Complete",
            algolist: [
              {
                  "name": "Algorithm 2",
                  "date-created": "2019-02-03T08:15:30-05:00",
                  "recent-activity": "2019-03-06T08:15:30-05:00"
              },
              {
                  "name": "Algorithm 2",
                  "date-created": "2019-02-03T08:15:30-05:00",
                  "recent-activity": "2019-03-06T08:15:30-05:00"
              },
              {
                  "name": "Algorithm 3",
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
                { this.state.algolist.map((algo, i) => <Link to={`/algorithms/${algo.name}`}><li className="con" key={i}>{algo.name}</li></Link> ) }
              </ul>
            </div>
        )
    }
}

export default AlgorithmList;
