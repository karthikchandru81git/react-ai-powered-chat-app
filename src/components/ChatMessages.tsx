import React, { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { marked } from 'marked'
import { User, BotMessageSquare } from 'lucide-react';


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

    return (
        <>
            <ul className='chatbotMessageList mt-10 px-10 mb-0 ml-10 mr-0 list-none flex flex-col 
            [&_.user]:text-right [&_.assistant]:text-left [&_.user]:self-end [&_.assistant]:self-start ![&_li.assistant_h1]:text-[#180ea7]'>
                {
                    chats.length > 0 && ((chats.map((chat, chatIndex) => {
                        let isLastChatMessage = chatIndex === chats.length - 1;
                        console.log('isLastChatMessage', isLastChatMessage)
                        let isAssistant = chat.sender === 'assistant';
                        return (
                            <li style={{ whiteSpace: 'pre-wrap' }} key={chat.id}
                                className={`
                                ${chat.sender === 'user' ? 'user bg-[#b5dbec]'
                                        : error
                                            ? 'assistant bg-red-200'
                                            : 'assistant bg-white'
                                    }
                            text-black p-3.75 w-auto text-[17px] my-2.5 mx-0 rounded-[10px] 
                            shadow-[2px_2px_30px_0px_rgba(0,0,0,0.1)] border-r-2 border-r-gray-800 
                            border-b-2 border-b-gray-800 relative`}>
                                {/* {chat.sender === 'user' ? chat.name :
                                    <StaticTypewriter groqResponseText={chat.name} />
                                } */}
                                {
                                    isAssistant ?
                                        (isLastChatMessage ?
                                            <>
                                                <BotMessageSquare className='absolute top-0 -left-7' />
                                                <StaticTypewriter groqResponseText={chat.name} /> </>
                                            : (
                                                <>
                                                    <BotMessageSquare className='absolute top-0 -left-7' />
                                                    <div
                                                        className="prose prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5"
                                                        dangerouslySetInnerHTML={{ __html: marked.parse(chat.name || '') }}
                                                    />
                                                </>

                                            )) : (<><p>{chat.name}</p><User className='absolute top-0 -right-7' /></>)
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