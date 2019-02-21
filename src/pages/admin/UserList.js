import React, {Component} from 'react';
import plus from '../../assets/images/plus-icon.png';
import remove from '../../assets/images/delete-icon.png';
import x from '../../assets/images/x-icon.png';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            showConfirm: false,
            user: ''
        };
        this.showConfirm = this.showConfirm.bind(this);
        this.removeUserWrap = this.removeUserWrap.bind(this);
    };
    showConfirm = (user) => (e) => {
      e.persist();
      console.log("e", e, "user", user);
      this.setState({showConfirm: !this.state.showConfirm, user});
    };
    removeUserWrap = (e) => {
      this.setState({showConfirm: !this.state.showConfirm, user: ''});
      this.props.removeUser(e, this.state.user);
      this.forceUpdate();
    };

    /*Controls the appearance and state of the button to delete a user*/
    render() {
      let mappedUsers;
      if (this.props.users !== null) {
        mappedUsers = this.props.users.map((user, i) =>
         <li className="li rel" key={i}>
            <div className="rel">{user.username}
                <img className="icon" src={remove} alt="remove-icon" onClick={this.showConfirm(user)}/>
            </div>
         </li>
       );
      } else {
        mappedUsers = (<div>Retrieving users</div>);
      }
      return (
        <div>
          {mappedUsers}
          {this.state.showConfirm ?
            <div className="overlay rel">
              <p>Are you sure you want to delete {this.state.user}?</p>
              <img className="icon" src={x} alt="x-icon" onClick={this.showConfirm(this.state.user)}/>
              <button onClick={this.removeUserWrap}>Confirm</button>
            </div>
          :
          null}
        </div>
      );
    }
};

export default UserList;
