const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Call Gemini API (replace with actual API call)
    const geminiResponse = await fetch('https://api.gemini.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await geminiResponse.json();
    res.json({ response: data.reply });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
