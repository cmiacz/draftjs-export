import axios from "axios";
import { saveAs } from "file-saver";

export default function exportEditorContent(data) {
  axios
    .post("/api/export", data, { responseType: "blob", timeout: 1000 })
    .then(response => {
      saveAs(response.data, "draft.docx");
    });
}
