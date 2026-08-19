import { useState } from 'react'
import Chatbot from "../pages/Chatbot"
import { Popover, Tooltip } from "radix-ui";
import { useNavigate } from 'react-router';
import { capitalizeFirstLetter } from '../utilities/utilities'
import { PanelLeftOpenIcon, PanelLeftCloseIcon, MenuIcon } from 'lucide-react'
import ToolTipPreview from './ToolTipPreview';

type TooltipDemoType = {
    name: string | undefined,
    fullname: string | undefined
}

export const TooltipDemo = ({ name, fullname }: TooltipDemoType) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <strong className='w-[35px] h-[35px] font-normal bg-white rounded-[40px] text-center block leading-[35px] text-black'>{name}</strong>
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
    name: string,
    toggle: boolean
}
const PopoverDemo = ({ name, toggle }: PopoverDemoType) => {
    let navigate = useNavigate();
    let handleLogout = () => {
        navigate('/login');
        sessionStorage.removeItem('chat_history');
        sessionStorage.removeItem('user_info');
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <div className={`loggedInUser absolute bottom-[0px] cursor-pointer left-[0px] bg-[#3b3683] ${toggle ? 'w-[160px]' : 'w-[60px]'} py-3 px-2`}>
                    <div className="loggedInUserCircle flex gap-2">
                        <TooltipDemo name={capitalizeFirstLetter(name, false)} fullname={capitalizeFirstLetter(name, true)} />
                        <p className={`text-[14px] relative top-2.5 ${toggle ? 'block' : 'hidden'}`}>{capitalizeFirstLetter(name, true)}</p>
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

function Layout() {
    let user_info = sessionStorage.getItem('user_info');
    let info = JSON.parse(user_info || '{}');
    let [name] = useState(info.username);
    let [toggle, setToggle] = useState(false);
    let menus = [
        { name: 'Settings', link: '' },
        { name: 'Profile', link: '' },
        { name: 'Downloads', link: '' }
    ]
    let handleSidebarExpand = () => {
        console.log('clicked')
        setToggle(true);
    }
    let handleSidebarClose = () => {
        setToggle(false);
    }

    return (
        <>
            <div className="layout w-full flex w-full h-screen relative">
                <MenuIcon className={`absolute top-3 left-3 text-white cursor-pointer md:hidden lg:hidden z-500 ${toggle ? 'hidden' : 'block'}`} onClick={handleSidebarExpand} />

                <div className={`sideBar w-[60px] p-0 bg-[#272269] group text-left fixed h-screen z-[400]  ${toggle ? 'w-[160px] block' : 'hidden md:block'} `}>

                    <div className={`menus text-white absolute top-20 w-[160px] border-t-1 border-white/40 ${toggle ? 'md:block lg:block' : 'hidden'}`}>
                        <ul className='flex flex-col gap-3 m-5 [&_li]:cursor-pointer'>
                            {
                                menus.map((menu, index) => {
                                    return(
                                        <li key={menu.id || index} className='text-white/70 hover:text-white'>{menu.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="logo my-0 mx-[auto]  w-[35px] h-[35px]  absolute top-[15px] left-[10px]">
                        <img src='./chatcraft_white.svg' className={` ${toggle ? 'block group-hover:block' : 'group-hover:hidden'}`} />
                        <ToolTipPreview text="Open sidebar">
                            <PanelLeftOpenIcon className={`hidden text-white/50 hover:text-white group-hover:block absolute top-0 right-2 cursor-pointer w-6 h-6 m-auto ${toggle ? 'block group-hover:hidden' : ''}`} onClick={handleSidebarExpand} />
                        </ToolTipPreview>
                        <ToolTipPreview text="Close sidebar">
                            <PanelLeftCloseIcon className={` absolute text-white/50 hover:text-white top-1 -right-28 cursor-pointer w-6 h-6 m-auto ${toggle ? 'block group-hover:block' : 'hidden'}`} onClick={handleSidebarClose} />
                        </ToolTipPreview>
                    </div>
                    <PopoverDemo name={name} toggle={toggle} />
                </div>
                <div className={`chatSection  relative ${toggle ? 'left-[17%] w-[80%]' : 'left-[0%] w-[100%] md:w-[93%] md:left-[80px] lg:w-[93%]'}  h-screen z-[300]`}>
                    <Chatbot />
                </div>
                <div className='chatbotInner hidden fixed right-0 bottom-0 lg:w-[550px] md:w-[250px] m-0 p-0'>
                    <img src='./chatbot3.png' className='w-full opacity-[0.3] relative top-5' />
                </div>
            </div>
        </>
    )
}

export default Layout