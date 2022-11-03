import { Box } from '@mui/material';
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/material';

class Editor extends Component {
  constructor(props) {
    super(props);

    const Article = styled(Box)({
      height: 'calc(100vh - 236.5px)',
    });
  }

  modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  render() {
    const { value, onChange } = this.props;
    return (
      <Box style={{ height: 'calc(100vh - 420.5px)' }}>
        <ReactQuill
          theme="snow"
          style={{ height: '100%' }}
          modules={this.modules}
          formats={this.formats}
          value={value || ''}
          onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        />
      </Box>
    );
  }
}
export default Editor;
