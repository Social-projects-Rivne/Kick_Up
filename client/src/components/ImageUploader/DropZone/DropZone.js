import React, { Component } from "react";

import "./DropZone.scss";
import uploadImage from "../../../assets/images/upload-cloud.svg";

class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hightlight: false,
        };
        this.fileInputRef = React.createRef();
    }

    openFileDialog = (event) => {
        console.log('openFileDialog', this.props.disabled)
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded = (evt) => {
        console.log('onFilesAdded evt', evt.target)
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    onDragOver = (event) => {
        event.preventDefault();
        if (this.props.disabled) return;
        this.setState({ hightlight: true });
    }

    onDragLeave = (event) => {
        this.setState({ hightlight: false });
    }

    onDrop = (event) => {
        event.preventDefault();
        if (this.props.disabled) return;
        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        this.setState({ hightlight: false });
    }

    fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }
    componentDidMount() {
        console.log('component did mount');
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
                <label htmlFor="test">test</label>
                <input
                    ref={this.fileInputRef}
                    id="test"
                    className="FileInput"
                    type="file"
                    accept="image/png, image/gif, image/jpg"
                    maxSize={5242880}
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