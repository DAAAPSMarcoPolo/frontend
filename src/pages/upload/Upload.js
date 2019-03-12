//Module Dependencies
import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {withCookies} from 'react-cookie';

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
            showUploadButton: false
        };
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.showUploadButton = this.showUploadButton.bind(this);

    };

    async handleFileSelection(e) {
        e.preventDefault();
        e.persist();
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        this.setState({files: uploadedFile, filename: uploadedFile.name});
        this.showUploadButton();
    };

    async handleFileUpload(e) {
        e.preventDefault();
        e.persist();
        // TODO: make API call to upload file to backend
        if (this.state.files != null) {
            console.log("Sending file to backend");
            const body = {
                "strategy_file":this.state.files
            };
            const response = await api.Post('/algofile/', body);
            console.log(response);
            if (response.status == 200){
                this.setState({files:null, filename:null, showUploadButton:false});
            }
        } else {
            console.log("No file chosen to upload");
        }
    };

    showUploadButton = () => {
        this.setState({showUploadButton: !this.state.showUploadButton});
    };

    render() {
        const {cookies} = this.props;
        const isAuthenticated = cookies.get('isAuthenticated');
        const isAdmin = cookies.get('isAdmin');
        // TODO: Remove after development
        // if (isAuthenticated === "false" || !isAuthenticated) {
        //     return (<Redirect to="/login"/>);
        // }

        let uploadButton;
        if (this.state.showUploadButton === true) {
            uploadButton = <button id="upload-button" onClick={this.handleFileUpload}>Upload Algorithm</button>
        } else {
            uploadButton = <button id="upload-button" onClick={this.handleFileUpload} disabled>Upload Algorithm</button>
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