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
                    <strong className='w-[50px] h-[50px] bg-white rounded-[50px] text-center block leading-[50px] text-gray-900'>{name}</strong>
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
                <div className="sideBar w-[6%] p-0 bg-[#110f3d] text-left fixed h-screen">
                    <div className="logo my-0 mx-[auto] w-[50px] absolute top-[15px] left-[15px]">
                        <img src='./chatcraft_tiny.svg' />
                    </div>
                    <PopoverDemo name={name} />

                </div>
                <div className="chatSection w-[90%] relative left-[7%] h-screen z-[300]">
                    <Chatbot />
                </div>
                <div className='chatbotInner fixed right-0 bottom-0 w-[550px] m-0 p-0'>
                    <img src='./chatbot3.png' className='w-full opacity-[0.3] relative top-5'/>
                </div>
            </div>
        </>
    )
}

export default Layout