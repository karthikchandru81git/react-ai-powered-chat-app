import React, { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

type StaticTypewriterType = {
    groqResponseText:string
}
const StaticTypewriter = React.memo(({ groqResponseText }: StaticTypewriterType) => {
    return (
        <div className="">
            {groqResponseText && (
                <Typewriter
                    options={{
                        //strings: [groqResponseText],
                        //autoStart: true,
                        delay: 10,
                        cursor: "|",
                        loop: false,
                        deleteSpeed: Infinity
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(groqResponseText)
                            .stop() // Stops the animation engine
                            .callFunction((state) => {
                                console.log('state...', state);
                                // Hides the cursor element from the DOM once finished
                                state.elements.cursor.style.display = 'none';
                            })
                            .start();
                    }}
                />
            )}
        </div>
    );
});

type ChatMessagesType = {
    chats: [{
        id: number,
        name: string,
        sender: string
    }],
    myReference:number,
}

function ChatMessages({ chats, myReference }: ChatMessagesType) {
    let [test, setTest] = useState(myReference);
    let bottomRef = useRef<HTMLDivElement>(null);
    if (test != myReference) {
        setTest((prev) => prev + 1);
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

    }, [test]);

    



    return (
        <>

            <ul className='chatbotMessageList mt-10 mb-0 ml-10 mr-0 list-none flex flex-col 
            [&_.user]:text-right [&_.assistant]:text-left [&_.user]:self-end [&_.assistant]:self-start ![&_li.assistant_h1]:text-[#180ea7]'>
                {
                    chats.length > 0 && ((chats.map((chat) => {
                        return (
                            <li style={{ whiteSpace: 'pre-wrap' }} key={chat.id} 
                            className={`${chat.sender === 'user' ? 'user ' : 'assistant'} 
                        
                            text-black p-[15px] w-fit text-[17px] my-[10px] mx-0 rounded-[10px] w-auto bg-white/85 shadow-[2px_2px_30px_0px_rgba(0,0,0,0.1)] border-r-2 border-r-gray-800 border-b-2 border-b-gray-800`}>
                                {/* {chat.name} */}
                                 {chat.sender === 'user' ? chat.name : <StaticTypewriter groqResponseText={chat.name} />} 
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