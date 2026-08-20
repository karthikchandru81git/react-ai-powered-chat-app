import { useState, useEffect } from 'react'
import Chatbot from "../pages/Chatbot"
import { Popover, Tooltip } from "radix-ui";
import { useNavigate } from 'react-router';
import { capitalizeFirstLetter } from '../utilities/utilities'
import { PanelLeftOpenIcon, PanelLeftCloseIcon, MenuIcon, Settings, User2, DownloadIcon } from 'lucide-react'
import ToolTipPreview from './ToolTipPreview';
import { useApp } from '../contextapi/AppContext';
import Switch from './Switch';

type TooltipDemoType = {
    username: string | undefined,
    fullname: string | undefined,
    theme: boolean
}

export const TooltipDemo = ({ username, fullname, theme }: TooltipDemoType) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <strong className={`w-[35px] h-[35px] font-normal  rounded-[40px] text-center block leading-[35px]  ${theme ? 'bg-white text-black' : 'bg-black text-white'}`}>{username}</strong>
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
    username: string,
    toggle: boolean,
    theme: boolean
}
const PopoverDemo = ({ username, toggle, theme }: PopoverDemoType) => {
    let navigate = useNavigate();
    let handleLogout = () => {
        navigate('/login');
        sessionStorage.removeItem('chat_history');
        sessionStorage.removeItem('userInfo');
    }
    //3b3683
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <div className={`loggedInUser transition-all duration-300 ease-in-out absolute bottom-[0px] cursor-pointer left-0 ${theme ? 'bg-[#0f0b46]' : 'bg-[#c4c4c4]'} ${toggle ? 'w-[200px]' : 'w-[60px]'} py-3 px-2`}>
                    <div className="loggedInUserCircle flex gap-2">
                        <TooltipDemo theme={theme} username={capitalizeFirstLetter(username, false)} fullname={capitalizeFirstLetter(username, true)} />
                        <p className={`text-[14px] ${theme ? 'text-white' : 'text-black'} relative top-2.5 ${toggle ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity duration-300 ease-in-out`}>{capitalizeFirstLetter(username, true)}</p>
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
type MenuItem = {
    text: string,
    link: string,
    id?: string | number
}

type MenuType = {
    text:string
}
function Layout() {
    let { username } = useApp();
    let navigate = useNavigate();
    let [toggle, setToggle] = useState(false);
    let { theme, updateSetTheme } = useApp();

    let menus: MenuItem[] = [
        { text: 'Settings', link: '' },
        { text: 'Profile', link: '' },
        { text: 'Downloads', link: '' }
    ];
    let handleSidebarExpand = () => {
        setToggle(true);
    }
    let handleSidebarClose = () => {
        setToggle(false);
    }

    useEffect(() => {
        if (username === undefined) {
            navigate('/login');
        }
    }, [])

    let renderMenuIcons = (menu:MenuType) => {
        if (menu.text === 'Profile') {
            return <User2 />
        } else if (menu.text === 'Downloads') {
            return <DownloadIcon />
        }
        else {
            return <Settings />
        }
    }

    return (
        <>
            <div className={`layout ${theme ? 'bg-[#0A0928]' : 'bg-[#e9e9e9]'} w-full flex w-full h-screen relative`}>
                <MenuIcon className={`absolute top-3 left-3 ${theme ? 'text-white' : 'text-black' } cursor-pointer md:hidden lg:hidden z-500 ${toggle ? 'hidden' : 'block'}`} onClick={handleSidebarExpand} />

                <div className={`sideBar transition-all shadow-2xl duration-300 ease-in-out w-[60px] p-0 ${theme ? 'bg-[#272269] shadow-black' : 'bg-[#ffffff] shadow-gray-500'}   group text-left fixed h-screen z-[400]  ${toggle ? 'w-[200px] block ' : 'hidden md:block  '} `}>

                    <div className={`menus transition-all duration-300 ease-in-out text-white absolute top-20  border-t ${theme ? 'border-white/40' : 'border-black/20'} ${toggle ? 'w-[200px]' : 'w-[60px]'}`}>
                        <ul className='flex flex-col gap-3 m-5 [&_li]:cursor-pointer'>
                            {
                                menus.map((menu, index) => {
                                    return (
                                        <li key={menu.id || index} className={`${theme ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} flex gap-2`}>

                                            <div className='opacity-100'>{renderMenuIcons(menu)}</div>
                                            <div className={` transition-opacity duration-300 ease-in-out ${toggle ? 'opacity-100' : 'opacity-0'}`}>{menu.text}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className={`flex flex-col border-t  gap-2  cursor-pointer ${toggle ? 'w-[200px] p-5' : 'w-[60px] p-0'} transition-all duration-300 ease-in-out ${theme ? 'border-t-white/50' : 'border-t-black/50'}`}>
                            <div className={`text-1xl ${theme ? 'text-white/70' : 'text-black/70 '} ${toggle ? 'opacity-100' :'opacity-0'} transition-opacity duration-300 ease-in-out`}>Theme</div>
                            <div className={`${toggle ? 'left-0' : 'left-3'} relative`}><Switch theme={theme} onChange={updateSetTheme} toggle={toggle}/></div>
                            {/* <div className={`cursor-pointer ${theme ? 'text-white/70 group-hover/theme:text-white' : 'text-black/70 group-hover/theme:text-black'}`} >
                                {theme ? <SunIcon className='w-5 h-5 mt-0.5' /> : <MoonIcon className='w-5 h-5 mt-0.5' />} 
                            </div>*/}
                        </div>
                        
                    </div>
                    <div className="logo my-0 mx-[auto]  w-[35px] h-[35px]  absolute top-[15px] left-[10px]">
                        <img src={`${theme ? './chatcraft_white.svg' : './chatcraft_black.svg'}`} className={` ${toggle ? 'block group-hover:block' : 'group-hover:hidden'} `} />
                        <ToolTipPreview text="Open sidebar">
                            <PanelLeftOpenIcon className={`hidden ${theme ? 'text-white/50 hover:text-white' : 'text-black'} group-hover:block absolute top-0 right-2 cursor-pointer w-6 h-6 m-auto ${toggle ? 'block group-hover:hidden' : ''}`} onClick={handleSidebarExpand} />
                        </ToolTipPreview>
                        <ToolTipPreview text="Close sidebar">
                            <PanelLeftCloseIcon className={`absolute ${theme ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'} top-1 -right-[140px] cursor-pointer w-6 h-6 m-auto ${toggle ? 'block group-hover:block' : 'hidden'}`} onClick={handleSidebarClose} />
                        </ToolTipPreview>
                    </div>
                    <PopoverDemo username={username} toggle={toggle} theme={theme} />
                </div>
                <div className={`chatSection transition-all duration-300 ease-in-out   relative ${toggle ? 'left-[17%] w-[80%]' : 'left-[0%] w-[100%] md:w-[93%] md:left-[70px] lg:w-[93%]'}  h-screen z-[300]`}>
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