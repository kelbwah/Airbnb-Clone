import { useState, useEffect } from "react";
import worldIcons from "../assets/Icons/world_map_icons";
import { DestinationFilter, WeeksFilter, GuestsFilter, ClosedDestinationFilter, ClosedWeeksFilter, ClosedGuestsFilter, DestinationFooter } from "./Destination_Modal_Filters";

export default function Destination_Modal(props){

    const [isDestinationOpen, setIsDestinationOpen] = useState(true);
    const [isWeeksOpen, setIsWeeksOpen] = useState(false);
    const [isNumGuestsOpen, setIsNumGuestsOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(props.country);
    const [selectedWeeks, setSelectedWeeks] = useState(props.weeks);
    const [selectedGuests, setSelectedGuests] = useState(props.guests);
    const [selectedAdults, setSelectedAdults] = useState(props.numAdults);
    const [selectedChildren, setSelectedChildren] = useState(props.numChildren);
    const [searchInputDestination, setSearchInputDestination] = useState("");

    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        setShouldAnimate(false);
        }, 1000);
    }, []);

    function clearAll(){
        props.setCountry('Anywhere');
        props.setWeeks('Any week');
        props.setNumAdults(0);
        props.setNumChildren(0);
        props.setGuests(0);
        setSelectedDestination('Anywhere');
        setSelectedWeeks('Any week');
        setSelectedGuests(0);
        setSelectedChildren(0);
        setSelectedAdults(0);
    }

    function nextOpenFilter(filter){
        if (filter === "destination") {
            setIsDestinationOpen(!isDestinationOpen);
            setIsWeeksOpen(true);
        } else if (filter === "weeks") {
            setIsWeeksOpen(!isWeeksOpen);
            setIsNumGuestsOpen(true);
        } else if (filter === "guests") {
            setIsNumGuestsOpen(!isNumGuestsOpen);
        }
    }

    function changeOpenFilter(filter){
        if (filter === "destination") {
            setIsDestinationOpen(!isDestinationOpen);
            setIsWeeksOpen(false);
            setIsNumGuestsOpen(false);
        } else if (filter === "weeks") {
            setIsDestinationOpen(false);
            setIsWeeksOpen(!isWeeksOpen);
            setIsNumGuestsOpen(false);
        } else if (filter === "guests") {
            setIsDestinationOpen(false);
            setIsWeeksOpen(false);
            setIsNumGuestsOpen(!isNumGuestsOpen);
        }
    }

    function changeSearchInputDestination(e){
        setSearchInputDestination(e.target.value);
    }

    function changeSelectedDestination(e) {
        props.setCountry(e.target.getAttribute("value"));
        setSelectedDestination(e.target.getAttribute("value"));
    }

    function changeSelectedWeeks(range){
        props.setWeeks(range);
        setSelectedWeeks(range);
    }

    function changeSelectedGuests(numGuests){
        props.setGuests(numGuests);
        setSelectedGuests(numGuests);
    }

    function changeSelectedAdults(numAdults){
        props.setNumAdults(numAdults);
        setSelectedAdults(numAdults);

    }

    function changeSelectedChildren(numChildren){
        props.setNumChildren(numChildren);
        setSelectedChildren(numChildren);

    }

    function changeOpenModal(){
        props.changeDestinationModal();
    }

    const availableDestinations = [
        "Anywhere", "Europe", "Italy", "Southeast Asia",
        "Mexico", "South America", "Canada", "Caribbean", "United Kingdom",
    ]; 

    const availableDestinationsWithIcons = [];

    for (let i = 0; i < worldIcons.length; i++){
        availableDestinationsWithIcons.push([availableDestinations[i], worldIcons[i]]);
    };

    const availableDestinationsWithIconsFiltered = availableDestinationsWithIcons.filter((destination) => destination[0].includes(searchInputDestination));

    return (
        <div className="relative inset-0 items-center justify-center content-center z-50 bg-gray-100 bg-opacity-100 h-screen w-screen p-5">
            <div className="flex bg-gray-100 justify-between mt-2 animate-move-and-fade-destination-modal-first">
                <button 
                className="h-8 border border-gray-400 p-1 rounded-full bg-white cursor-pointer ease-in-out duration-200"
                onClick={changeOpenModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex gap-6 mr-6">
                    <div>
                        <p className="mb-1 font-medium text-md whitespace-nowrap cursor-default">Stays</p>
                        <hr className="border border-black"/>
                    </div>
                    
                    <p className="text-gray-400 font-medium text-md whitespace-nowrap cursor-pointer">Experiences</p>
                </div>
                <p>&nbsp;</p>
            </div>
            {(isDestinationOpen === true) ? (
                <div>
                    <DestinationFilter
                        changeSearchInputDestination={changeSearchInputDestination}
                        changeSelectedDestination={changeSelectedDestination}
                        availableDestinationsWithIconsFiltered = {availableDestinationsWithIconsFiltered}
                        nextOpenFilter={nextOpenFilter}
                        selectedDestination={selectedDestination}
                        shouldAnimate={shouldAnimate}
                    />
                    <ClosedWeeksFilter
                        selectedWeeks={selectedWeeks}
                        changeOpenFilter={changeOpenFilter}
                        shouldAnimate={shouldAnimate}
                    />
                    <ClosedGuestsFilter
                        selectedGuests={selectedGuests}
                        changeOpenFilter={changeOpenFilter}
                        shouldAnimate={shouldAnimate}
                    />
                </div>
            ) : (isWeeksOpen === true) ? (
                <div>
                    <ClosedDestinationFilter
                        selectedDestination={selectedDestination}
                        changeOpenFilter={changeOpenFilter}
                    />
                    <WeeksFilter
                        changeSelectedWeeks={changeSelectedWeeks}
                        selectedWeeks={selectedWeeks}
                        nextOpenFilter={nextOpenFilter}
                    />
                    <ClosedGuestsFilter
                        selectedGuests={selectedGuests}
                        changeOpenFilter={changeOpenFilter}
                    />
                </div>
            ) : (isNumGuestsOpen === true) ? (
                <div>
                    <ClosedDestinationFilter
                        selectedDestination={selectedDestination}
                        changeOpenFilter={changeOpenFilter}
                    />
                    <ClosedWeeksFilter
                        selectedWeeks={selectedWeeks}
                        changeOpenFilter={changeOpenFilter}
                    />
                    <GuestsFilter
                        selectedChildren={selectedChildren}
                        selectedAdults={selectedAdults}
                        selectedGuests={selectedGuests}
                        nextOpenFilter={nextOpenFilter}
                        changeSelectedGuests={changeSelectedGuests}
                        changeSelectedAdults={changeSelectedAdults}
                        changeSelectedChildren={changeSelectedChildren}
                    />
                </div>
            ) : (
                <div className="">
                    <ClosedDestinationFilter
                        selectedDestination={selectedDestination}
                        changeOpenFilter={changeOpenFilter}
                    />
                    <ClosedWeeksFilter
                        selectedWeeks={selectedWeeks}
                        changeOpenFilter={changeOpenFilter}
                    />
                    <ClosedGuestsFilter
                        selectedGuests={selectedGuests}
                        changeOpenFilter={changeOpenFilter}
                    />
                </div>
            )}
            <DestinationFooter
                clearAll={clearAll}
                changeDestinationModal={changeOpenModal}
            />
        </div>
    )
}