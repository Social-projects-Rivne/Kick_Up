import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from 'axios';

import Dropzone from "./DropZone/DropZone";
import check from "../../assets/images/uploaded-check.svg";
import { Button } from "@material-ui/core";
import { DeleteForeverOutlined, Close } from '@material-ui/icons';

class ImageUploader extends Component {

  state = {
    files: [],
    rejectedFiles: [],
    deleteFile: false,
    uploading: false,
    uploadProgress: {},
    limitFiles: false,
    successfullUploaded: false,
    error: null,
    imagesSRC: []
  };

  onFilesAdded = (files) => {
    const maxSize = 1048576;
    const maxFiles = 5;
    let validatedFiles = [];
    let rejectedFiles = [];
    const currentFiles = [...this.state.files, ...this.state.rejectedFiles];
    const filteredFiles = files.filter(e => {
      return !currentFiles.find(file => file.name === e.name)
    })
    filteredFiles.map(e => {
      if (e.size < maxSize) {
        validatedFiles.push(e)
      } else {
        rejectedFiles.push(e)
      }
    })
    const addedFiles = [...this.state.files].concat(validatedFiles);
    const addedRejectedFiles = [...this.state.rejectedFiles].concat(rejectedFiles);
    if (addedFiles.length <= maxFiles) {
      this.setState({
        files: addedFiles,
        limitFiles: false
      });
    } else {
      this.setState({limitFiles: true})
    }
    if (addedRejectedFiles.length <= maxFiles) {
      this.setState({ rejectedFiles: addedRejectedFiles });
    }
  }

  uploadFiles = (event) => {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file, index) => {
        promises.push(setTimeout(() => this.sendRequest(file), 500 * index));
    });
  }

  sendRequest = (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    axios.post('/api/upload' + this.props.entityURL, formData, {
        onUploadProgress: progressEvent => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = {
                state: "pending",
                percentage: (progressEvent.loaded / progressEvent.total) * 100
            };
            this.setState({ uploadProgress: copy });
        }
    })
        .then(res => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy, successfullUploaded: true });
            setTimeout(() => this.setState({ uploading: false }), 1000);
            const imageSRC = res.data;
            const imagesSRC = [...this.state.imagesSRC].concat({src:imageSRC, thumbnail:imageSRC});
            this.setState({imagesSRC});
            this.props.getImagesSRC(this.state.imagesSRC);
        })
        .catch(error => {
           console.log(error);
           this.setState({ error: "Ooops! Something were wrong!", successfullUploaded: true, uploading: false });
        })
  }

  deleteFile = (file) => () => {
    let CopyFiles = [ ...this.state.files ];
    const files = CopyFiles.filter(e => {
      return e.name !== file.name
    });
    this.setState({files});
  }

  deleteSizeFile = (file) => () => {
    let CopyFiles = [ ...this.state.rejectedFiles ];
    const rejectedFiles = CopyFiles.filter(e => {
      return e.name !== file.name
    });
    this.setState({rejectedFiles});
  }

  renderProgress = (file) => {
    const uploadProgress = this.state.uploadProgress[file.name];
    const progress = uploadProgress ? uploadProgress.percentage : 0;
    const progressBar = 
      <div className="ProgressBar">
        <div
          className="Progress"
          style={{ width: progress + "%" }}
        />
      </div>
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          {progressBar}
          <img
            className="CheckIcon"
            alt="done"
            src={check}
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <>
        <p className="actions-success">All files successful uploaded!</p>
        <Button
            variant="outlined"
            onClick={() =>
            this.setState({ 
              files: [], 
              rejectedFiles: [], 
              imagesSRC: [],
              successfullUploaded: false, 
              limitFiles: false, 
              error: null })
          }
        >
          Clear
        </Button>
        </>
      );
    } else {
      return (
        <Button
            variant="outlined"
            disabled={this.state.files.length <= 0 || this.state.uploading}
            onClick={this.uploadFiles}
        >
          Upload
        </Button>
      );
    }
  }

  render() {
    const renderSignIn = 
      <div className="upload-card">
          <p>Please SignUp or SignIn!</p>
          <div className="upload-card-links">
            <Link to={"/sign-up"} className="upload-card-link" >SignUp</Link>
            <Link to={"/sign-in"} className="upload-card-link" >SignIn</Link>
          </div>
      </div>;
    
    const renderNotMember = 
      <div className="upload-card">
        <p>Only members can upload images!</p>
    </div>;

    const uploadCard = 
      <div className="upload-card" onClick={(event) => event.stopPropagation()} >
        <Close className="upload-card-close" onClick={this.props.closeUploadComponent} />
        <div className="upload">
          <div className="Content">
            <div className="dropzone-wrapper">
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.state.uploading || this.state.successfullUploaded}
                isUploading={this.state.uploading}
              />
            </div>
            <div className="Files">
              {this.state.limitFiles && <div className="row row-limit"><span className="limit-files">You can upload max 5 files at once!</span></div>}
              {this.state.files.map(file => {
                return (
                  !file.deletedFile && 
                  <div key={file.name} className="row">
                    <span className="Filename">{file.name}</span>
                    {!this.renderProgress(file) && <DeleteForeverOutlined className="delete-icon" onClick={this.deleteFile(file)} />}
                    {this.renderProgress(file)}
                  </div>
                );
              })}
              {this.state.rejectedFiles.map(file => {
                return (
                  <div key={file.name} className="row">
                    <span className="Filename file-size">{file.name}</span>
                    <DeleteForeverOutlined className="delete-icon" onClick={this.deleteSizeFile(file)} />
                    <div className="limit-files">Max size 1mb!</div>
                  </div>
                );
              })}
            </div>
          </div>
          {this.state.error && <p className="upload-error">{this.state.error}</p>}
          <div className="actions">{this.renderActions()}</div>
        </div>
      </div>

    return (
      <>
        {this.props.show ? 
        <div className="upload-wrapper" 
          onClick={this.props.closeUploadComponent}
          >
            {!this.props.isAuthenticated ? 
              renderSignIn : 
              (this.props.authUser ? uploadCard : renderNotMember)
            }
        </div> :
        null}
      </>
    );
  }
}

export default ImageUploader;
