import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer, Toast, Select, Label, Spinner } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiX, HiPlus, HiMinus, HiOutlinePhotograph, HiCheck } from "react-icons/hi";
import { BsDoorOpen, BsHouseDoor } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import { CSSTransition } from "react-transition-group";
import InputMask from "react-input-mask";
import CalendarAirbnbYourHome from "../components/CalendarAirbnbYourHome";



export default function AirbnbYourHome(props){

    const userId = useParams().id;

    const user = useSelector((state) => state.user);
    const [isError, setIsError] = useState([false, ""]);
    const [isCongrats, setIsCongrats] = useState([false, ""]);
    const [isLoading, setIsLoading] = useState([false, ""]);

    const navigate = useNavigate();
    const availableDestinations = [
        "Europe", "Italy", "Southeast Asia",
        "Mexico", "South America", "Canada", "Caribbean", "United Kingdom",
    ]; 

    const classOptions = [
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

    const [formLevel, setFormLevel] = useState(1); // Up to 5 form levels
    const [showCalendarComponent, setShowCalendarComponent] = useState(false);

    function resetNavbar() {
        props.setIsNavbarOptions(true);
        props.setIsNavbarDestination(true);
        navigate('/');
        window.location.reload();
    }

    function changeFormLevel(newLevel){
        if (newLevel !== 0) {
            setFormLevel(newLevel);
        }
        
    }

    async function uploadPhoto(photo){
        const photoFormData = new FormData();
        photoFormData.append('photo', photo);

        const {data} = await axios.post('photo/upload', photoFormData);
        console.log(data);
        if (data) {

            formOptions.photos.push(data);
            setIsError([false, '']);
            setIsCongrats([true, 'Photo uploaded!']);

            // Using this to update state of photo grid
            let formOptionsPhotosCopy = [...formOptions.photos];
            changeFormOption('photos', formOptionsPhotosCopy);

        } else {
            setIsError([true, 'Error uploading photo!']);
        }
        
    }


    async function addHomeToRentingList(){ 
        try{
            setIsLoading([true, 'Creating your listing...']);
            
            const formData = new FormData();
            formData.append('host', formOptions.host);
            formData.append('photos', formOptions.photos);
            formData.append('title', formOptions.title);
            formData.append('startDate', formOptions.startDate);
            formData.append('endDate', formOptions.endDate);
            formData.append('priceBeforeTax', formOptions.priceBeforeTax);
            formData.append('priceAfterTax', ((+formOptions.priceBeforeTax * 0.1) + +formOptions.priceBeforeTax));
            formData.append('description', `${formOptions.description} hosted by ${user.firstName}`);
            formData.append('type', formOptions.type);
            formData.append('numGuests', formOptions.numGuests);
            formData.append('numBedrooms', formOptions.numBedrooms);
            formData.append('numBaths', formOptions.numBaths);
            formData.append('numBeds', formOptions.numBeds);
            formData.append('country', formOptions.country);

            console.log(formOptions);
            
            const {data} = await axios.post('airbnbyourhome', formData);

            

            if (data) {
                setIsLoading([false, ""]);
                setFormLevel(5);
            }
            

        } catch (err) {
            setIsLoading([false, ""]);
            setIsError([true, err]);
            console.log(err);
        }
    }

    props.setIsNavbarOptions(false);
    props.setIsNavbarDestination(false);

    const initialFormOptions = {
        host: userId,
        title: null,
        startDate: null,
        endDate: null,
        photos: [],
        priceBeforeTax: 0,
        description: null,
        type: "Amazing pools",
        numGuests: 1,
        numBedrooms: 0,
        numBaths: 0.5,
        numBeds: 1,
        country: "Europe",
    }

    const [formOptions, setFormOptions] = useState(initialFormOptions);

    function changeFormOption(formOption, value){
        setFormOptions((prev) => ({
            ...prev,
            [formOption]: value
        }))
    }

    async function addPhoto(photo){

        try {
            setIsError([true, 'Uploading Photo...']);
            await uploadPhoto(photo);
        } catch (err) {
            console.log(err);
            setIsError([true, err]);
        }

    }

    function removePhoto(photo){
        let formOptionsIndex = formOptions.photos.indexOf(photo);

        let formOptionsPhotosCopy = [...formOptions.photos];

        formOptionsPhotosCopy.splice(formOptionsIndex, 1);

        setFormOptions((prev) => ({
            ...prev,
            ['photos']: formOptionsPhotosCopy
        }));
    }

    function changeFormOptionNumerical(formOption, value){
        if (value >= 0 && formOption !== "numBaths" && formOption !== "numBeds" && formOption !== "numGuests" && formOption !== "priceBeforeTax") {
            setFormOptions((prev) => ({
                ...prev,
                [formOption]: value
            }))
        } else if (value >= 0.5 && formOption === "numBaths"){
            setFormOptions((prev) => ({
                ...prev,
                [formOption]: value
            }))
        } else if (value >= 1 && formOption === "numBeds"){
            setFormOptions((prev) => ({
                ...prev,
                [formOption]: value
            }))
        } else if (value >= 1 && formOption === "numGuests"){
            setFormOptions((prev) => ({
                ...prev,
                [formOption]: value
            }))
        } else if (formOption === "priceBeforeTax" && value !== "$"){
            setFormOptions((prev) => ({
                ...prev,
                [formOption]: value.slice(1)
            }))
        }
        
    }

    async function filledInInformation(currFormLevel){
        switch (currFormLevel) {
            case 1:
                if ((formOptions.title !== null) && (formOptions.description !== null)) {
                    changeFormLevel(2);
                } else {
                    setIsError([true, "Fill in all the details!"]);
                }
                break;
            case 2:
                if ((formOptions.title !== null) && (formOptions.priceBeforeTax > 0)) {
                    changeFormLevel(3);
                } else {
                    setIsError([true, "Price has to be greater than 0"]);
                }
                break;
            case 3:
                if ((formOptions.startDate !== null) && (formOptions.endDate !== null) && (formOptions.country !== null) && (formOptions.type !== null)) {
                    changeFormLevel(4);
                } else {
                    setIsError([true, "Fill in all the details!"]);
                }
                break;
            case 4:
                if (formOptions.photos.length >= 5) {
                    await addHomeToRentingList(); 
                    
                } else {
                    setIsError([true, "Must have a minimum of 5 photos!"]);
                }
                break;
        }
    }

    return (
        <div>

            {isError[0] === true && (
                <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {isError[1]}
                    </div>
                    <Toast.Toggle onClick={() => setIsError([false, ""])}/>
                </Toast>
            )}
            

            {isLoading[0] === true && (
                <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {isLoading[1]}
                    </div>
                    <Toast.Toggle onClick={() => setIsLoading([false, ""])}/>
                </Toast>
            )}


            <Navbar
            changeDisplayTotal={props.changeDisplayTotal}
            changeLoginModal={props.changeLoginModal} 
            changeDestinationModal={props.changeDestinationModal}
            guests={props.guests}
            weeks={props.weeks}
            country={props.country}
            filters={props.filters}
            setGuests={props.setGuests}
            setWeeks={props.setWeeks}
            setCountry={props.setCountry}
            setFilters={props.setFilters}
            isNavbarOptions={props.isNavbarOptions}
            isNavbarDestination={props.isNavbarDestination}
            resetNavbar={resetNavbar}
            isDisplayTotalBeforeTaxes={props.isDisplayTotalBeforeTaxes}
            />
            <div className="flex flex-col justify-center items-center gap-4 w-screen h-screen lg:px-32 md:px-14 px-8 pt-6 lg:mb-1 md:mb-1 mb-56">
                <form encType="multipart/form-data" onSubmit={() => addHomeToRentingList()} className="w-screen mt-20 h-full items-center justify-center"> 
                    {/* Form level 1 */}
                    {(formLevel === 1) ? (
                        <CSSTransition>
                            <div className="flex flex-col gap-12 items-center justify-center mt-14 fade-innerz">
                                <div className="flex flex-row justify-between lg:gap-16 md:gap-16 gap-6 items-center whitespace-nowrap">
                                    <h1 className="font-medium lg:text-3xl md:text-3xl text-2xl text-center">Tell us about your place</h1>
                                </div>
                                <div className="flex flex-col gap-4 items-center justify-center lg:w-3/5 md:2/3 w-2/3">
                                    <input value={formOptions.title} placeholder="Give your home a title" onChange={(e) => changeFormOption("title", e.target.value)} type="text" required id="large-input" className="lg:text-base md:text-sm text-sm text-center mb-6 block w-full p-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg sm:text-md focus:ring-black focus:border-black focus:invalid:ring-red-500 focus:invalid:border-red-500"/>
                                    <div className="flex flex-col w-full gap-4">
                                        <div onClick={() => changeFormOption("description", "An entire place")} className={`flex justify-between gap-4 items-center p-8 border ${(formOptions.description === "An entire place") ? "border-black" : "border-gray-300"} hover:border-black rounded-xl cursor-pointer ease-in-out duration-200`}>
                                            <div className="flex flex-col gap-1">
                                                <p className="lg:text-xl md:text-xl text-base font-medium">An entire place</p>
                                                <p className="text-xs font-light">Guests have the whole place to themselves.</p>
                                            </div>
                                            <BsHouseDoor className="lg:w-8 md:w-8 w-8 lg:h-8 md:h-8 h-8"/>
                                        </div>
                                        <div onClick={() => changeFormOption("description", "A room")} className={`flex justify-between gap-4 items-center p-8 border ${formOptions.description === "A room" ? "border-black" : "border-gray-300"} hover:border-black rounded-xl cursor-pointer ease-in-out duration-200`}>
                                            <div className="flex flex-col gap-1">
                                                <p className="lg:text-xl md:text-xl text-base font-medium">A room</p>
                                                <p className="text-xs font-light">Guests will have their own room in a home, plus access to shared spaces.</p>
                                            </div>
                                            <BsDoorOpen className="lg:w-8 md:w-8 w-8 lg:h-8 md:h-8 h-8"/>
                                        </div>
                                        <div onClick={() => changeFormOption("description", "A shared room") } className={`flex justify-between gap-4 items-center p-8 border ${formOptions.description === "A shared room" ? "border-black" : "border-gray-300"} hover:border-black rounded-xl cursor-pointer ease-in-out duration-200`}>
                                            <div className="flex flex-col gap-1">
                                                <p className="lg:text-xl md:text-xl text-base font-medium">A shared room</p>
                                                <p className="text-xs font-light">Guests will sleep in a room or common area that may be shared with you or others.</p>
                                            </div>
                                            <FaPeopleRoof className="lg:w-8 md:w-8 w-8 lg:h-8 md:h-8 h-8"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                        
                    ) : (formLevel === 2) ? (
                        <div className="flex flex-col gap-2 items-center justify-center mt-14 fade-innerz">
                            <div className="flex flex-row justify-center lg:gap-16 md:gap-16 gap-6 items-center w-full">
                                <h1 className="font-medium lg:text-3xl md:text-3xl text-2xl text-center px-12 mb-6">Share some basics about your place</h1>
                            </div>
                            <div className="flex flex-col gap-10 items-center justify-center lg:w-3/5 md:2/3 w-2/3 lg:mt-12 md:mt-12 mt-8">
                                <div className="flex justify-between w-full font-light text-xl">
                                    <p>Guests</p>
                                    <div className="flex gap-4">
                                        <HiMinus onClick={() => changeFormOptionNumerical("numGuests", (formOptions.numGuests - 1))} className={`rounded-full p-2 h-8 w-8 border ${formOptions.numGuests === 1 ? "cursor-not-allowed text-gray-300 border-gray-200" : "cursor-pointer text-gray-600 border-gray-400 hover:border-black"}`}/>
                                        <p>{formOptions.numGuests}</p>
                                        <HiPlus onClick={() => changeFormOptionNumerical("numGuests", (formOptions.numGuests + 1))} className="rounded-full p-2 h-8 w-8 cursor-pointer border border-gray-400 text-gray-600 hover:border-black"/>
                                    </div>
                                </div>
                                <hr className="border border-gray-200 w-full"/>
                                <div className="flex justify-between w-full font-light text-xl">
                                    <p>Bedrooms</p>
                                    <div className="flex gap-4">
                                        <HiMinus onClick={() => changeFormOptionNumerical("numBedrooms", (formOptions.numBedrooms - 1))} className={`rounded-full p-2 h-8 w-8 border ${formOptions.numBedrooms === 0 ? "cursor-not-allowed text-gray-300 border-gray-200" : "cursor-pointer text-gray-600 border-gray-400 hover:border-black"}`}/>
                                        <p>{formOptions.numBedrooms}</p>
                                        <HiPlus onClick={() => changeFormOptionNumerical("numBedrooms", (formOptions.numBedrooms + 1))} className="rounded-full p-2 h-8 w-8 cursor-pointer border border-gray-400 text-gray-600 hover:border-black"/>
                                    </div>
                                </div>
                                <hr className="border border-gray-200 w-full"/>
                                <div className="flex justify-between w-full font-light text-xl">
                                    <p>Beds</p>
                                    <div className="flex gap-4">
                                        <HiMinus onClick={() => changeFormOptionNumerical("numBeds", (formOptions.numBeds - 1))} className={`rounded-full p-2 h-8 w-8 border ${formOptions.numBeds === 1 ? "cursor-not-allowed text-gray-300 border-gray-200" : "cursor-pointer text-gray-600 border-gray-400 hover:border-black"}`}/>
                                        <p>{formOptions.numBeds}</p>
                                        <HiPlus onClick={() => changeFormOptionNumerical("numBeds", (formOptions.numBeds + 1))} className="rounded-full p-2 h-8 w-8 cursor-pointer border border-gray-400 text-gray-600 hover:border-black"/>
                                    </div>
                                </div>
                                <hr className="border border-gray-200 w-full"/>
                                <div className="flex justify-between w-full font-light text-xl">
                                    <p>Bathrooms</p>
                                    <div className="flex gap-4">
                                        <HiMinus onClick={() => changeFormOptionNumerical("numBaths", (formOptions.numBaths - 0.5))} className={`rounded-full p-2 h-8 w-8 border ${formOptions.numBaths === 0.5 ? "cursor-not-allowed text-gray-300 border-gray-200" : "cursor-pointer text-gray-600 border-gray-400 hover:border-black"}`}/>
                                        <p>{formOptions.numBaths}</p>
                                        <HiPlus onClick={() => changeFormOptionNumerical("numBaths", (formOptions.numBaths + 0.5))} className="rounded-full p-2 h-8 w-8 cursor-pointer border border-gray-400 text-gray-600 hover:border-black"/>
                                    </div>
                                </div>
                                <hr className="border border-gray-200 w-full"/>
                                <div className="flex justify-between w-full font-light text-xl">
                                    <p className="flex flex-col">Price <span className="text-sm">(Before taxes)</span></p>
                                    <InputMask
                                        mask="$9999999"
                                        value={formOptions.priceBeforeTax}
                                        onChange={(e) => changeFormOptionNumerical("priceBeforeTax", e.target.value)}
                                        maskChar=""
                                        alwaysShowMask={true}
                                        className="pl-3 border border-gray-600 rounded-lg lg:py-2 md:py-2 lg:w-1/4 md:w-1/4 w-2/4"
                                    />
                                </div>
                                
                            </div>
                        </div>
                    ) : (formLevel === 3) ? (
                        <CSSTransition>
                            <div className="flex flex-col gap-6 items-center justify-center lg:mt-20 md:mt-20 mt-10 fade-innerz">
                                <div className="flex flex-row justify-between lg:gap-16 md:gap-16 items-center mb-14">
                                    <h1 className="font-medium lg:text-3xl md:text-3xl text-2xl text-center">When and where will you be hosting?</h1>
                                </div>
                                <div className="flex flex-col gap-12 items-center justify-center w-full px-14">
                                    <div className="flex flex-col gap-4 lg:w-1/2 md:w-1/2 w-full">
                                        <Label
                                            htmlFor="countries"
                                            value="Where is your place located?"
                                            className="text-lg"
                                        />
                                        <Select
                                            id="countries"
                                            onChange={(e) => changeFormOption("country", e.target.value)}
                                            className="w-full"
                                        >
                                            {availableDestinations.map((destination) => (
                                                <option>{destination}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 lg:w-1/2 md:w-1/2 w-full">
                                        <Label
                                            htmlFor="type"
                                            value="What type of home is it?"
                                            className="text-lg"
                                        />
                                        <Select
                                            id="type"
                                            onChange={(e) => changeFormOption("type", e.target.value)}
                                            className="w-full"
                                        >
                                            {classOptions.map((option) => (
                                                <option>{option}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="flex flex-row gap-8 lg:w-1/2 md:w-1/2 w-2/3 items-center justify-center whitespace-nowrap mx-4">
                                        <div onClick={() => setShowCalendarComponent(true)} className="flex flex-col gap-4 text-center lg:px-14 md:px-14 px-8 py-4 border border-gray-600 cursor-pointer rounded-xl">
                                            <p className="font-medium">Check in</p>
                                            <hr className="border border-gray-600 w-full"/>
                                            <p className="font-light text-sm">{formOptions.startDate === null ? "No date set" : new Date(formOptions.startDate).toLocaleDateString('en-US')}</p>
                                        </div>
                                        <div onClick={() => setShowCalendarComponent(true)} className="flex flex-col gap-4 flex flex-col gap-4 text-center lg:px-14 md:px-14 px-8 py-4 border border-gray-600 cursor-pointer rounded-xl">
                                            <p className="font-medium">Check out</p>
                                            <hr className="border border-gray-600 w-full"/>
                                            <p className="font-light text-sm">{formOptions.endDate === null ? "No date set" : new Date(formOptions.endDate).toLocaleDateString('en-US')}</p>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </CSSTransition>
                    ) : (formLevel === 4) ? (
                            <div className="flex flex-col gap-12 lg:mt-12 md:mt-12 mt-4 items-center justify-center fade-innerz">
                                <div className="flex flex-col justify-center gap-2 items-center whitespace-nowrap">
                                    <h1 className="font-medium lg:text-4xl md:text-4xl text-2xl text-center">Upload photos of your place</h1>
                                    <p className="text-xs">(Minimum 5 photos)</p>
                                </div>
                                <div>
                                    <div className="relative mt-6 rounded-tr-lg rounded-tl-lg border border-gray-300 shadow-lg p-3 bg-gray-700 text-white text-sm text-center">
                                        <input className="absolute opacity-0 inset-0 w-full h-full cursor-pointer" type="file" multiple accept=".png, .jpg, .jpeg, .webp" onChange={(e) => addPhoto(e.target.files[0])}/>
                                        <label>Upload photos</label>
                                    </div>
                                    <div className="flex flex-col gap-8 h-350 w-350 rounded-bl-lg rounded-br-lg border border-gray-300 shadow-xl bg-slate-50 p-3 text-center">
                                        {formOptions.photos.length > 0 ? (
                                            <div className="grid grid-cols-3 grid-flow-row auto-rows-max gap-2 fade-innerz mt-4 overflow-y-auto">
                                                {formOptions.photos.map((photo) => (
                                                    <div className="flex flex-col -translate-y-6">
                                                        <HiX onClick={() => removePhoto(photo)} className="rounded-full bg-gray-200 shadow-xl p-1 hover:bg-gray-300 ease-in-out h-5 w-5 duration-200 text-black translate-y-6 translate-x-0.5 z-10 cursor-pointer fade-innerz"/>
                                                        <img src={photo} className="fade-innerz w-102 h-74 object-cover" alt="photo"/>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="w-full flex flex-col gap-20 items-center">
                                                <p className="text-xl font-semibold "></p>
                                                <div className="items-center w-full flex flex-col gap-2">
                                                    <p className="text-xl font-semibold ">Add photos here!</p>
                                                    <HiOutlinePhotograph className="w-69 h-69"/>
                                                </div>
                                            </div>    
                                        )}
                                    </div>
                                </div>
                            </div>
                    ) : (
                        <CSSTransition>
                            <div className="flex flex-col gap-12 items-center justify-center text-center lg:mt-20 md:mt-20 mt-10 fade-innerz p-12">
                                <h1 className="lg:text-4xl md:text-4xl text-3xl font-bold">Congratulations! 🥳</h1>
                                <p className="text-center lg:text-xl md:text-xl text-lg font-medium lg:w-1/2 md:w-full w-full">
                                Congratulations on creating your new Airbnb listing! Your home is now ready to welcome guests from around the world. Wishing you a fantastic journey as a host and may your space become a welcoming haven for travelers to make unforgettable memories.
                                </p>
                            </div>
                        </CSSTransition>
                    )}
                </form>
            </div>
            {formLevel < 5 ? (
                <Footer className="w-full fixed bottom-0 left-0 bg-gray-100">
                    <div className="flex justify-between w-full lg:px-14 lg:py-8 md:px-14 md:py-8 px-10 py-4">
                        <button onClick={() => changeFormLevel(formLevel - 1)} className={`underline font-medium rounded-xl px-4 py-2 ${formLevel === 1 ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-black"}`}>Back</button>
                        <button onClick={() => filledInInformation(formLevel)} className={`text-white font-medium rounded-xl lg:px-10 lg:py-4 md:px-10 md:py-4 px-8 py-4 cursor-pointer bg-gray-900 hover:bg-black ease-in-out duration-200`}>{formLevel < 4 ? "Next" : "Create your listing"}</button>
                    </div>
                </Footer>
            ) : (
                <Footer className="w-full fixed bottom-0 left-0 bg-gray-100">
                    <div className="flex justify-between w-full lg:px-14 lg:py-8 md:px-14 md:py-8 px-10 py-4">
                        <button onClick={() => resetNavbar()} className={`text-white font-medium rounded-xl lg:px-10 lg:py-4 md:px-10 md:py-4 px-8 py-4 cursor-pointer bg-gray-900 hover:bg-black ease-in-out duration-200`}>Close</button>
                    </div>
                </Footer>
            )}
            
            {showCalendarComponent === true && (
                <CalendarAirbnbYourHome changeFormOption={changeFormOption} setShowCalendarComponent={setShowCalendarComponent}/>
            )}
        </div>
    )
}