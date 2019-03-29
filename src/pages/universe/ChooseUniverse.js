import React, { Component } from 'react';
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
            universeName: null,
            universeList: null
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
        if (response.status !== 200){
          this.setState({ error:response.statusText });
          setTimeout(() => { this.setState({error: null}); }, 5000);
        } else {
          this.setState({universeList: response.data});
        }
    };
    hide = () => { this.setState({ showUniverse: !this.state.showUniverse })};
    selectUniverse = (name, id, e) => {
      if (this.state.universe) {
        if (this.state.showUniverse) {
          this.setState({ showUniverse: false, universeName: name, universe: id });
          this.props.selectUniverse(id, e);
        } else {
          this.setState({ showUniverse: true, universeName: null, universe: null });
        }
      } else  {
        this.setState({ showUniverse: false, universeName: name, universe: id });
        this.props.selectUniverse(id, e);
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
                      <div key={item.id} className='panel-title'  onClick={(e) => this.selectUniverse(item.name, item.id, e)}>
                        {item.name}
                      </div>
                  ))}
                  {this.state.universe &&
                    <button className='greenButton'  onClick={(e) => this.selectUniverse(this.state.universe, this.state.universe, e)}>
                      {this.state.universeName}
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
