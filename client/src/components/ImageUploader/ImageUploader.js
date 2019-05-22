import React, { Component } from "react";
import axios from 'axios';

import Dropzone from "./DropZone/DropZone";
import check from "../../assets/images/uploaded-check.svg";
import { Button } from "@material-ui/core";
import { DeleteForeverOutlined, Close } from '@material-ui/icons';

class ImageUploader extends Component {

  state = {
    files: [],
    deleteFile: false,
    uploading: false,
    uploadProgress: {},
    limitFiles: false,
    successfullUploaded: false
  };

  onFilesAdded = (files) => {
    console.log(files);
    const addedFiles = [...this.state.files].concat(files);
    if (addedFiles.length < 10) {
      this.setState({
        files: addedFiles,
        limitFiles: false
      });
    } else {
      this.setState({limitFiles: true})
    }
  }

  uploadFiles = (event) => {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file, index) => {
        promises.push(setTimeout(() => this.sendRequest(file), 500 * index));
    });
    // try {
    //   Promise.all(promises);

    //   this.setState({ successfullUploaded: true, uploading: false });
    // } catch (e) {
    //   // Not Production ready! Do some error handling here instead...
    //   this.setState({ successfullUploaded: true, uploading: false });
    // }
  }

  sendRequest = (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    axios.post('/api/upload' + this.props.entityURL, formData, {
        onUploadProgress: progressEvent => {
            console.log("pending")
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = {
                state: "pending",
                percentage: (progressEvent.loaded / progressEvent.total) * 100
            };
            this.setState({ uploadProgress: copy });
            console.log('progressEvent', progressEvent);
        }
    })
        .then(res => {
            console.log("done")
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy, successfullUploaded: true });
            setTimeout(() => this.setState({ uploading: false }), 1000);
            console.log(res)
        })
        .catch(error => {
           console.log(error);
           this.setState({ successfullUploaded: true, uploading: false });
        })
  }

  deleteFile = (file) => () => {
    let CopyFiles = [ ...this.state.files ];
    const files = CopyFiles.filter(e => {
      return e.name !== file.name
    });
    this.setState({files});
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
        <Button
            variant="outlined"
            onClick={() =>
            this.setState({ files: [], successfullUploaded: false, limitFiles: false })
          }
        >
          Clear
        </Button>
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
              {this.state.files.map(file => {
                return (
                  !file.deletedFile && 
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {!this.renderProgress(file) && <DeleteForeverOutlined className="delete-icon" onClick={this.deleteFile(file)} />}
                    {this.renderProgress(file)}
                  </div>
                );
              })}
              {this.state.limitFiles && <div className="Row"><span className="limit-files">You can upload less than 10 files in one time!</span></div>}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
      </div>

    return (
      <>
        <Button />
        {this.props.show ? 
        <div className="upload-wrapper" 
          onClick={this.props.closeUploadComponent}
          >
            {uploadCard}
        </div> :
        null}
      </>
    );
  }
}

export default ImageUploader;
