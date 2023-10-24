import { useState } from "react";
import { Button, Spinner } from 'flowbite-react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/UserState";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";

export default function Login_Modal(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
    const [profilePicture, setProfilePicture] = useState(null);
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault();

        if (isLoginOrRegister === "register") {
            try{
                setIsLoading(true);
                const formData = new FormData();

                formData.append('email', email);
                formData.append('password', password);
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);
                formData.append('picture', profilePicture);
                formData.append('picturePath', profilePicture.name);
    
                const {data} = await axios.post('register', formData);
                if (data.token) {
                    dispatch(
                        setLogin({
                            user: data.user,
                            token: data.token,
                        })
                    )
                };
                console.log('registered successfully');
                setIsLoading(false);
                props.changeLoginModal();
            } catch (err) {
                setIsLoading(false);
                setIsError(true);
                console.error(err);
            }
            
        } else if (isLoginOrRegister === "login") {
            try{
                setIsLoading(true);
                const {data} = await axios.post('login', {email, password});
                if (data.token) {
                    dispatch(
                        setLogin({
                            user: data.user,
                            token: data.token,
                        })
                    )
                };
                console.log('logged in successfully');
                setIsLoading(false);
                props.changeLoginModal();
            } catch (err) {
                setIsLoading(false);
                setIsError(true);
                console.log(err);
            } 
            
        };   
        
    }  

    function changeIsLoginOrRegister(type){
        setIsLoginOrRegister(type);
        console.log(type);
    }

    function changeOpenModal(){
        props.changeLoginModal();
    }

    function changeProfilePicture(e){
        setProfilePicture(e);
    }

    return (
        <>  
            <div className="fixed inset-0 flex items-center justify-center content-center z-40 bg-gray-700 bg-opacity-60 h-screen w-screen overflow-y-scroll overflow-x-scroll">
                <div className="lg:w-128 md:w-108 w-full inset-x-0 bottom-0 lg:top-full md:top-full z-50 bg-white rounded-xl opacity-0 animate-move-and-fade">
                    <div className="flex lg:justify-between md:justify-between justify-center items-center pl-4">
                        <span 
                        className="lg:flex md:flex hidden p-2 rounded-full hover:bg-gray-100 cursor-pointer ease-in-out duration-200"
                        onClick={changeOpenModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                        <h1 className="py-8 font-semibold text-lg text-center pr-8">{isLoginOrRegister === "login" ? "Log in" : "Sign up" }</h1>
                        <p>&nbsp;</p>
                    </div>
                    <hr/>
                    <div className="p-6">
                        {isLoginOrRegister === "login" ? (
                            <form
                            className="space-y-6 pt-2"
                            onSubmit={handleSubmit}
                            value={isLoginOrRegister}
                            >
                                {isError === true && (
                                    <Toast className="animate-move-and-fade">
                                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                            <HiX className="h-5 w-5" />
                                        </div>
                                        <div className="ml-3 text-sm font-normal">
                                            Incorrect email or password. Try again.
                                        </div>
                                        <Toast.Toggle onClick={() => setIsError(false)}/>
                                    </Toast>
                                )}
                                
                                <h1 className="mb-2 text-2xl font-medium flex justify-between items-center">Welcome back to Airbnb!
                                    <span 
                                    className="lg:hidden md:hidden flex p-2 rounded-full hover:bg-gray-100 cursor-pointer ease-in-out duration-200"
                                    onClick={changeOpenModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                </h1>
                                <div>
                                    <div className="mb-6">
                                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required id="large-input" className=" mb-6 block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black invalid:bg-red-50 focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required id="large-input" className="block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black invalid:bg-red-50 focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                    </div>
                                </div>
                                
                                <div className="w-full mb-2">
                                    <Button type="submit" value="login" className="ease-in-out duration-200 p-2 active:p-1 active:ml-5 w-full active:w-11/12 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl">
                                        <p className="text-base">
                                            {isLoading === false ? 
                                                "Log in" 
                                                : 
                                                <Spinner/>
                                            }
                                        </p>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <hr className="border border-gray-200 border-1.5 w-2/4"/>
                                    <p className="text-gray-500 text-sm">or</p>
                                    <hr className="border border-gray-200 border-1.5 w-2/4"/>
                                </div>
                                <div className="w-full pb-6">
                                    <Button onClick={ () => changeIsLoginOrRegister("register") } value="register" className="ease-in-out duration-200 p-2 active:p-1 active:ml-5 active:mr-1 w-full active:w-11/12 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl"><p className="text-base">Sign up</p></Button>
                                </div>
                            </form>
                        ) : (
                            <form 
                            encType="multipart/form-data"
                            className="space-y-6 pt-2 "
                            onSubmit={handleSubmit}
                            value={isLoginOrRegister}
                            >
                                {isError === true && (
                                    <Toast>
                                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                            <HiX className="h-5 w-5" />
                                        </div>
                                        <div className="ml-3 text-sm font-normal">
                                            User already exists. Try again
                                        </div>
                                        <Toast.Toggle onClick={() => setIsError(false)}/>
                                    </Toast>
                                )}
                                <h1 className="mb-2 text-2xl font-medium flex justify-between items-center">Welcome to Airbnb!
                                    <span 
                                    className="lg:hidden md:hidden flex p-2 rounded-full hover:bg-gray-100 cursor-pointer ease-in-out duration-200"
                                    onClick={changeOpenModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                </h1>
                                <div>
                                    <div className="mb-6">
                                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required id="large-input" className=" mb-6 block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black invalid:bg-red-50 focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required id="large-input" className="mb-6 block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black invalid:bg-red-50 focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" type="text" required id="large-input" className="mb-6 block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black invalid:bg-red-50 focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" type="text" required id="large-input" className="mb-6 block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black invalid:bg-red-50 focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                        
                                        <div className="mb-6">
                                            <p className="text-base mb-2 font-medium"> Upload your profile picture (required)</p>
                                            <input
                                               type="file"
                                               accept=".png, .jpg, .jpeg, .webp"
                                               onChange={(e) => changeProfilePicture(e.target.files[0])}
                                               required
                                               className="w-full border-2 border-black bg-slate-100"
                                            />
                                            <p className="mt-2 text-xs">Accepted file types: .PNG .JPG .JPEG .WEBP</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="w-full mb-2">
                                    <Button type="submit" value="register" className="ease-in-out duration-200 p-2 active:p-1 active:ml-5 w-full active:w-11/12 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl">
                                        <p className="text-base">
                                            {isLoading === false ? 
                                                "Sign Up" 
                                                : 
                                                <Spinner/>
                                            }
                                        </p>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <hr className="border border-gray-200 border-1.5 w-2/4"/>
                                    <p className="text-gray-500 text-sm">or</p>
                                    <hr className="border border-gray-200 border-1.5 w-2/4"/>
                                </div>
                                <div className="w-full pb-6">
                                    <Button onClick={ () => changeIsLoginOrRegister("login") } value="register" className="ease-in-out duration-200 p-2 active:p-1 active:ml-5 active:mr-1 w-full active:w-11/12 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl"><p className="text-base">Log in</p></Button>
                                </div>
                            </form>
                        )}
                    </div>    
                </div>
                
            </div>

        </>
    )
}

