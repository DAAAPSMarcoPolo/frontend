import React, {Component} from 'react';
import remove from '../../assets/images/delete-icon.png';
import x from '../../assets/images/x-icon.png';
import add from '../../assets/images/plus-circle-icon.png';
import AddUserForm from './AddUserForm';
import {apiFetch, apiPost, apiGet, apiDelete} from '../../utils/api';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showConfirm: false,
            user: '',
            showAdd: false
        };
        this.showConfirm = this.showConfirm.bind(this);
        this.removeUserWrap = this.removeUserWrap.bind(this);
        this.showAddUser = this.showAddUser.bind(this);
        this.handleSubmitNewUser = this.handleSubmitNewUser.bind(this);
    };

    componentDidMount() {
        console.log('users', this.props.users);
    }

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
    showAddUser = () => {
        this.setState({showAdd: !this.state.showAdd})
    };

    handleSubmitNewUser = async (e) => {
        e.preventDefault();
        e.persist();
        console.log(`username: ${e.target.username.value}`);
        console.log(`password: ${e.target.password.value}`);
        const formData = {
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            }),
            method: 'POST'
        };
        const data = await apiFetch('/auth/adduser/', formData)
            .then(res => {
                return res.json().then(data => {
                    return {data}
                })
            });
        console.log(data);
        this.props.getUsersList();
        this.setState({showAdd: !this.state.showAdd});
    };

    /*Controls the appearance and state of the button to delete a user*/
    render() {
        let mappedUsers;
        if (this.props.users != null) {
            console.log(this.props.users);
            mappedUsers = this.props.users.map((user, i) =>
                <li className="li rel" key={i}>
                    <div className="rel">{user.username} • {user.is_active ? 'active' : 'inactive'}
                        {this.props.isAdmin === "true" ? <img className="icon" src={remove} alt="remove-icon"
                                                              onClick={this.showConfirm(user.username)}/> : null}
                    </div>
                </li>
            );
        } else {
            mappedUsers = (<div>Retrieving users</div>);
        }
        return (
            <div className="con rel">
                <h2 className="serif">Team Roster</h2>
                {this.props.isAdmin === "true" ?
                    <img src={this.state.showAdd ? x : add} className="icon roster" alt="plus-icon"
                         onClick={this.showAddUser}/> : null}
                {mappedUsers}
                {this.state.showConfirm ?
                    <div className="overlay rel">
                        <p>Are you sure you want to delete {this.state.user}?</p>
                        <img className="icon" src={x} alt="x-icon" onClick={this.showConfirm(this.state.user)}/>
                        <button onClick={this.removeUserWrap}>Confirm</button>
                    </div>
                    :
                    null}
                {this.state.showAdd ? (
                    <AddUserForm addUser={this.handleSubmitNewUser}/>
                ) : null}
                <div className="errorClass">
                    {this.props.error ? this.props.error : null}
                </div>
            </div>
        );
    }
};

export default UserList;
