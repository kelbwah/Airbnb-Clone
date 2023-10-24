import { useState } from 'react';
import { DateRange } from 'react-date-range'
import { Button } from 'flowbite-react';
import 'react-date-range/dist/styles.css'; // main css file for react-date-range
import 'react-date-range/dist/theme/default.css'; // theme css file for react-date-range
import { differenceInCalendarDays, parse } from "date-fns";

export default function CalendarAirbnbYourHome(props){
    const [ranges, setRanges] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const currentDate = new Date();
    const minimumDate = new Date(currentDate);
    minimumDate.setDate(currentDate.getDate() + 1)

    function changeRange(item){

        setRanges([item.selection]);

        setStartDate(item.selection.startDate.toLocaleDateString('en-US'));
        setEndDate(item.selection.endDate.toLocaleDateString('en-US'));

    }

    function submitDates(){
        const currentDate = new Date();

        const tempStartDate = new Date(startDate);
        const tempEndDate = new Date(endDate);

        if (tempStartDate > currentDate && tempEndDate > currentDate){
            const parts = startDate.split('/');
            const month = parseInt(parts[0]) - 1; // Months are zero-based
            const day = parseInt(parts[1]);
            const year = parseInt(parts[2]);
            const newStartDate = new Date(year, month, day).toISOString();
    
            const parts_2 = endDate.split('/');
            const month_2= parseInt(parts_2[0]) - 1; // Months are zero-based
            const day_2 = parseInt(parts_2[1]);
            const year_2 = parseInt(parts_2[2]);
            const newEndDate = new Date(year_2, month_2, day_2).toISOString();
            
            props.changeFormOption("startDate", newStartDate);
            props.changeFormOption("endDate", newEndDate);
            props.setShowCalendarComponent(false);
        }
        
    }

    return (
        <div className="animate-move-and-fade mb-14 fixed inset-x-0 mx-auto lg:translate-y-52 md:translate-y-52 lg:bottom-0 md:bottom-0 xl:bottom-12 bottom-28 px-4 w-full justify-center items-center text-center flex flex-col lg:w-96 md:w-96 w-83 bg-white border border-gray-300 rounded-xl shadow-2xl z-30 ">
            <DateRange
            date={new Date()}
            showDateDisplay={false}
            minDate={minimumDate}
            maxDate={props.checkOut}
            onChange={item => changeRange(item)}
            moveRangeOnFirstSelection={false}
            ranges={ranges}
            rangeColors={["#262626"]}
            className="lg:w-96 md:w-96 w-82 justify-center items-center rounded-xl"
            />
            <hr className="w-full border border-gray-300"/>
            <div className="flex grow w-full justify-center p-2">
                <div>
                    <Button onClick={() => submitDates()} value="weeks" className="mt-2 mb-2 ease-in-out duration-200 px-2 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl"><p className="text-base">Confirm</p></Button>
                </div>
            </div>
        </div>
        
    )
}