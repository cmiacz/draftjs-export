import io
import docx
from flask import Flask, send_file

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route("/export", methods=["GET", "POST"])
def export_draftjs_content():
    doc_stream = io.BytesIO()

    document = docx.Document()
    document.add_heading("Exported editor content")
    document.save(doc_stream)

    doc_stream.seek(0)
    return send_file(doc_stream, attachment_filename="export.docx", as_attachment=True)
