from flask import Flask, request
import base64
from ocr_nova import FoodImageClassifier
import imghdr
 

app = Flask(__name__)
model = FoodImageClassifier()

@app.post('/userInput')
def handle_user_input():
    data = request.get_json()

    if 'user_photo' not in data or 'ingredients_photo' not in data:
        return 'No image data', 400
    
    user_photo_data = base64.b64decode(data['user_photo'])

    

    base64_str = data['ingredients_photo']

    if ';base64,' in base64_str:
        base64_str = base64_str.split(';base64,')[1]

    img_data = base64.b64decode(base64_str)

    with open('ingredients_photo.png', 'wb') as f:
        f.write(img_data)

    # if user_photo_data.filename == '' or ingredients_photo_data.filename == '':
    #     return 'No selected file', 400

    return model.predict('ingredients_photo.png'), 200




