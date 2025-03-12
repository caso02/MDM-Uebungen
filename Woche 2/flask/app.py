from flask import Flask, request, send_file
from PIL import Image
import io
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_file("static/index.html")

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            img = Image.open(file)
            img = img.convert("L")
            img_io = io.BytesIO()
            img.save(img_io, format='PNG')
            img_io.seek(0)
            return send_file(img_io, mimetype='image/png')
    return "Fehler: Keine gültige Datei", 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)