import base64
import os
import requests

def art_generation(input_img_path, category):
    pos_weight = 10
    neg_weight = 0
    if category == "Ultra-Processed Foods" or category == "Processed Foods":
        pos_weight = -4
        neg_weight = 10
    response = requests.post(
        "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image",
        headers={
            "Accept": "application/json",
            "Authorization": f"Bearer {os.getenv('STABILITY_KEY')}"
        },
        files={
            "init_image": open(input_img_path, "rb")
        },
        data={
            "init_image_mode": "IMAGE_STRENGTH",
    		"image_strength": 0.5,
    		"steps": 50,
    		"seed": 0,
    		"cfg_scale": 7,
    		"samples": 1,
            "style_preset": "line-art",
    		"text_prompts[0][text]": "smiling sparkling magical colourfull vivid colors glitter on the face fairytale in love", 
    		"text_prompts[0][weight]": pos_weight,
    		"text_prompts[1][text]": "depressed histerically criyng with tears, bright color pimples on face",
    		"text_prompts[1][weight]": neg_weight,
        }
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))
    
    data = response.json()
    
    for i, image in enumerate(data["artifacts"]):
        with open(f'./transformed_{input_img_path.split(".")[0]}.{input_img_path.split(".")[1]}', "wb") as f:
            f.write(base64.b64decode(image["base64"]))


