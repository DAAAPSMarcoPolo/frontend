import React, {Component} from 'react';
import plus from '../../assets/images/plus-icon.png';
import remove from '../../assets/images/delete-icon.png';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            currentConfirmation: ""
        };
        this.confirmUser = this.confirmUser.bind(this);
    };
    confirmUser(e, username){
        console.log("Confirming user: " + username);
        this.setState({currentConfirmation:username});
    };
    render() {
        const mappedUsers = this.props.users.map((user) =>
          <li className="li">
            <div>
              {this.state.currentConfirmation === user ?
                <div className="rel">{user}
                    <img className="icon" src={plus} alt="plus-icon" onClick={(e) => this.props.removeUser(e, user)}/>
                </div>
              :
              <div className="rel">{user}
                  <img className="icon" src={remove} onClick={(e) => this.confirmUser(e, user)}/>
              </div>
              }
            </div>
          </li>
      );
      return mappedUsers;
    }
};

export default UserList;
