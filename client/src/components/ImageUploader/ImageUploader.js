import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';

class ImageUploader extends Component {

    state = {
        selectedFile: null,
    }

    fileSelectedHandler = event => {
        console.log(event.target.files)
        this.setState({ selectedFile: event.target.files[0] })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        const entity_id = 1;
        // const entity_id = event.target.files[0].astModified + event.target.files[0].size;
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('/api/upload/' + this.props.entityType + '/' + entity_id, fd)
            .then(res => {
                console.log(res)
            })
    }
    render() {
        return (
            <div className="image-uploader-form">
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        )
    }
}

export default ImageUploader;