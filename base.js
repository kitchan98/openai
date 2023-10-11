import 'dotenv/config'
import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
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

app.post('/getAnswer', async (req, res) => {
  try {
    const userInput = req.body.userInput;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a travel planning assistant."},
        {"role": "user", "content": `${userInput}`},
      ],
    });

    res.setHeader('Content-Type', 'application/json');
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(5500, () => {
 console.log('http://localhost:5500/getAnswer');
});


/*const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    });

userInterface.prompt(); 
userInterface.on('line', async function (input) {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: input }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content);
    userInterface.prompt();
  }); */

/*  async function main() {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: "Hey hello" }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content);
}

main(); */
/*app.post("/getAnswer", async(req, res) => {
  const userInput = req.body;

  const chatCompletion = await openai.chat.completions.create({
  messages: [{role: "user", content: `${userInput}`}],
  model:"gpt-3.5-turbo",
  })
      res.json({
          chatCompletion: chatCompletion.choices[0].message,
  })
}); 
req.body.userInput

*/