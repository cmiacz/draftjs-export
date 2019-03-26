import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';

import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import './App.css';

import exportEditorContent from './utils';


const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const text = 'The toolbar below the editor can be used for formatting text, as in conventional static editors.';

class App extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  focus = () => this.editor.focus();  

  setEditorRef = element => this.editor = element;

  onChange = editorState => this.setState({ editorState });

  render() {
    return (
      <div class="flex-container">
        <h3>Text Editor</h3>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[staticToolbarPlugin]}
            ref={this.setEditorRef}
          />
          <Toolbar />
        </div>
        <button onClick={() => exportEditorContent({test: 123})} >
          Export to docx
        </button>
      </div>
    );
  }
}

export default App;
