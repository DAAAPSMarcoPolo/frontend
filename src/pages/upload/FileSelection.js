import React from 'react'
import '../../assets/upload.css';
import '../../App.css';

const FileSelection = ({ handleFileSelection, handleFileUpload, fileName, file }) => (
  <div>
    <form onSubmit={handleFileSelection}>
        <input type="text" name="name" placeholder="Name" required/>
        <input type="text" name="description" placeholder="Description" required/>
        <input className="file-upload" type="file" name="file" id="file" onChange={handleFileSelection}/>
        <label htmlFor="file">{fileName}</label>
        {file &&
          <button id="upload-button">
            Upload Algorithm
          </button>
        }
    </form>
  </div>
);

export default FileSelection;
