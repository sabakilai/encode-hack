from flask import Flask, request
import base64
from ocr_nova import FoodImageClassifier
import imghdr
from flask_cors import CORS
from controller_auth_guard import controller_auth_guard
from pathlib import Path
from gen_art import art_generation

app = Flask(__name__)
CORS(app)
model = FoodImageClassifier()

@app.post('/userInput')
@controller_auth_guard
def handle_user_input():
    data = request.get_json()

    # Convert base64 strings to images to pass to the models
    base_64_to_image(data, 'user_photo')
    base_64_to_image(data, 'ingredients_photo')

    # First model extracts the food category from the ingredients photo and 
    # passes it to the second model to generate the food category
    food_category = model.predict('ingredients_photo.png')

    # Handle when the first model is unable to identify the food category
    sad_cat_base64_str = Path('sad_cat.rtf').read_text()  

    if food_category == 'Unable to identify the food category':
        return {
            'food_category': food_category + ". Please try again!",
            'transformed_photo': sad_cat_base64_str
        }

    # Third model generates the transformed photo based on the user photo and the food category
    art_generation("user_photo.png", category=food_category)

    # Convert the transformed photo to a base64 string to send back to the frontend
    transformed_photo = image_to_base64('transformed_user_photo.png')

    final_response = select_food_category_response(food_category)
    
    response = {
        'food_category': final_response,
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

def image_to_base64(image_path: str):
    with open(image_path, 'rb') as img_file:
        img_bytes = img_file.read()

    base64_str = base64.b64encode(img_bytes).decode('utf-8')

    return 'data:image/png;base64,' + base64_str

def select_food_category_response(food_category: str):
    if food_category == 'Ultra-Processed Foods':
        return """
        Ultra-Processed Food Detected!
        Yikes! 😳  That photo looks like a horror movie poster! Let's get you back on track with some nutrient-dense, whole foods that'll make your body feel like a million bucks!"""
    elif food_category == 'Processed Culinary Ingredients':
        return """
        Processed Culinary Ingredient Detected!
        Hmm… 🤔 The photo looks decent, but let's explore some fresher options too! 
        """
    elif food_category == 'Processed Foods':
        return """
        Processed Food Detected!
        Hmm… 🤔 The photo looks decent, but let's explore some fresher options too!
        """
    else:
        return """
        Unprocessed/Minimally Processed Food Detected!
        Woohoo! 🥳 You're glowing like a radiant sunbeam! Keep fuelling your body with those wholesome, minimally processed gems, and you'll be unstoppable!
        """
    