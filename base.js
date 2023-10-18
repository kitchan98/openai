import 'dotenv/config'
import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const openai = new OpenAI({
  apiKey: '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',
});

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://127.0.0.1:5501', // Replace with your specific origin
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

const system_message = "You are a travel planning assistant and follow \
these steps based on the user input of destination and dates.\
Step 1: #### Calculate the number of days the user is going to stay in the country and display {} days.\
Step 2: #### If the user did not specify city of the country, suggest few popular cities in the country (at least 2 days per city) without asking. \
Step 3: #### Take into account the distance between cities you suggest are the optimal route.\
Step 4: #### Based on the number of days, suggest activites with desciptions and specific restaurants with high online reviews.\
Step 6: #### Generate itinerary based on the previous steps in this format:\
Day {}:\
Morning: {} with relevant image\
Afternoon: {}\
Evening: {}\
Lunch: {}\
Dinner: {} with relevant image";

app.post('/getAnswer', async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const userInput2 = req.body.userInput2;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": system_message},
        {"role": "user", "content": userInput},
        {"role": "user", "content": userInput2},
      ],
      temperature: 0.5,
    });

    res.setHeader('Content-Type', 'application/json');
    res.json({ answer: response.choices[0].message.content});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5500, () => {
  console.log('http://localhost:5500/getAnswer');
});


/*const image = await openai.images.generate({ prompt: `${userInput}`, size: '256x256'});
image_url: image.data[0].url
const urls = image.data.map(item => item.url); */
        //const image = urlParams.get('image');

        //const decodedImage = decodeURIComponent(image);
        //const imageElement = document.getElementById('image-display');
        //imageElement.src = decodedImage;
        //document.getElementById('responseDisplay').textContent = resp;