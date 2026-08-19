import React, { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { marked } from 'marked'
import { User, BotMessageSquare } from 'lucide-react';
import { useApp } from '../contextapi/AppContext';

type StaticTypewriterType = {
    groqResponseText: string
}
const StaticTypewriter = React.memo(({ groqResponseText }: StaticTypewriterType) => {
    //console.log('groqResponseText', groqResponseText);
    //const actualText = groqResponseText?.choices?.[0]?.message?.content || "";
    const cleanText = groqResponseText ? groqResponseText.replace(/\n{3,}/g, '\n\n') : '';
    let rawHtmlContent = marked.parse(cleanText || '') as string;

    return (
        <div className="">
            {groqResponseText ? (
                <>
                    {<Typewriter
                        options={{
                            //strings: [rawHtmlContent],
                            //autoStart: true,
                            delay: 10,
                            cursor: "|",
                            loop: false,
                            deleteSpeed: Infinity
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(rawHtmlContent)
                                .stop()
                                .callFunction((state) => {
                                    state.elements.cursor.style.display = 'none';
                                })
                                .start();
                        }}
                    />}
                </>) : <p>Thinking....</p>}
        </div>
    );
});

type ChatMessagesType = {
    chats: [{
        id: number,
        name: string,
        sender: string

    }],
    count: number,
    error: boolean
}

function ChatMessages({ chats, count, error }: ChatMessagesType) {
    let [updateCount, setUpdateCount] = useState(count);
    let bottomRef = useRef<HTMLDivElement>(null);
    let { theme } = useApp();
    if (updateCount != count) {
        setUpdateCount((prev) => prev + 1);
    }
    useEffect(() => {
        setTimeout(() => {
            if (bottomRef.current) {
                bottomRef.current?.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth'
                });
            }
        }, 1000)

    }, [updateCount]);

    let renderIconColor = theme ? 'text-white/90' :'text-black/50';

    return (
        <>
            <ul className='chatbotMessageList px-10 m-5 list-none flex flex-col 
            [&_.user]:text-right [&_.assistant]:text-left [&_.user]:self-end [&_.assistant]:self-start ![&_li.assistant_h1]:text-[#180ea7]'>
                {
                    chats.length > 0 && ((chats.map((chat, chatIndex) => {
                        let isLastChatMessage = chatIndex === chats.length - 1;
                        let isAssistant = chat.sender === 'assistant';
                        return (
                            <li key={chat.id}
                                className={`${chat.sender === 'user' ? 'user bg-[#b5dbec]' : error ? 'assistant bg-red-200' : 'assistant bg-white'}
                            text-black p-3.75 w-auto text-[14px] my-2.5 mx-0 rounded-[10px] 
                            relative whitespace-normal ${theme ? '' : 'shadow-md shadow-gray-400'}`}>
                                {
                                    isAssistant ?
                                        (isLastChatMessage ?
                                            <>
                                                <BotMessageSquare className={`absolute top-0 -left-10 ${theme ? 'text-white/90' :'text-black/50'} w-[25px] h-[25px]`} />
                                                <StaticTypewriter groqResponseText={chat.name} /> </>
                                            : (
                                                <>
                                                    <BotMessageSquare className={`absolute top-0 -left-10 ${renderIconColor} w-[25px] h-[25px]`} />
                                                    <div
                                                        className="prose prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5"
                                                        dangerouslySetInnerHTML={{ __html: marked.parse(chat.name || '') }}
                                                    />
                                                </>

                                            )) : (<><p>{chat.name}</p><User className={`absolute top-0 -right-10 ${renderIconColor} w-[25px] h-[25px]`} /></>)
                                }
                            </li>
                        )
                    })))
                }
            </ul>

            <div ref={bottomRef} style={{ height: '100px', marginTop: '20px' }}></div>
        </>
    )
}

export default ChatMessages