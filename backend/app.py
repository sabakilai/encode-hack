from flask import Flask, request
import base64
from ocr_nova import FoodImageClassifier
import imghdr
 

app = Flask(__name__)
model = FoodImageClassifier()

@app.post('/userInput')
def handle_user_input():
    data = request.get_json()

    # if user_photo_data.filename == '' or ingredients_photo_data.filename == '':
    #     return 'No selected file', 400
    base_64_to_image(data, 'user_photo')
    base_64_to_image(data, 'ingredients_photo')
    

    return model.predict('ingredients_photo.png'), 200



def base_64_to_image(data: dict, key: str):
    base64_str = data[key]

    if ';base64,' in base64_str:
        base64_str = base64_str.split(';base64,')[1]

    img_data = base64.b64decode(base64_str)

    with open(key + '.png', 'wb') as f:
        f.write(img_data)