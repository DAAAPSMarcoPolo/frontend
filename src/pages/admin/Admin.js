import React, {Component} from 'react';
import AddUserForm from './AddUserForm'
import {Redirect} from 'react-router-dom';
import './admin.css';

/*TODO: Remove this for production*/
const mockUsers = [
    "Abigail",
    "Danny",
    "Audrey",
    "Sean",
    "Avnish",
    "Pranay"
];

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            error: null,
            showAdd: true
        };
        this.showAddUser = this.showAddUser.bind(this);
        this.hideAddUser = this.hideAddUser.bind(this);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        e.persist();
    };

    userList = mockUsers.map((user) =>
        <li>{user}</li>
    );

    showAddUser() {
        this.setState({showAdd: true})
    };

    hideAddUser() {
        this.setState({showAdd: false})
    };

    render() {
        if (this.state.redirectToReferrer === true) {
            return (<Redirect to="/dashboard"/>);
        }
        let adduseroption;
        if (this.state.showAdd === false) {
            adduseroption = <button onClick={this.showAddUser}>Add new user</button>
        } else {
            adduseroption = (
                <div>
                    <AddUserForm/>
                    <button onClick={this.hideAddUser}>Hide</button>
                </div>
            )
        }
        return (
            <div className="page bgorange temptext">
                <div className="logo">
                    simplif.ai
                </div>
                <h1>Admin Tools</h1>
                <div>
                    <ul>
                        {this.userList}
                    </ul>
                </div>
                <div>
                    {adduseroption}
                </div>
            </div>
        );
    }
}

export default Admin;
