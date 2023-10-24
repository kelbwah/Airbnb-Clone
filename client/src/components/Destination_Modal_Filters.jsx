import { Label, TextInput, Button } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file for react-date-range
import 'react-date-range/dist/theme/default.css'; // theme css file for react-date-range

function Calendar(props) {
    
    const [ranges, setRanges] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    function changeRange(item){
        setRanges([item.selection]);
        
        setStartDate(item.selection.startDate.toDateString().substring(4, 15));
        setEndDate(item.selection.endDate.toDateString().substring(4, 15));

        const startDate = item.selection.startDate.toDateString().substring(4, 15);
        const endDate = item.selection.endDate.toDateString().substring(4, 15);
        if (startDate === endDate) {
            props.submitWeeks("Any week");
        } else {
            props.submitWeeks([startDate, endDate]);
        }
        
    }

    return (
        <div className="lg:w-full md:w-full lg:p-2 md:p-2 w-full justify-center items-center text-center flex flex-col rounded-full">
            {props.selectedWeeks !== "Any week" ? (
                <p className="font-medium text-sm mb-3 mt-8">{props.selectedWeeks[0]} - {props.selectedWeeks[1]}</p>
            ) : (
                <p className="font-medium text-sm mb-3 mt-8">{props.selectedWeeks}</p>
            )}

            <hr className="border-1 border-gray-300 flex grow lg:w-1/2 md:w-1/2 w-2/3 justify-center mt-2 mb-5"/>

            <DateRange
            date={new Date()}
            showDateDisplay={false}
            minDate={new Date()}
            onChange={item => changeRange(item)}
            moveRangeOnFirstSelection={false}
            ranges={ranges}
            rangeColors={["#262626"]}
            className="lg:w-96 md:w-96 w-full justify-center items-center lg:border md:border lg:rounded-xl md:rounded-xl lg:shadow-lg md:shadow-lg"
            />
            <div className="flex grow w-full justify-end">
                <div onClick={() => startDate !== endDate ? props.submitAll([ranges[0].startDate.toDateString().substring(4, 15), ranges[0].endDate.toDateString().substring(4, 15)]) : props.submitAll("Any week")}>
                    <Button value="weeks" className="mt-8 ease-in-out duration-200 p-2 active:p-1 active:mr-1 active:mt-9 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl"><p className="text-base">Continue</p></Button>
                </div>
            </div>
        </div>
        
    )
}

export function ClosedDestinationFilter(props){
    return(
        <div onClick={() => props.changeOpenFilter("destination")} className="w-full lg:w-196 flex justify-between gap-10 mt-6 bg-white rounded-2xl shadow-md px-4 py-6 mx-auto cursor-pointer">
            <p className="font-base text-sm text-gray-500">Where</p>
            <p className="text-sm">{props.selectedDestination}</p>
        </div>
    )
}

export function ClosedWeeksFilter(props){

    return(
        <div onClick={() => props.changeOpenFilter("weeks")} className={`w-full lg:w-196 flex justify-between gap-10 mt-4 bg-white rounded-2xl shadow-md px-4 py-6 mx-auto cursor-pointer mx-auto ${props.shouldAnimate ? "animate-move-and-fade-destination-modal-third" : ""}`}>
            <p className="font-base text-sm text-gray-500">When</p>
            {props.selectedWeeks !== "Any week" ? (
                <p className="text-sm">{props.selectedWeeks[0]} - {props.selectedWeeks[1]}</p>
            ) : (
                <p className="text-sm">{props.selectedWeeks}</p>
            )}
            
        </div>
    )
}

export function ClosedGuestsFilter(props){

    return(
        <div onClick={() => props.changeOpenFilter("guests")} className={`w-full lg:w-196 flex justify-between gap-10 mt-4 bg-white rounded-2xl shadow-md px-4 py-6 mx-auto cursor-pointer mx-auto ${props.shouldAnimate ? "animate-move-and-fade-destination-modal-fourth" : ""}`}>
            <p className="font-base text-sm text-gray-500">Who</p>
            <p className="text-sm">{`${props.selectedGuests} ${props.selectedGuests === 1 ? "guest" : "guests"}`}</p>
        </div>
    )
}

export function DestinationFilter(props) {

    return (
        <div className={`w-full lg:w-196 flex flex-col justify-center gap-10 mt-10 bg-white rounded-2xl shadow-md p-4 mx-auto ${props.shouldAnimate ? 'animate-move-and-fade-destination-modal-second' : ''}`}>
            <div className="p-4">
                <p className="font-bold text-2xl mb-4">Where to?</p>
                <div className="-translate-y-5">
                    <div className="w-full">
                        <HiSearch className="text-xl translate-y-11 translate-x-4 z-50"/>
                        <input onChange={props.changeSearchInputDestination} placeholder="Search destinations" type="text" id="large-input" className="px-12 mb-6 block w-full py-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl sm:text-md focus:ring-black focus:border-black"/>
                    </div> 
                    <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar gap-6">
                        {props.availableDestinationsWithIconsFiltered.map((destination) => (
                            <div 
                            className="flex flex-col"
                            key={destination[0]}
                            >
                                <button 
                                className={destination[0] === props.selectedDestination ? "hover:border-black w-32 border border-black rounded-xl ease-in-out duration-200" : "hover:border-black w-32 border border-gray-300 rounded-xl ease-in-out duration-200"}
                                onClick={props.changeSelectedDestination}
                                >
                                    <img 
                                    src={destination[1]} 
                                    className="rounded-xl"
                                    value={destination[0]}
                                    ></img>
                                </button> 
                                <p className="text-sm font-light">{destination[0]}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex grow justify-end">
                        <div onClick={() => props.nextOpenFilter("destination")}>
                            <Button value="destination" className="mt-8 ease-in-out duration-200 p-2 active:p-1 active:mr-1 active:mt-9 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl"><p className="text-base">Continue</p></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function WeeksFilter(props) {


    function submitAll(range){
        props.changeSelectedWeeks(range);
        props.nextOpenFilter("weeks");
    }

    function submitWeeks(range){
        props.changeSelectedWeeks(range);
    }

    return(
        <div className="w-full lg:w-196 flex flex-col justify-center gap-10 mt-4 bg-white rounded-2xl shadow-md p-4 mx-auto">
            <div className="p-4">
                <p className="font-bold text-2xl mb-4 justify-start">When's your trip?</p>
                <Calendar
                    submitAll={submitAll}
                    selectedWeeks={props.selectedWeeks}
                    submitWeeks={submitWeeks}
                />
            </div>
        </div>
    )
}

export function GuestsFilter(props) {

    const guestsOptions = [["Adults", "Ages 13 or above"], ["Children", "Ages 2-12"]];
    const [currAdults, setCurrAdults] = useState(props.selectedAdults);
    const [currChildren, setCurrChildren] = useState(props.selectedChildren);
    const [currGuests, setCurrGuests] = useState(props.selectedGuests);

    function changeGuests(adultOrChildren, operation){
        
        if (adultOrChildren === "Adults" && operation === "add") {
            setCurrAdults(currAdults+1);
            props.changeSelectedAdults(currAdults + 1);

            setCurrGuests(currGuests + 1);
            props.changeSelectedGuests(currGuests + 1);
        } else if (adultOrChildren === "Adults" && operation === "subtract" && ((currAdults - 1) >= 0)) {
            setCurrAdults(currAdults-1);
            props.changeSelectedAdults(currAdults - 1);

            setCurrGuests(currGuests - 1);
            props.changeSelectedGuests(currGuests - 1);
        } else if (adultOrChildren === "Children" && operation === "add") {
            setCurrChildren(currChildren+1);
            props.changeSelectedChildren(currChildren + 1);

            setCurrGuests(currGuests + 1);
            props.changeSelectedGuests(currGuests + 1);
        } else if (adultOrChildren === "Children" && operation === "subtract" && ((currChildren - 1) >= 0)) {
            setCurrChildren(currChildren-1);
            props.changeSelectedChildren(currChildren - 1);

            setCurrGuests(currGuests - 1);
            props.changeSelectedGuests(currGuests - 1);
        }

    }

    return(
        <div className="w-full lg:w-196 flex flex-col justify-center gap-10 mt-4 bg-white rounded-2xl shadow-md p-4 mx-auto">
            <div className="p-4">
                <p className="font-bold text-2xl mb-8 justify-start">Who's coming?</p>
                {guestsOptions.map((option) => (
                    <div key={[option[0]]}>
                        <div className={`flex grow w-full justify-between items-center ${option[0] === "Children" ? "mb-2" : ""}`}>
                            <div className="flex flex-col whitespace-nowrap">
                                <p className="text-xl font-semibold">{option[0]}</p>
                                <p className="text-sm font-light text-gray-400">{option[1]}</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <button onClick={() => changeGuests(option[0], "subtract")} className="border border-gray-400 rounded-full text-sm p-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </button>
                                <p>{option[0] === "Adults" ? props.selectedAdults : props.selectedChildren}</p>
                                <button onClick={() => changeGuests(option[0], "add")} className="border border-gray-400 rounded-full text-sm p-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {option[0] === "Adults" && (
                            <hr className="border my-8"/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function DestinationFooter(props){

    return(
        <div className="fixed bottom-0 left-0 w-full h-auto flex flex-grow justify-between justify-center items-center bg-white z-50 p-6 animate-move-and-fade-destination-modal-fifth">
            <p className="font-medium cursor-pointer" onClick={props.clearAll}><u>Clear all</u></p>
            <Button value="destination" className="ease-in-out duration-200 py-1 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl" >
                <span onClick={props.changeDestinationModal} className="flex flex-row gap-2 items-center">
                    <HiSearch className="text-xl z-50 text-white"/>
                    <p className="text-base">Search</p>
                </span>
            </Button>
        </div>
    )
}
