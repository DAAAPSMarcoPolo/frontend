import React, {Component} from 'react'
import '../../assets/upload.css';
import '../../App.css';


class FileSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: ""
        }
    }

    filename = () => {
        if (this.props.file != null) {
            return this.props.file.name
        } else {
            return ""
        }
    };

    render() {
        let labelValue;
        if (this.props.filename == null) {
            labelValue = "Choose algorithm here";
        } else {
            labelValue = this.props.filename;
        }

        return (
            <div>
                <input className="file-upload" type="file" name="file" id="file"
                       onChange={this.props.handleFileSelection}/>
                <label htmlFor="file">{labelValue}</label>
            </div>
        )
    }
}

export default FileSelection;