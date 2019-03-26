import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { convertToRaw } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";

import "draft-js-static-toolbar-plugin/lib/plugin.css";
import "./App.css";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const exportUrl = "/api/export";
const defaultFileName = "draft.docx";
const defaultText =
  "The toolbar below the editor can be used for formatting text, as in conventional static editors.";
const timeout = 5000;


class App extends Component {
  state = {
    editorState: createEditorStateWithText(defaultText)
  };

  focus = () => this.editor.focus();

  setEditorRef = element => (this.editor = element);

  onChange = editorState => this.setState({ editorState });

  onClickExport = () => {
    const content = this.state.editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    axios
      .post(exportUrl, rawContent, { responseType: "blob", timeout})
      .then(response => {
        saveAs(response.data, defaultFileName);
      });
  };

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
        <button onClick={this.onClickExport}>Export to docx</button>
      </div>
    );
  }
}

export default App;
