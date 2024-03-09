from flask import Flask, request
import base64
from ocr_nova import FoodImageClassifier
import imghdr
from flask_cors import CORS
from controller_auth_guard import controller_auth_guard

app = Flask(__name__)
CORS(app)
model = FoodImageClassifier()

@app.post('/userInput')
@controller_auth_guard
def handle_user_input():
    data = request.get_json()

    # base_64_to_image(data, 'user_photo')
    base_64_to_image(data, 'ingredients_photo')

    food_category = model.predict('ingredients_photo.png')
    transformed_photo = data['ingredients_photo']
    
    # Change to StabilityAI model
    # transformed_photo = model.predict(food_category, good_counter, bad_counter, attempts_counter)
    
    response = {
        'food_category': food_category,
        'transformed_photo': transformed_photo
    }

    return response, 200



def base_64_to_image(data: dict, key: str):
    base64_str = data[key]

    if ';base64,' in base64_str:
        base64_str = base64_str.split(';base64,')[1]

    img_data = base64.b64decode(base64_str)

    with open(key + '.png', 'wb') as f:
        f.write(img_data)

