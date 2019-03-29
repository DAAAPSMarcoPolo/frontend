import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import api from '../../utils/api';
import '../../assets/algo.css';
import Algo from '../components/Algo';

class AlgorithmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Backtest Complete",
            error: null,
            algolist: null
        }
        this.getAlgorithmList = this.getAlgorithmList.bind(this);
    }
    componentDidMount() {
      this.getAlgorithmList();
    }
    getAlgorithmList = async () => {
      // GET /api/algorithm/
      const res = await api.Get('/algorithm/');
      console.log(res);
      if (res.status !== 200) {
        this.setState({ error:res.statusText});
      } else {
        this.setState({ algolist: res.data });
        console.log(res.data)
      }
      setTimeout(() => { this.setState({error: null}); }, 5000);
    };
    render() {
        return (
            <div className="">
              <div className="errorClass"> {this.state.error && this.state.error} </div>
              <ul className="list">
                {this.state.algolist && this.state.algolist.map((algo, i) =>
                  <Link className="transform" to={`/algorithms/${algo.algo_details.id}`}>
                    <Algo
                      key={i}
                      name={algo.algo_details.name}
                      algoId={algo.algo_details.id}
                      description={algo.algo_details.description}
                      user={algo.algo_details.user}
                      created_at={algo.algo_details.created_at}
                      approved={algo.algo_details.approved}
                      best_backtest={algo.best_backtest.id}
                      start={algo.best_backtest.initial_cash}
                      end={algo.best_backtest.end_cash}
                      sharpe={algo.best_backtest.sharpe}
                      complete={algo.best_backtest.complete}
                    />
                  </Link> )
                }
              </ul>
            </div>
        )
    }
}

export default AlgorithmList;
