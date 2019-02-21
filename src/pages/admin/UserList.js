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

    userOption(user){
        let removeUserButton;
        if (this.state.currentConfirmation === user){
            removeUserButton = (
                <div>{user}
                    <button onClick={(e) => this.props.removeUser(e, user)}>Confirm Removing: {user}</button>
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

    userList() {
        /*const mappedUsers = this.props.users.map((user) =>
            <li>
                <div>
                    {this.userOption(user)}
                </div>
            </li>
        );*/
        return <div>something here</div>;
    }

    render() {
        return this.userList()
    }
};

/*const UserList = ({users, removeUser}) => {
    const userList = users.map((user) =>
        <li>
            <div>
                {user}<button onClick={(e) => removeUser(e, user)}>Remove User: {user}</button>
            </div>
        </li>
    );
    return (
        <div>
            <ul>
                {userList}
            </ul>
        </div>
    );
};*/

export default UserList;