# from dotenv import load_dotenv
# load_dotenv()  # Load environment variables first
# from openai import OpenAI
# import os

# # Initialize DeepSeek client securely
# client = OpenAI(
#     api_key="sk-2f43e3ab2b024895802739b94fb51d23",  # Get from .env file
#     base_url="https://api.deepseek.com/v1"  # DeepSeek endpoint
# )

# def ask_question(question):
#     try:
#         response = client.chat.completions.create(
#             model="deepseek-chat",  # Correct DeepSeek model
#             messages=[
#                 {"role": "system", "content": "You are an expert on the Quran..."},
#                 {"role": "user", "content": question}
#             ],
#             temperature=0.7,
#             max_tokens=500
#         )
#         return response.choices[0].message.content
#     except Exception as e:
#         return f"Error: {str(e)}"

# if __name__ == "__main__":
#     print("Welcome to the Quran Chatbot!")
#     print("Ask any question or type 'exit' to quit.")
    
#     while True:
#         try:
#             user_input = input("\nYour question: ").strip()
#             if user_input.lower() == "exit":
#                 print("Goodbye!")
#                 break
#             if not user_input:
#                 print("Please enter a valid question.")
#                 continue
                
#             print("\nAnswer:", ask_question(user_input))
            
#         except KeyboardInterrupt:
#             print("\nGoodbye!")
#             break
#         except Exception as e:
#             print(f"\nError: {str(e)}")