// import {API_URL, API_KEY} from "@env"
import axios from "axios";

export const getAnswerFromGpt = async (prompt) => {
    console.log('chat gpt propmt', {prompt})
    try {

        const client = axios.create(
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `your-api-key-token`,
                },
            }
        );

        const response = await client.post("https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    role: "assistant",
                    content: prompt
                }
            ]
        });

        const answer = response.data?.choices[0]?.message?.content;
        console.log('answer', {answer})
        return Promise.resolve({ success: true, data: answer });

    } catch (error) {
        console.log('masuk error gpt', {error})
        return Promise.resolve({ success: false, msg: error.message });
    }
}