import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'

import '../../styles/libs/react-draft-wysiwyg.css';

class WYSWYGeditor extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }
    onChange = (editorState) => {
        const callback = this.props.editorSettings.dataUpdateCallback;

        this.setState({editorState});
        if (JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) !== JSON.stringify(convertToRaw(editorState.getCurrentContent()))) {
          this.setState({editorState});

          // Return updated row data via callback to parent;
          if (typeof callback === 'function') {
            callback(convertToRaw(editorState.getCurrentContent()));
          }
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
  