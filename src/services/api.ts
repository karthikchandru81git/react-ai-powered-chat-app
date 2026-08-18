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
export const getChatBotResponse = async (groqMessages: ChatbotResponseType[]) => {
    try {
        //const models = await groq.models.list();
        //console.log('--------models----------', models.data.map(model => model.id));

        let response = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an adaptive assistant. Answer general queries cleanly, and wrap code blocks in proper markdown syntax.' },
                ...groqMessages
            ],
            //model: 'llama-3.3-70b-versatile',
           model: 'openai/gpt-oss-120b',
            temperature: 0.7,
            //max_tokens: 150
            max_completion_tokens: 500,
            reasoning_effort: 'low'
            //stream: true
        })
        return response;
    } catch (error) {
        //console.log('Groq ERROR!!!!', error)
        throw 'Something went wrong!!!'
    }
}

export let api = {
    getChatBotResponse
}