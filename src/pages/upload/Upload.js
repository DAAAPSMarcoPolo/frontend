import React, { Component } from 'react';
import FileSelection from './FileSelection';
import { Redirect } from 'react-router-dom';

import api from '../../utils/api.js';
import '../../assets/upload.css';
import '../../App.css';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            filename: null,
            algoName : null,
            algoDescription: null,
            uploadButtonStatus: 'Disabled'
        };
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleAlgoName = this.handleAlgoName.bind(this);
        this.handleAlgoDescription = this.handleAlgoDescription.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.showUploadButton = this.showUploadButton.bind(this);
    }

    handleFileSelection(e) {
        e.preventDefault();
        e.persist();
        const uploadedFile = e.target.files[0];
        this.setState({ files: uploadedFile, filename: uploadedFile.name });
        if (this.state.algoName != null &&
            this.state.algoDescription != null){
            this.showUploadButton();
        }
    }

    handleAlgoName(e) {
        e.preventDefault();
        e.persist();
        const algoName = e.target.value;
        this.setState({ algoName: algoName});
        if (this.state.files != null &&
            this.state.algoDescription != null){
            this.showUploadButton();
        }
    }

    handleAlgoDescription(e) {
        e.preventDefault();
        e.persist();
        const algoDescription = e.target.value;
        this.setState({ algoDescription: algoDescription});
        if (this.state.files != null &&
            this.state.algoName != null){
            this.showUploadButton();
        }
    }

    async handleFileUpload(e) {
        e.preventDefault();
        e.persist();
        if (this.state.files != null &&
                this.state.algoName != null &&
                this.state.algoDescription != null) {
            this.setState({ uploadButtonStatus: 'Uploading' });
            console.log('Sending file to backend');
            const formData = new FormData();
            formData.append('strategy_file', this.state.files);
            formData.append('name', this.state.algoName);
            formData.append('description', this.state.algoDescription);
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
                    handleAlgoName={this.handleAlgoName}
                    handleAlgoDescription={this.handleAlgoDescription}
                    handleFileUpload={this.handleFileUpload}
                    filename={this.state.filename}
                />

                {uploadButton}
            </div>
        );
    }
}

export default Upload;
