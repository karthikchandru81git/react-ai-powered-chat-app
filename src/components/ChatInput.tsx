import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from "@radix-ui/react-icons"
import { capitalizeFirstLetter } from '../utilities/utilities';

type ChatInputType = {
    inputValue: (value: string) => void,
    position: string,
    handleCount: (count: number) => void,
    count: number
}
type UserInfoType = {
    username: string | null
}
function ChatInput({ inputValue, position, handleCount, count }: ChatInputType) {
    let user_info = sessionStorage.getItem('user_info');
    let { username } = JSON.parse(user_info || '{}') as UserInfoType;
    const [value, setValue] = useState('');
    let isButtonDisabled = value.trim().length === 0;
    let [greetMessage, setGreetMessage] = useState('');
    let currentHour = new Date()
    let time = currentHour.getHours();
    useEffect(() => {
        if (time >= 5 && time < 11) {
            setGreetMessage('Energy morning,')
        } else if (time >= 12 && time < 17) {
            setGreetMessage('Finished lunch,')
        } else if (time >= 17 && time < 21) {
            setGreetMessage('Pleasant evening,')
        } else {
            setGreetMessage('Feeling sleepy')
        }
    }, [])

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    //let[disabled, setDisabled] = useState(true);
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) {
            return false;
        }
        inputValue(value);
        setValue('');
        handleCount(count + 1);
    }
    return (
        <div className='chatbotInputParent relative w-[93%] z-[350]'>
            <div className={`chatbotInput fixed bottom-[250px] w-[55%] left-[50%] translate-x-[-50%] ${position} `}>
                <h1 className='welcomeText !text-gray-700 relative !text-[25px] mb-20 font-normal italic'>Hello <strong>{capitalizeFirstLetter(username, true)}</strong>, <span style={{ fontStyle: 'italic' }}>{greetMessage}</span> How can I help you today?</h1>
                <form onSubmit={handleSubmit} className='relative'>
                    <input type="text" value={value}
                        placeholder='Ask anything'
                        onChange={handleUserInput}
                        className='bg-white text-gray-900 py-[15px] px-[20px] border-0 rounded-[25px] w-[74%] my-0 mx-[auto] outline-0 text-[18px] shadow-[2px_2px_30px_0px_rgba(0,0,0,0.3)]' />
                    <button disabled={isButtonDisabled} className='sendButton disabled:bg-black/30 absolute right-[105px] top-[5px] text-center bg-black text-white border-0 cursor-pointer w-[40px] h-[40px] rounded-[30px] disabled:cursor-not-allowed'><ArrowUpIcon className='w-[25px] h-[25px] relative left-[8px]'/></button>

                </form>
            </div>
        </div>
    )
}

export default ChatInput