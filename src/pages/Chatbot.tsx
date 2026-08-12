import { useState, useEffect } from 'react'

import ChatInput from '../components/ChatInput'
import ChatMessages from '../components/ChatMessages';
import { api,  type GroqResponseType } from '../services/api'

type GroqMessageState = {
    groqMessages: GroqResponseType[]
}

function Chatbot() {
    const [chats, setChats] = useState(() => {
        const savedChats = sessionStorage.getItem('chat_history');
        return savedChats ? JSON.parse(savedChats) : []
    });
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
            let botResponseMessage = {
                id: crypto.randomUUID(),
                name: botResponseText,
                sender: 'assistant'
            }
            setChats((prev:string) => [...prev, botResponseMessage]);

        } catch (error) {
            console.log('error.....', error)
        }
    }
    useEffect(() => {
        sessionStorage.setItem('chat_history', JSON.stringify(chats));
    }, [chats])

    const [myRef, setMyRef] = useState(0);
    let handleReference = (refValue:number) => {
        setMyRef(refValue);
    }

    return (
        <>
            <ChatMessages chats={chats} myReference={myRef} />
            {/* {loading ? <strong>Loading....</strong> : null} */}
            <ChatInput name="welcome" inputValue={getInputValue} buddy={myRef} reference={handleReference}
            position={chats.length > 0 ? 'positionBottom [&_.welcomeText]:hidden' : ''} />
           
        </>
    )
}

export default Chatbot