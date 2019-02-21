import React, {Component} from 'react';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            error: null,
            currentConfirmation:""
        };
        this.confirmUser = this.confirmUser.bind(this);

    };

    confirmUser(e, username){
        console.log("Confirming user: " + username);
        this.setState({currentConfirmation:username});
    };

    removeUser(e, user){
        this.props.removeUser(e, user);
        this.setState({currentConfirmation: ""});
    }

    /*Controls the appearance and state of the button to delete a user*/
    userOption(user){
        let removeUserButton;
        if (this.state.currentConfirmation === user){
            removeUserButton = (
                <div>{user}
                    <button onClick={(e) => this.removeUser(e, user)}>Confirm Removing: {user}</button>
                </div>
            )
        } else {
            removeUserButton = (
                <div>{user}
                    <button onClick={(e) => this.confirmUser(e, user)}>Remove User: {user}</button>
                </div>
            )
        }
        return removeUserButton;
    }

    /*Renders a list of users*/
    userList() {
        let mappedUsers;
        if (this.props.users !== null){
            mappedUsers = this.props.users.map((user, i) => {
                return(
                <li key={i}>
                    <div>
                        {this.userOption(user.username)}
                    </div>
                </li>
                )
            });
        } else {
            mappedUsers = (<div>Retrieving users</div>);
        }
        return <div>{mappedUsers}</div>;
    }

    render() {
        return this.userList()
    }
}

export default UserList;