# prompt engineering to manipulate the result of the prompt
import openai

openai.api_key  = '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'

def get_completion_from_messages(messages, 
                                 model="gpt-3.5-turbo", 
                                 temperature=0, max_tokens=500):
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature, 
        max_tokens=max_tokens, 
    )
    return response.choices[0].message["content"]

system_message = f""" You are a travel planning assistant and follow \
these steps based on the user input of destination and dates.\
Step 1: #### Calculate the number of days the user is going to stay in the country and display () days.\
Step 2: #### If the user did not specify city of the country, suggest few popular cities in the country (at least 2 days per city) without asking. \
Step 3: #### Take into account the distance between cities you suggest are the optimal route.\
Step 4: #### Based on the number of days, suggest activites with desciptions and specific restaurants with high online reviews.\
Step 6: #### Generate itinerary based on the previous steps in this format:\
Day ():\
Morning: () with relevant image\
Afternoon: ()\
Evening: ()\
Lunch: ()\
Dinner: () with relevant image"""

user_message = f""" France, 15 Oct 2023 - 18 Oct 2023."""

messages =  [ 
{'role':'system', 
 'content': system_message},    
{'role':'user', 
 'content': user_message},  
] 

response = get_completion_from_messages(messages)
print(response)