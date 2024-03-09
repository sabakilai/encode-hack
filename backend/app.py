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

    bad_counter = data['bad_counter']
    good_counter = data['good_counter']
    attempts_counter = data['attempts_counter']

    base_64_to_image(data, 'user_photo')
    base_64_to_image(data, 'ingredients_photo')

    food_category = model.predict('ingredients_photo.png')

    # Change to StabilityAI model
    transformed_photo = model.predict(food_category, good_counter, bad_counter, attempts_counter)
    
    response = {
        'food_category': food_category,
        'good_counter': good_counter,
        'bad_counter': bad_counter,
        'attempts_counter': attempts_counter,
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


def assign_counter_values(food_category, good_counter, bad_counter, attempts_counter):
    counter_values = {
        'Ultra-Processed Foods': (3, 0, 1),
        'Processed Foods': (1, 0, 1),
        'Processed Culinary Ingredients': (1, 0, 1),
        'Unprocessed and Minimally Processed Foods': (0, 3, 1),
        'Unable to identify the food category': (0, 0, 0)
    }

    if food_category in counter_values:
        good_increment, bad_increment, attempts_increment = counter_values[food_category]
        good_counter += good_increment
        bad_counter += bad_increment
        attempts_counter += attempts_increment
    else:
        return 'Invalid food category', 400