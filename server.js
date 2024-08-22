const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userInput = req.body.input;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "user", content: userInput }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.sk-U5bhG0FQ2M3RApSA8vrVsp297PDUrdp4bYkihoG2qPT3BlbkFJCNuo6c-D2sf6xI1xz9wiFCjuM4T-CB12fY57uLBGsA}`
            }
        });
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
