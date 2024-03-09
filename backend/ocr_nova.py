from openai import OpenAI
import easyocr

class FoodImageClassifier(object):
	def __init__(self):
		self.reader = easyocr.Reader(['en'])
		self.client = OpenAI()
		self.zero_shot_prompt = """You are en expert in NOVA Food Classification.
	Brief Overview of NOVA Food Classification:
	Unprocessed/Minimally Processed Foods: These include natural foods and those slightly altered by processes like drying, boiling, or freezing without adding other food substances.
	Processed Culinary Ingredients: Derived from natural foods or nature for use in cooking, such as oils, sugar, and salt, through pressing, refining, or extracting.
	Processed Foods: Made by adding processed culinary ingredients to natural foods for preservation or flavor enhancement, including canned goods and fermented breads and cheeses.
	Ultra-Processed Foods: Characterized by ingredients not typically used in kitchens or additives aimed at enhancing appeal or palatability, such as flavor enhancers, colors, and artificial sweeteners.
	
	Product ingredients: PRODUCT_INGREDIENTS
	
	Based on the NOVA food classification system, classify the product into exactly one of the following categories:
	Ultra-Processed Foods
	Processed Foods
	Processed Culinary Ingredients
	Unprocessed and Minimally Processed Foods
	If you are unable to tell, say Unable to identify the food category
	
	Retrun only category
	"""

	def predict(self, photo_path):
		"""function expects a fhoto as an input and return NOVA category string"""
		ingredients = str(self.reader.readtext(photo_path, detail = 0))
		print(ingredients)
		response = self.client.completions.create(
        		model="gpt-3.5-turbo-instruct",
        		prompt=self.zero_shot_prompt.replace('PRODUCT_INGREDIENTS', ingredients),
        		temperature=0,
    		)
		return response.choices[0].text.strip()
