import { useNavigate } from 'react-router'
import { useState, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import { AppContext } from '../contextapi/AppContext';
import chatbotVideo from "/chatbot.webm";
import { motion } from 'motion/react'

function Login() {
    const { username, updateUsername } = useContext(AppContext);
    const navigate = useNavigate();
    const initialState = {
        username: ''
    }
    const [errorMessage, setErrorMessage] = useState('');
    const [formValue, setFormValue] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    let handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValue.username.length == 0) {
            setValidated(true);
            setErrorMessage('Username is required');
            return false;
        }
        //console.log(formValue)
        let userInfo = {
            username: formValue.username
        }
        setErrorMessage('');
        setValidated(false);
        setLoading(true);
        setTimeout(() => {
            updateUsername(userInfo.username)
            navigate('/chatbot');
        }, 5000)
    }
    let handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <>
            <div className='login flex items-center justify-center relative min-h-screen my-0 mx-[50px]'>
                <div className='loginLeft w-1/2'>
                    <div className='logo relative left-3/5'>
                        <img src='./chatcraft_logo.svg' className='w-1/3' />

                    </div>
                    <div className='technologies hidden'>
                        <p>ReactJS, TailwindCSS, Groq AI Model (llama-3.3-70b-versatile)</p>
                    </div>
                </div>
                <div className='loginRight w-1/2 relative'>
                    <div className='loginForm w-3/4 relative z-20 my-0 mx-[auto]'>
                        <form onSubmit={handleLogin} className='flex gap-6 flex-col'>
                            <h1 className='leading-[45px] !text-white'> <motion.div initial={{opacity:0, y:100}} animate={{opacity:1, y:50}} transition={{duration:0.9}} >AI Powered</motion.div> <br /><motion.div initial={{opacity:0, y:100}} animate={{opacity:1, y:0}} transition={{duration:1}} ><strong className='text-6xl'>Chatbot</strong></motion.div></h1>
                            <input type="text"

                                value={formValue.username}
                                name='username' placeholder='john@example.com'
                                onChange={handleChangeUsername}
                                className={`rounded-md py-3 px-3 my-0 mx-[auto] w-full 
                                text-[16px] border border-gray-400 outline-0 text-white placeholder:text-gray-400
                                focus:bg-white focus:text-gray-950  ${validated ? 'shadow-[0px_0px_33px_0px_rgba(249,_115,_22,_0.5)] border-red-500' : ''}`}
                            />
                            <button
                                className='rounded-md py-3 px-3 my-0 mx-[auto] w-full text-[16px]
                            cursor-pointer bg-[#1357d6] hover:bg-[#1b6aff] h-[50px] disabled:cursor-not-allowed disabled:bg-[#1357d6] disabled:opacity-60'>{loading ? <Loading /> : 'Login'}</button>
                            <p className='error text-[rgb(255,146,131)] text-left'>{errorMessage}</p>
                        </form>
                    </div>
                    <div className="bgGlow w-[250px] h-[250px] rounded-[125px] bg-[#21B2EC] absolute top-0 my-0 mx-[auto] filter-[blur(150px)] left-[calc(50%/2)]"></div>
                    <div className="bgGlow Two w-[250px] h-[250px] rounded-[125px] bg-[#6d028d] absolute top-10 right-0 filter-[blur(80px)] left-[calc(50%/1)"></div>
                </div>
                <div className='chatbot absolute bottom-0 left-0 w-[250px] m-0 p-0'>
                    <img src="./chatbot2.png" className='w-[100%] ' />
                    {/* <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className='w-[100%]'
                    >
                        <source src={chatbotVideo} type="video/webm" />
                    </video> */}
                </div>
            </div>
        </>
    )
}

export default Login