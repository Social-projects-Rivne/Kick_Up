import React from "react";

import AvatarCropper from 'react-avatar-edit';

const _maxFileSize = 10000000;
const _desktopWidth = 1168;

class EditProfileAvatarCropper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          src: '',
          croppedImg: null
      }

      this.onCrop = this.onCrop.bind(this)
      this.onClose = this.onClose.bind(this)
      this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }
    onClose(elem) {
        this.setState({croppedImg: null});
        console.log('onClose', this.state);
    }
    onCrop(preview) {
        this.setState({preview});
        console.log('onCrop', this.state);
    }   
    onBeforeFileLoad(elem) {
        if(elem.target.files[0].size > _maxFileSize) {
            elem.target.value = '';
        };
        console.log('onBeforeFileLoad', this.state);
    }
    handleHeight() {
        if (window.innerWidth < _desktopWidth) {
            if (window.innerWidth > window.innerHeight) {
                return 110;
            } else {
                return 150;
            }
        } else { return 200 }
    }
    
    render () {
      return (
        <div>
            <AvatarCropper
                width={window.innerWidth >= _desktopWidth ? 300 : 250}
                height={this.handleHeight()}
                closeIconColor={window.innerWidth >= _desktopWidth ? '#f7f4e9' : '#62553a'} 
                onCrop={this.onCrop}
                onClose={this.onClose}
                backgroundColor='#fff'
                borderStyle={
                    {
                        border: '2px dashed #f7f4e9',
                        borderRadius: 5,
                        textAlign: 'center',
                    }
                }
                label="Choose your avatar"
                onBeforeFileLoad={this.onBeforeFileLoad}
                src={this.state.src}
            />
        </div>
      )
    }
  };

  export default EditProfileAvatarCropper;