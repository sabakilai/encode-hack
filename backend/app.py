from flask import Flask
from open_ai import run_open_ai

app = Flask(__name__)

@app.post('/userInput')
def handle_user_input():
    # Check if the post request has the file part
    if 'user_photo' not in request.files or 'ingredients_photo' not in request.files:
        return 'No file part', 400
    user_photo = request.files['user_photo']
    ingredients_photo = request.files['ingredients_photo']
    # If the user does not select a file, the browser might
    # submit an empty file without a filename.
    if user_photo.filename == '' or ingredients_photo.filename == '':
        return 'No selected file', 400
    # Here you can save the pictures to a server-side location
    # or process them as needed.
    return 'Files received', 200



