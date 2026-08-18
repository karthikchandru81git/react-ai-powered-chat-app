import { useState, useEffect } from 'react'
import ChatInput from '../components/ChatInput'
import ChatMessages from '../components/ChatMessages';
import { api, type GroqResponseType } from '../services/api'

type GroqMessageState = {
    groqMessages: GroqResponseType[]
}
type ChatbotType = {
    setChats: () => void
}
function Chatbot({ }: ChatbotType) {
    const [chats, setChats] = useState(() => {
        const savedChats = sessionStorage.getItem('chat_history');
        return savedChats ? JSON.parse(savedChats) : []
    });
    let [error, setError] = useState(false);
    const getInputValue = async (value: string) => {
        let userMessage = {
            id: crypto.randomUUID(),
            name: value,
            sender: 'user'
        }
        let updatedChats = [...chats, userMessage];
        setChats(updatedChats);

        try {
            let groqMessages = updatedChats.map(chat => ({
                content: chat.name,
                role: chat.sender === 'user' ? 'user' : 'assistant'
            }));
            let reply = await api.getChatBotResponse(groqMessages) as GroqAPIResponse;

            let botResponseText = reply.choices[0].message.content;
            let botResponseMessage = {}
            if (botResponseText) {
                botResponseMessage = {
                    id: crypto.randomUUID(),
                    name: botResponseText,
                    sender: 'assistant'
                }
            }
            setError(false);
            setChats((prev: string) => [...prev, botResponseMessage]);

        } catch (error) {
            let errorMessage = error;
            let botResponseErrorMessage = {
                id: crypto.randomUUID(),
                name: errorMessage,
                sender: 'assistant'
            }
            setError(true);
            setChats((prev:string) => [...prev, botResponseErrorMessage]);
        }
    }
    useEffect(() => {
        sessionStorage.setItem('chat_history', JSON.stringify(chats));
    }, [chats])

    const [count, setCount] = useState(0);
    let handleCount = (value: number) => {
        setCount(value);
    }

    return (
        <>
            <ChatMessages chats={chats} count={count} error={error} />
            <ChatInput inputValue={getInputValue} count={count} handleCount={handleCount}
                position={chats.length > 0 ? 'positionBottom [&_.welcomeText]:hidden' : ''} />

        </>
    )
}

export default Chatbot