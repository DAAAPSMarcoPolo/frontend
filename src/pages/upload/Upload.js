import {React, Component} from 'react'
import {Redirect} from "react-router-dom";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null
        }
    }

    async handleFileSelection() {
        // TODO: modify state to handle uploaded file
    }

    async handleFileUpload() {
        // TODO: make API call to upload file to backend
    }

    render() {
        const {cookies} = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        // TODO: Remove after development
        // if (isAuthenticated === "false" || !isAuthenticated) {
        //     return (<Redirect to="/login"/>);
        // }

        return (
            <div>
                <div>Placeholder for file uploader</div>
                <div>Placeholder for status checking</div>
            </div>
        )
    }
}

export default Upload;