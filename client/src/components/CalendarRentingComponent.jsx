import { useState } from 'react';
import { DateRange } from 'react-date-range'
import { Button } from 'flowbite-react';
import 'react-date-range/dist/styles.css'; // main css file for react-date-range
import 'react-date-range/dist/theme/default.css'; // theme css file for react-date-range
import { differenceInCalendarDays, parse } from "date-fns";

export default function CalendarRentingComponent(props){
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

        setStartDate(item.selection.startDate.toLocaleDateString('en-US'));
        setEndDate(item.selection.endDate.toLocaleDateString('en-US'));

    }

    function submitDates(){
        const dateFormat = 'MM/dd/yyyy'
        const startDateUnformatted = parse(startDate, dateFormat, new Date());
        const endDateUnformatted = parse(endDate, dateFormat, new Date());
        const daysDifference = Math.abs(differenceInCalendarDays(startDateUnformatted, endDateUnformatted));
        console.log((daysDifference));
        const totalPriceBeforeTaxes = (daysDifference === 1 || daysDifference !== daysDifference || daysDifference === 0) ? props.rentingPrice : (daysDifference) * props.rentingPrice;

        props.setCheckIn(startDate);
        props.setCheckOut(endDate);
        props.setShowCalendarRentingComponent(false);
        props.setTotalBeforeTaxes(totalPriceBeforeTaxes);
    }

    return (
        <div className="animate-move-and-fade mb-14 fixed inset-x-0 mx-auto lg:translate-y-52 md:translate-y-52 lg:bottom-0 md:bottom-0 xl:bottom-12 bottom-28 px-4 w-full justify-center items-center text-center flex flex-col lg:w-96 md:w-96 w-83 bg-white border border-gray-300 rounded-xl shadow-2xl z-30 ">
            <DateRange
            date={new Date()}
            showDateDisplay={false}
            minDate={props.checkIn}
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