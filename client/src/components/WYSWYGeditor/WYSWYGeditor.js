import React, { Component } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../styles/libs/react-draft-wysiwyg.css';
const uploadUrl = 'https://40132.cke-cs.com/easyimage/upload/';
const tokenUrl = 'https://40132.cke-cs.com/token/dev/51bEORgZKne2yb0yBRm8XtbuSePrpKBbHLPkcsKcA2z3pUYhCzks1PXkwvRg';
class WYSWYGeditor extends Component {
    state = {
        editorData: this.props.editorSettings.data
        ? this.props.editorSettings.data
        : ''
    }
    onChange = (event, editor) => {
      const callback = this.props.editorSettings.dataUpdateCallback;
      
      this.setState({editorData: editor.getData()});

      // Return updated row data via callback to parent;
      if (typeof callback === 'function') {
        return callback(this.state.editorData);
      }
    }
    render = () => (
      <CKEditor
        editor={ ClassicEditor }
        // Fuck year, SAFE iframe support!;
        config={{
          mediaEmbed: {
            previewsInData: true
          },
          cloudServices: {
            uploadUrl,
            tokenUrl,
          },
          removePlugins: ['Table', 'Italic']
        }}
        data={ this.state.editorData }
        onChange= {this.onChange }
      />
    ) 
  }

  export default WYSWYGeditor;
  