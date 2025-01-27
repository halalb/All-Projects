import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Configure the API key securely
genai.configure(api_key="AIzaSyCJlefBe70vjVMPIAQvjyfJLDa6T_FfWRc")

# Create the model
generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)

# Prompt the user for actual input
user_input = input("Please type your message:")

# Add error handling
try:
    response = chat_session.send_message(user_input)
    print(response.text)
except Exception as e:
    print(f"An error occurred: {e}")