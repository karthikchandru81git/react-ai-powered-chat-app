import { Outlet } from "react-router"
import React, { useState } from 'react'
import Chatbot from "../pages/Chatbot"
import Logo from "./Logo";
import { Popover, Tooltip } from "radix-ui";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useNavigate } from 'react-router';
import { capitalizeFirstLetter } from '../utilities/utilities'

type TooltipDemoType = {
    name:string,
    fullname: string
}

const TooltipDemo = ({ name, fullname }: TooltipDemoType) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <strong className='w-[40px] h-[40px] font-normal bg-blue-950 rounded-[40px] text-center block leading-[40px] text-white'>{name}</strong>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={15} side="right">
                        <strong className=''>{fullname}</strong>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

type PopoverDemoType = {
    name:string
}
const PopoverDemo = ({ name }:PopoverDemoType) => {
    let navigate = useNavigate();
    let handleLogout = () => {
        navigate('/login');
        sessionStorage.removeItem('chat_history');
        sessionStorage.removeItem('user_info');
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <div className="loggedInUser absolute bottom-[30px] cursor-pointer left-[15px]">
                    <div className="loggedInUserCircle">
                        {/* <strong>{capitalizeFirstLetter(name, false)}</strong> */}
                        <TooltipDemo name={capitalizeFirstLetter(name, false)} fullname={capitalizeFirstLetter(name, true)} />
                    </div>
                </div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={15}>
                    <div>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}



type LayoutType = {
    children: any
}

function Layout({ children }:LayoutType) {
    let user_info = sessionStorage.getItem('user_info');
    let info = JSON.parse(user_info || '{}');
    let [name, setName] = useState(info.username)
    return (
        <>
            <div className="layout w-full flex w-full h-screen relative">
                <div className="sideBar w-[6%] p-0 bg-white/50 border-1 shadow-2xl shadow-gray-400 border-r-gray-400 text-left fixed h-screen z-[400]">
                    <div className="logo my-0 mx-[auto] w-[35px] h-[35px]  absolute top-[15px] left-[15px]">
                        <img src='./chatcraft_tiny.svg' />
                    </div>
                    <PopoverDemo name={name} />

                </div>
                <div className="chatSection w-[90%] relative left-[7%] h-screen z-[300]">
                    <Chatbot />
                </div>
                <div className='chatbotInner fixed right-0 bottom-0 lg:w-[550px] md:w-[250px] m-0 p-0'>
                    <img src='./chatbot3.png' className='w-full opacity-[0.3] relative top-5'/>
                </div>
            </div>
        </>
    )
}

export default Layout