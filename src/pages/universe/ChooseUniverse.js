import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import '../../assets/universe.css'
import drop from '../../assets/images/drop-icon.png';

class ChooseUniverse extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            showUniverse: null,
            universe: null,
            universeList: null,
            mockUniverseList : [
                "Universe 1",
                "Universe 2",
                "Universe 3",
                "Universe 4"
            ]
        };
        this.getUniverses = this.getUniverses.bind();
        this.selectUniverse = this.selectUniverse.bind();
    }
    componentDidMount() {
      this.getUniverses();
    }
    getUniverses = async ()=> {
        //TODO: call API to get the universe list
        const response = await api.Get('/universe/');
        console.log(response);
        if (response.status !== 200){
          this.setState({ error:response.statusText });
          setTimeout(() => {
            this.setState({error: null});
          }, 5000)
        } else {
          this.setState({universeList: response.data});
          console.log("response.data", response.data);
        }
    };
    hide = () => { this.setState({ showUniverse: !this.state.showUniverse })};
    selectUniverse = (name) => {
      if (this.state.universe) {
        if (this.state.showUniverse) {
          this.setState({ showUniverse: false, universe: name });
        } else {
          this.setState({ showUniverse: true, universe: null });
        }
      } else  {
        this.setState({ showUniverse: false, universe: name });
      }
    };
    render() {
        if (this.state.universeList != null) {
            return (
                <div className="rel choose-universe">
                  <label className="hover" onClick={this.hide}>Choose your Universe</label>
                  <img
                      className="icon drop-icon"
                      src={drop}
                      alt="drop-icon"
                      onClick={this.hide}
                  />
                  <div className="errorClass"> {this.state.error && this.state.error} </div>
                  {this.state.showUniverse && this.state.universeList.map((item) => (
                      <div key={item} className='panel-title'  onClick={(name) => this.selectUniverse(item.name)}>
                        <a>{item.name}</a>
                      </div>
                  ))}
                  {this.state.universe &&
                    <button className='greenButton'  onClick={(name) => this.selectUniverse(this.state.universe)}>
                      <a>{this.state.universe}</a>
                    </button>
                  }
                </div>
            );
        } else {
            return <div>Loading Universes</div>
        }
    }
}

export default ChooseUniverse;
