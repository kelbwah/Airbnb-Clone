import { useState, useEffect } from "react";
import logo from "../assets/Icons/airbnb_logo.png";

export default function Navbar(props){

    const [guests, setGuests] = useState(0);
    
    return (
        <div>
            {/* Medium and Large Screens */}
            <div className="hidden md:flex lg:flex justify-between items-center lg:px-14 md:px-14 px-4 py-4">
                <div className="flex items-center cursor-pointer">
                    <img className="h-10 lg:mr-2" src={logo}/>
                    <p className="lg:flex md:hidden hidden font-bold text-red-500 text-2xl">airbnb</p>     
                </div>

                <div className="flex items-center border-2 border-solid border-gray-200 rounded-full shadow-md hover:shadow-xl ease-in-out duration-200 cursor-pointer text-center content-center gap-3 px-3 py-1">
                    <p className="lg:text-base md:text-sm text-sm font-medium">Anywhere</p>
                    <p className="font-thin text-2xl text-gray-300">|</p>
                    <p className="lg:text-base md:text-sm text-sm font-medium">Any week</p>
                    <p className="font-thin text-2xl text-gray-300">|</p>
                    {(guests > 1) ? (
                        <p className="lg:text-base md:text-sm text-sm font-medium">{guests} guests</p>
                    ) : (guests > 0) ? (
                        <p className="lg:text-base md:text-sm text-sm font-medium">{guests} guest</p>
                    ) : (
                        <p className="lg:text-base md:text-sm text-sm font-medium text-gray-400">Add guests</p>
                    )}
                    
                    <button className="p-2 border-solid rounded-full bg-red-500 hover:shadow-xl ease-in-out duration-300 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                    </button>
                </div>
                <div className="px-1.5 pt-2 pb-2 border-solid rounded-full bg-red-500 hover:shadow-xl shadow-lg ease-in-out duration-300 text-white font-medium text-2xl">
                    <button className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>  
                    </button>
                </div>
            </div>
            
            {/* Small Screens */}
            <div className="lg:hidden md:hidden flex w-full px-4 py-4">
                <div className="flex border-2 border-solid border-gray-300 rounded-full px-3 py-1.5 cursor-pointer grow rounded-full shadow-md hover:shadow-xl ease-in-out duration-200 cursor-pointer">
                    <button className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold">Anywhere</p>
                        <div className="flex">
                            <p className="text-sm text-gray-400">Any week</p>
                            <p className="font-thin text-2xl text-gray-300">|</p>
                            <p className="text-sm text-gray-400">Add guests</p>
                        </div>
                        
                    </div>
                </div>
            </div>

            <hr/>
        </div>
    )
}