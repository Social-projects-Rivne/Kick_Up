import React, { Component } from "react";

import uploadImage from "../../../assets/images/upload-cloud.svg";

class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hightlight: false,
        };
        this.fileInputRef = React.createRef();
    }

    openFileDialog = event => {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded = event => {
        if (this.props.disabled) return;
        const files = event.target.files;
        if (this.props.onFilesAdded) {
            this.props.onFilesAdded(Object.values(files));
        }
        event.target.value = null;
    }

    onDragOver = event => {
        event.preventDefault();
        if (this.props.disabled) return;
        this.setState({ hightlight: true });
    }

    onDragLeave = event => {
        this.setState({ hightlight: false });
    }

    onDrop = event => {
        event.preventDefault();
        if (this.props.disabled) return;
        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
            this.props.onFilesAdded(Object.values(files));
        }
        this.setState({ hightlight: false });
    }

    render() {
        return (
            <div
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    accept="image/png, image/gif, image/jpg, image/jpeg"
                    multiple
                    onChange={this.onFilesAdded}
                />
                <div className="lds-css ng-scope">
                    <div style={{ width: "100%", height: "100%" }} className="lds-eclipse">
                        {this.props.isUploading && <div></div>}
                        <div className="icon-wrapper"
                            onClick={this.openFileDialog}>
                            <img
                                alt="upload"
                                className="icon"
                                src={uploadImage}
                            />
                            <span>Upload Files</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dropzone;