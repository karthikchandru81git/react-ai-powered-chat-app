import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpIcon } from "@radix-ui/react-icons"
import { capitalizeFirstLetter } from '../utilities/utilities';
import { useApp } from '../contextapi/AppContext';

type ChatInputType = {
    inputValue: (value: string) => void,
    position: string,
    handleCount: (count: number) => void,
    count: number
}

function ChatInput({ inputValue, position, handleCount, count }: ChatInputType) {
    let { username, theme } = useApp();
   
    const [value, setValue] = useState('');
    let isButtonDisabled = value.trim().length === 0;
    //let [greetMessage, setGreetMessage] = useState('');
    //let currentHour = new Date()
    //let time = currentHour.getHours();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    // useEffect(() => {
    //     if (time >= 5 && time < 11) {
    //         setGreetMessage('Energy morning,')
    //     } else if (time >= 12 && time < 17) {
    //         setGreetMessage('Finished lunch,')
    //     } else if (time >= 17 && time < 21) {
    //         setGreetMessage('Pleasant evening,')
    //     } else {
    //         setGreetMessage('Feeling sleepy')
    //     }
    // }, [])

    const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (value.trim().length > 0) {
                //console.log("Sending to chatbot:", value);
                inputValue(value);
                setValue('');
                handleCount(count + 1);
            }
        }
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) {
            return false;
        }
        inputValue(value);
        setValue('');
        handleCount(count + 1);
    }
    useEffect(() => {
        const textarea = textareaRef.current;
        const button = buttonRef.current;
        if (!textarea) return;
        if (!button) return;
        textarea.style.height = "55px";
        textarea.style.height = `${textarea.scrollHeight}px`;
        button.style.top = `${textarea.scrollHeight > 55 ? '100px' : ''}`;
    }, [value])
    return (
        <div className='chatbotInputParent relative w-[100%] z-350'>
            <div className={`chatbotInput fixed bottom-62.5 w-[80%] md:w-[70%] left-[50%] translate-x-[-50%] ${position} `}>
                <h1 className={`welcomeText leading-[25px] ${theme ? 'text-white!' : 'text-black!'}  relative text-[25px]! mb-20 font-normal! tracking-normal`}>Hello <strong>{capitalizeFirstLetter(username, true)}</strong>, How can I help you today?</h1>
                <form onSubmit={handleSubmit} className='relative m-auto w-[100%]  md:w-[80%] '>
                    <textarea value={value}
                        ref={textareaRef}
                        placeholder='Ask anything'
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleUserInput}
                        className='bg-[#FFFFFF] resize-none overflow-hidden h-[45px] text-gray-900 py-[15px] px-[20px] border-1 border-gray-500 rounded-[25px] w-[100%] my-0 mx-[auto] outline-0 text-[14px] shadow-[2px_2px_60px_2px_rgba(0,0,0,0.5)]'></textarea>
                    <button ref={buttonRef} disabled={isButtonDisabled} className='sendButton disabled:bg-black/30 absolute right-[10px] top-[7px] text-center bg-black text-white border-0 cursor-pointer w-[40px] h-[40px] rounded-[30px] disabled:cursor-not-allowed'><ArrowUpIcon className='w-[25px] h-[25px] relative left-[8px]' /></button>

                </form>
            </div>
        </div>
    )
}

export default ChatInput