import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Icons/airbnb_logo.png";
import svg_icons from "../assets/Icons/svg_icons";
import { useDispatch } from "react-redux";
import { setLogout } from "../state/UserState";
import axios from "axios";

export default function Navbar(props){
    const [isUserMenuButtonClicked, setIsShowUserMenuButtonClicked] = useState(false);
    const [activeNavbarTitleOption, setActiveNavbarTitleOption] = useState(props.activeNavbarOption);
    
    const scrollableDivRef = useRef(null);
    const user = useSelector((state) => state.user);
    const userImage = user ? user.picturePath : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeActiveNavbarTitleOption(option) {
        setActiveNavbarTitleOption(option);
        props.changeActiveNavbarOption(option);
    }

    function scrollToLeft() {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollLeft -= 410; 
        }
    }

    function scrollToRight() {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollLeft += 410; 
        }
    }

    function showUserMenu() {
        setIsShowUserMenuButtonClicked((isClicked) => !(isClicked));
    }

    function changeIsDisplayTotal() {
        props.changeDisplayTotal();
    }

    function changeOpenModal(e){
        if (e.target.getAttribute("value") === "Login") {
            props.changeLoginModal();
        }
        else if (e.target.getAttribute("value") === "Destination") {
            props.changeDestinationModal();
        }
    }

    async function logout(){
        dispatch(setLogout());
        await axios.get('logout', []);
        props.resetNavbar();
    }

    const navbar_title_options = [
        'Amazing pools', "Lakefront", "OMG!", "Earth homes", "Domes",
        "Mansions", "Amazing Views", "Beachfront", "Cabins", "Luxe",
        "Tiny homes", "Treehouses", "Design", "Off-the-grid", "Trending", "Boats",
        "Play", "Houseboats", "Farms", "Countryside", "A-frames", "Camping", "National parks",
        "Skiing", "Castles", "Chef's kitchen", "Yurts", "Islands", "Creative spaces",
        "Vineyards", "Containers", "Desert", "Bed & breakfasts", "Rooms", "Tropical",
        "Iconic cities", "Caves", "Historical homes", "New", "Artctic",
        "Surfing", "Top of the world", "Barns", "Ryokans", "Grand Pianos", 
        "Grand pianos", "Cycladic homes", "Towers", "Dammusi", "Adapted", "Golfing",
        "Ski-in/out", "Hanoks", "Minsus", "Riads", "Shepherd's huts", "Campers",
        "Casas particulares", "Windmills", "Trulli", "Beach", "Lake",
    ];

    const navbar_title_options_with_icons = []

    for (let i = 0; i < svg_icons.length; i++){
        navbar_title_options_with_icons.push(
            [navbar_title_options[i], svg_icons[i]]
        );
    };

    return (
        <div className="w-full fixed top-0 z-30">
            {/* Medium and Large Screens */}
            <div className="hidden md:flex lg:flex justify-between items-center lg:px-14 md:px-14 px-4 py-4 bg-white w-full z-30">
                <div onClick={props.resetNavbar} className="flex items-center cursor-pointer">
                    <img className="h-10 lg:mr-2 md:mr-6 mr-6" src={logo}/>
                    <p className="lg:flex md:hidden hidden font-bold text-red-500 text-2xl">airbnb</p>     
                </div>

                {props.isNavbarDestination === true && (
                    <div 
                    className="flex items-center border-2 border-solid border-gray-200 rounded-full shadow-sm hover:shadow-md ease-in-out duration-200 cursor-pointer text-center content-center gap-3 px-3 py-1"
                    value="Destination"
                    onClick={changeOpenModal}
                    >
                        <p onClick={changeOpenModal} value="Destination" className="pl-2 text-sm font-medium">{props.country}</p>
                        <p onClick={changeOpenModal} value="Destination" className="font-thin text-2xl text-gray-300">|</p>
                        {props.weeks !== "Any week" ? (
                            <p onClick={changeOpenModal} value="Destination" className="text-sm font-medium">{props.weeks[0]} - {props.weeks[1]}</p>
                        ) : (
                            <p onClick={changeOpenModal} value="Destination" className="text-sm font-medium">{props.weeks}</p>
                        )}
                        
                        <p onClick={changeOpenModal} value="Destination" className="font-thin text-2xl text-gray-300">|</p>
                        {(props.guests > 1) ? (
                            <p value="Destination" onClick={changeOpenModal} className="text-sm font-medium">{props.guests} guests</p>
                        ) : (props.guests > 0) ? (
                            <p value="Destination" onClick={changeOpenModal} className="text-sm font-medium">{props.guests} guest</p>
                        ) : (
                            <p value="Destination" onClick={changeOpenModal} className="text-sm font-medium text-gray-400">Add guests</p>
                        )}
                        
                        <button value="Destination" onClick={changeOpenModal} className="p-2 border-solid rounded-full bg-red-500 shadow-sm ease-in-out duration-300 text-white">
                            <svg value="Destination" onClick={changeOpenModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>
                )}
                

                <div 
                onClick={showUserMenu}
                >
                    <div className="px-3 pt-2 pb-2 border border-gray-200 rounded-full hover:shadow-lg shadow-sm ease-in-out duration-300 text-black font-medium text-2xl">
                        <button className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                            {(!user) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>  
                            ) : (
                                <img src={userImage} className="w-8 h-8 rounded-full shadow-lg"/>
                            )}
                            
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Small Screens */}
            <div className="lg:hidden md:hidden flex w-full px-4 py-4 gap-4 bg-white">
                {props.isNavbarDestination === true ? (
                    <div 
                    className="flex border-2 border-solid border-gray-300 rounded-full px-3 py-1.5 cursor-pointer grow rounded-full shadow-sm hover:shadow-md ease-in-out duration-200 cursor-pointer"
                    value="Destination"
                    onClick={changeOpenModal}
                    >
                        <button className="p-2 mr-1.5">
                            <svg value="Destination" onClick={changeOpenModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                        <div value="Destination" onClick={changeOpenModal} className="flex flex-col">
                            <p value="Destination" onClick={changeOpenModal} className="text-sm font-semibold">{props.country}</p>
                            <div cvalue="Destination" onClick={changeOpenModal} className="flex items-center">
                                {props.weeks !== "Any week" ? (
                                    <p value="Destination" onClick={changeOpenModal} className="text-xs text-gray-400">{props.weeks[0]} - {props.weeks[1]}</p>
                                ) : (
                                    <p value="Destination" onClick={changeOpenModal} className="text-xs text-gray-400">{props.weeks}</p>
                                )}
                                
                                <p value="Destination" onClick={changeOpenModal} className="text-xs text-gray-400 mx-0.5">•</p>
                                {(props.guests > 1) ? (
                                    <p value="Destination" onClick={changeOpenModal} className="text-xs text-gray-400">{props.guests} guests</p>
                                ) : (props.guests > 0) ? (
                                    <p value="Destination" onClick={changeOpenModal} className="text-xs text-gray-400">{props.guests} guest</p>
                                ) : (
                                    <p value="Destination" onClick={changeOpenModal} className="text-xs text-gray-400">Add guests</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div onClick={props.resetNavbar} className="flex grow justify-between items-center cursor-pointer">
                        <img className="h-10 lg:mr-2 md:mr-6 mr-6" src={logo}/>  
                    </div>
                )}
                

                <div 
                onClick={showUserMenu}
                >
                    <div className="px-3 pt-2 pb-2 border border-gray-200 rounded-full hover:shadow-lg shadow-sm ease-in-out duration-300 text-black font-medium text-2xl">
                        <button className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                            {(!user) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>  
                            ) : (
                                <img src={userImage} className="w-8 h-8 rounded-full shadow-lg"/>
                            )}
                            
                        </button>
                    </div>
                </div>
                
            </div>
            
            {(isUserMenuButtonClicked === true) && (
                    <div
                    className="fixed flex flex-col z-50"
                    >
                        {(!user) && (
                            <div className="fixed flex flex-col rounded-xl shadow-even py-2 w-64 bg-white right-0 mr-14">
                                <span value="Login" className="text-sm font-semibold hover:bg-gray-100 cursor-pointer px-4 py-3" onClick={changeOpenModal}>Sign up</span>
                                <h3 value="Login" className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-3" onClick={changeOpenModal}>Log in</h3>
                                <hr />
                                <span className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-3">Help center</span>
                            </div>
                        )}
                        {(user) && (
                            <div className="fixed flex flex-col rounded-xl shadow-even py-2 w-64 bg-white right-0 mr-14">
                                <span className="text-sm font-semibold hover:bg-gray-100 cursor-pointer px-4 py-3">Messages</span>
                                <span onClick={() => navigate(`/trips/${user._id}`)} className="text-sm font-semibold hover:bg-gray-100 cursor-pointer px-4 py-3">Trips</span>
                                <span onClick={() => navigate(`/wishlists/${user._id}`)} className="text-sm font-semibold hover:bg-gray-100 cursor-pointer px-4 py-5">Wishlists</span>
                                <hr/>
                                <span onClick={() => navigate(`/airbnbyourhome/${user._id}`)} className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-5">Airbnb your home</span>
                                <span className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-3">Refer a host</span>
                                <span className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-5">Account</span>
                                <hr/>
                                <span className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-5">Help center</span>
                                <span onClick={logout} className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-3">Log out</span>
                            </div>
                            
                        )}
                    </div>
            )}

            {props.isNavbarOptions === true && (
                <div className="flex w-full items-center z-40 bg-white">
                    <button 
                    className="translate-x-12 hidden lg:block md:block"
                    onClick={scrollToLeft}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <div 
                    className="flex lg:w-full md:w-1/2 w-screen gap-10 lg:mx-14 md:mx-14 px-6 py-4 bg-white overflow-x-auto overflow-y-visible no-scrollbar"
                    ref={scrollableDivRef}
                    style={{ scrollBehavior: 'smooth' }}
                    >
                        {navbar_title_options_with_icons.map((option) =>
                            <div 
                            key={option[0]} 
                            value={option[0]}
                            onClick={() => changeActiveNavbarTitleOption(option[0])}
                            className="w-full flex flex-col items-center text-center cursor-pointer text-gray-400 hover:text-black"
                            >
                                <img 
                                className="w-6" 
                                alt="image" 
                                src={option[1]}
                                />
                                <p className={`ease-in-out duration-200 text-${activeNavbarTitleOption === option[0] ? 'black' : ''} text-xs mt-2 whitespace-nowrap`}>{option[0]}</p>
                                {(activeNavbarTitleOption === option[0]) && (
                                    <hr className="ease-in-out duration-500 w-full translate-y-4 border-1 border-black"/>
                                )}
                            </div> 
                        )}
                    </div>

                    <button 
                    className="hidden lg:flex md:flex p-5 -translate-x-16"
                    onClick={scrollToRight}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <div className="flex gap-4">
                        <span
                            className="-translate-x-16 flex border border-gray-300 rounded-xl p-4 items-center gap-2 cursor-pointer hidden lg:flex md:flex"
                        >
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>
                            </button>
                            <p className="text-xs font-medium">Filters</p>
                        </span>

                        <span
                            className="-translate-x-16 flex border border-gray-300 rounded-xl items-center p-4 gap-2 cursor-pointer hidden lg:flex md:flex"
                        >
                            <p className="text-xs whitespace-nowrap font-medium">Display total before taxes</p>
                            <label 
                            className="relative inline-flex items-center cursor-pointer"
                            >
                                <input 
                                type="checkbox" 
                                value={props.isDisplayTotalBeforeTaxes}
                                className="sr-only peer"
                                onChange={changeIsDisplayTotal}
                                />
                                <div className="w-11 h-6 bg-gray-400 hover:bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                            </label>
                        </span>
                    </div>
                </div>
            )}
            
            <hr/>
        </div>
    )
}