from flask import Flask
import base64

app = Flask(__name__)

@app.post('/userInput')
def handle_user_input():
    data = request.get_json()

    if 'user_photo' not in data or 'ingredients_photo' not in data:
        return 'No image data', 400
    user_photo_data = base64.b64decode(data['user_photo'])
    ingredients_photo_data = base64.b64decode(data['ingredients_photo'])

    if user_photo.filename == '' or ingredients_photo.filename == '':
        return 'No selected file', 400

    return 'Files received', 200





