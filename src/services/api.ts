import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

export type ChatbotResponseType = {
    role: 'system' | 'assistant' | 'user',
    content: string
}
export type GroqResponseType = {
    success: boolean,
    reply: ChatbotResponseType
}
const getChatBotResponse = async (groqMessages: ChatbotResponseType[]) => {
    try {
        let response = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an adaptive assistant. Answer general queries cleanly, and wrap code blocks in proper markdown syntax.' },
                ...groqMessages
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 150
            //stream: true
        })
        return response;
    } catch (error) {
        console.log('ERROR!!!!')
        return error
    }
}

export let api = {
    getChatBotResponse
}