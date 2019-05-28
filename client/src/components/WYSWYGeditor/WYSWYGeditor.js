import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import '../../styles/libs/react-draft-wysiwyg.css';

class WYSWYGeditor extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }
    onChange = editorState => {
        const callback = this.props.editorSettings.dataUpdateCallback;

        this.setState({editorState});
        
        // Return updated row data via callback to parent;
        if (typeof callback === 'function') {
            callback(convertToRaw(editorState.getCurrentContent()));
        }
    }
    render() {
      const { editorState } = this.state;
      return (
        <Editor
            {...this.props.editorSettings}
            editorState={editorState}
            onEditorStateChange={this.onChange}
        />
      )
    }
  }

  export default WYSWYGeditor;
  