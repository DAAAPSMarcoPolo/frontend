import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import '../../assets/universe.css'

class ChooseUniverse extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            selectUniverse: null,
            universeList: null,
            mockUniverseList : [
                "Universe 1",
                "Universe 2",
                "Universe 3",
                "Universe 4"
            ]
        };
        this.getUniverses = this.getUniverses.bind();
        this.toggleSelectUniverse = this.toggleSelectUniverse.bind();
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
    toggleSelectUniverse = () => {
      if (!this.state.selectUniverse) {
        this.setState({ selectUniverse: 'selected'});
      } else {
        this.setState({ selectUniverse: null });
      }
    };
    render(){
        if (this.state.universeList != null){
            return (
                <div className="panel-group panel-overflow">
                <div className="errorClass"> {this.state.error && this.state.error} </div>
                    {this.state.universeList.map((item) => (
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle={`collapse ${this.state.selectUniverse}`} onClick={this.toggleSelectUniverse}>{item.name}</a>
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
        );
        } else {
            return <div>Loading Universes</div>
        }
    }
}

export default ChooseUniverse;
