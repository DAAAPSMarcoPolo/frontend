//Module Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

//Custom Dependencies
import FileSelection from './FileSelection';
import api from '../../utils/api.js';
import '../../assets/upload.css';
import '../../App.css';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            filename: null,
            uploadButtonStatus: 'Disabled'
        };
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.showUploadButton = this.showUploadButton.bind(this);
    }

    async handleFileSelection(e) {
        e.preventDefault();
        e.persist();
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        this.setState({ files: uploadedFile, filename: uploadedFile.name });
        this.showUploadButton();
    }

    async handleFileUpload(e) {
        e.preventDefault();
        e.persist();
        // TODO: make API call to upload file to backend
        if (this.state.files != null) {
            this.setState({ uploadButtonStatus: 'Uploading' });
            console.log('Sending file to backend');
            const formData = new FormData();
            formData.append('strategy_file', this.state.files);
            const response = await api.PostFile('/algofile/', formData);
            console.log(response);
            if (response.status === 200) {
                this.setState({
                    files: null,
                    filename: null,
                    uploadButtonStatus: 'Uploaded'
                });
            } else {
                this.setState({
                    files: null,
                    filename: null,
                    uploadButtonStatus: 'Error'
                });
            }
        } else {
            console.log('No file chosen to upload');
        }
    }

    showUploadButton = () => {
        this.setState({ uploadButtonStatus: 'Enabled' });
    };

    render() {
        const { cookies } = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        // TODO: Remove after development
        // if (isAuthenticated === "false" || !isAuthenticated) {
        //     return (<Redirect to="/login"/>);
        // }
        console.log(this.state.uploadButtonStatus);
        let uploadButton;
        if (this.state.uploadButtonStatus === 'Enabled') {
            uploadButton = (
                <button id="upload-button" onClick={this.handleFileUpload}>
                    Upload Algorithm
                </button>
            );
        } else if (this.state.uploadButtonStatus === 'Disabled') {
            uploadButton = (
                <button
                    id="upload-button"
                    onClick={this.handleFileUpload}
                    disabled
                >
                    Select file above
                </button>
            );
        } else if (this.state.uploadButtonStatus === 'Uploading') {
            uploadButton = (
                <button
                    id="upload-button"
                    onClick={this.handleFileUpload}
                    disabled
                >
                    Uploading...
                </button>
            );
        } else if (this.state.uploadButtonStatus === 'Uploaded') {
            uploadButton = (
                <button
                    id="upload-button"
                    onClick={this.handleFileUpload}
                    disabled
                >
                    Uploaded!
                </button>
            );
        } else if (this.state.uploadButtonStatus === 'Error') {
            uploadButton = (
                <button
                    id="upload-button"
                    onClick={this.handleFileUpload}
                    disabled
                >
                    ERROR UPLOADING
                </button>
            );
        }

        return (
            <div className="algo-upload-con">
                <FileSelection
                    handleFileSelection={this.handleFileSelection}
                    handleFileUpload={this.handleFileUpload}
                    filename={this.state.filename}
                />
                {uploadButton}
            </div>
        );
    }
}

export default withCookies(Upload);
