import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useApp } from '../contextapi/AppContext';
import { CogIcon, UserIcon, KeyIcon } from 'lucide-react';
import DialogPreview from '../components/DialogPreview';

function Login() {
    //const { updateUsername } = useApp();
    let updateUsername = () => {
        
    }
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const initialState = {
        username: '',
        password: ''
    }
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [formValue, setFormValue] = useState(initialState);
    const [loading, setLoading] = useState(false);
    let isUsernameInValid = errorMessage.includes('Username is required');
    let isPasswordInValid = errorMessage.includes('Password is required');
    let handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors = [];
        if (formValue.username.length == 0) {
            errors.push('Username is required');
        }
        else if (formValue.username.length < 3) {
            errors.push('Username should more than 3 characters');
        }
        if (formValue.password.length === 0) {
            errors.push('Password is required');
        } else if (formValue.password.length < 8) {
            errors.push('Password should more than 8 characters');
        }
        if (errors.length > 0) {
            setErrorMessage(errors);
            return true;
        }
        let userInfo = {
            username: formValue.username
        }
        setErrorMessage([]);
        setLoading(true);
        setTimeout(() => {
            updateUsername(userInfo.username)
            navigate('/chatbot');
        }, 5000)
    }
    let handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    let handleOpenDialog = () => {
        setIsOpen(true);
    }
    const [isTouched, setIsTouched] = useState(false);

    return (
        <>
            <div style={{ color: 'red', fontSize: '30px' }}>TEST MOBILE</div>
            <div className='login flex items-center justify-center relative min-h-screen my-0 mx-[50px]'>
                <div className='loginLeft w-[50%] hidden sm:hidden md:hidden xl:block lg:block'>
                    <div className='logo relative left-3/8'>
                        <img src='./chatcraft_logo.svg' className='w-1/3' />
                        <div onClick={handleOpenDialog} className='technologies shadow-md sha shadow-cyan-300 relative flex gap-2 mt-5 ml-12 border-1 border-white w-[130px] px-5 py-2 rounded-md opacity-70 hover:opacity-100 cursor-pointer'>
                            <CogIcon className='text-white relative z-400 w-5 h-5 animate-spin' /><span>Built With</span>
                        </div>
                    </div>

                </div>

                <div className='loginRight w-full md:w-[50%] md:left-[130px] lg:left-10 lg:w-[30%] xl:w-[30%] 2xl:w-[40%] relative '>
                    <div className='relative z-50 top-[50px] m-auto block xl:hidden lg:hidden md:hidden'>
                        <img src='./chatcraft_logo.svg' className='w-[40%] sm:w-[60%] m-auto' />
                    </div>

                    <div className='loginForm  relative z-20 my-0 mx-[auto] sm:w-full md:w-full lg:w-full xl:w-[80%] 2xl:w-full'>
                        <form onSubmit={handleLogin} className='flex gap-3 flex-col'>
                            <h1 className='leading-[45px] !text-white'>
                                <div className='!text-4xl !text-white !font-[700]'>AI Powered</div>
                                <strong className='text-6xl'>Chatbot</strong>
                                {/* <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 50 }} transition={{ duration: 0.9 }} >AI Powered</motion.div>  */}

                                {/* <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} ><strong className='text-6xl'>Chatbot</strong>
                                </motion.div> */}
                            </h1>
                            <div className='field flex relative group'>
                                <div className='absolute top-4 left-4'><UserIcon className={`w-5 h-5 text-white group-focus-within:text-black  ${isTouched ? 'text-white' : 'text-black'} `} /></div>
                                <input type="text"
                                    onBlur={() => setIsTouched(true)}
                                    onFocus={() => setIsTouched(false)}
                                    value={formValue.username}
                                    name='username' placeholder='Username'
                                    onChange={handleInputChange}
                                    className={`rounded-md  py-3 px-3 my-0 mx-[auto] w-full 
                                text-[14px] border border-gray-400 outline-0 indent-10 text-white placeholder:text-gray-400
                                focus:bg-white focus:text-gray-950   ${isUsernameInValid ? 'shadow-[0px_0px_25px_0px_rgba(249,_115,_22,_0.3)] border-red-500' : 'shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.5)]'}`}
                                />
                            </div>
                            <div className='field flex relative group'>
                                <div className='absolute top-4 left-4'><KeyIcon className={`w-5 h-5 text-white group-focus-within:text-black  ${isTouched ? 'text-white' : 'text-black'} `} /></div>
                                <input type="password"
                                    onBlur={() => setIsTouched(true)}
                                    onFocus={() => setIsTouched(false)}
                                    value={formValue.password}
                                    name='password' placeholder='Password'
                                    onChange={handleInputChange}
                                    className={`rounded-md py-3 px-3 my-0 mx-[auto] indent-10 w-full 
                                text-[14px] border border-gray-400 outline-0 text-white placeholder:text-gray-400
                                focus:bg-white focus:text-gray-950  ${isPasswordInValid ? 'shadow-[0px_0px_25px_0px_rgba(249,_115,_22,_0.3)] border-red-500' : '[0px_0px_5px_1px_rgba(0,_0,_0,_0.5)]'}`}
                                />
                            </div>
                            <button
                                className='rounded-md py-3 px-3 my-0 mx-[auto] w-full text-[16px]
                            cursor-pointer bg-[#1357d6] hover:bg-[#1b6aff] h-[50px] disabled:cursor-not-allowed disabled:bg-[#1357d6] disabled:opacity-60'>{loading ? <Loading /> : 'Login'}</button>
                            <ul className='error text-[rgb(255,146,131)] text-left'>{errorMessage.map((message, index) => { return (<li key={index}>{message}</li>) })}</ul>
                        </form>
                    </div>
                    <div className="bgGlow w-[250px] h-[250px] rounded-[125px] bg-[#21B2EC] absolute top-0 my-0 mx-[auto] filter-[blur(150px)] left-[calc(50%/2)]"></div>
                    <div className="bgGlow Two w-[250px] h-[250px] rounded-[125px] bg-[#6d028d] absolute top-10 right-0 filter-[blur(80px)] left-[calc(50%/1)"></div>
                </div>
                <div className='chatbot absolute bottom-0 left-0 w-[250px]  
                m-0 p-0 hidden sm:hidden md:block lg:block xl:block 
                md:w-[225px]'>
                    <img src="./chatbot2.png" className='w-[100%] ' />
                </div>
            </div>
            <DialogPreview open={isOpen} onOpenChange={setIsOpen} />
        </>
    )
}

export default Login