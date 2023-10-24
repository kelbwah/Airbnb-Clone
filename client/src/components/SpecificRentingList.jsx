import { useState, useEffect } from "react";
import { Button, Spinner } from "flowbite-react";
import CalendarRentingComponent from './CalendarRentingComponent.jsx';
import axios from "axios";


export default function SpecificRentingList(props){

    
    const userId = props.userId;
    const rentingListId = props.rentingListId;
    const [rentingInfo, setRentingListInformation] = useState(props.rentingListInformation);
    const [user, setUser] = useState(null);
    const [host, setHost] = useState(null);
    const [numGuests, setNumGuests] = useState(1);
    const [checkIn, setCheckIn] = useState(new Date(rentingInfo.startDate).toLocaleDateString('en-US'));
    const [checkOut, setCheckOut] = useState(new Date(rentingInfo.endDate).toLocaleDateString('en-US'));
    const [totalBeforeTaxes, setTotalBeforeTaxes] = useState(rentingInfo.priceBeforeTax);
    const [showCalendarRentingComponent, setShowCalendarRentingComponent] = useState(false);
    const [onMountLoading, setOnMountLoading] = useState(true);
    const [loading, setIsLoading] = useState(false);
    const [isAlreadyReserved, setIsAlreadyReserved] = useState(null);
    const [isAlreadyInWishlist, setIsAlreadyInWishlist] = useState(null);

    async function cancelReservation() {
        try{
            const data = axios.put(`cancelreservation/${rentingListId}/${userId}`);
            console.log(data);
            if (data) {
                props.setCompletedReservation([true, 'Reservation successfully cancelled']);
                setTimeout(() => {}, 5000);
                window.location.reload();
            } else {
                props.setIsError([true, 'Error cancelling reservation, try again later']);
            }
        } catch (err) {
            props.setIsError([true, 'Error cancelling reservation, try again later.']);
        }
    }

    async function addReserver(e, canOrNotReserve){
        e.preventDefault();

        if (canOrNotReserve === 'Can reserve') {
            try{
                setIsLoading(true);
                if (!isAlreadyReserved && rentingInfo && rentingInfo.renter === null) {
                    const response = await axios.put(`/reserve/${rentingInfo._id}/${user._id}`, {checkIn: checkIn, checkOut: checkOut, numGuests: numGuests}); 
                    if (response) {
                        props.setCompletedReservation([true, 'Reservation successfully made']);
                    } else {
                        props.setIsError([true, 'Error making reservation, try again later.']);
                    }
                } else if (isAlreadyReserved && rentingInfo && rentingInfo.renter.renterId === userId){
                    props.setCompletedReservation([false, 'You have already made the reservation!']);
                } else if (rentingInfo && rentingInfo.renter.renterId !== userId) {
                    props.setCompletedReservation([false, 'Reservation already made by another renter!']);
                }

                setIsLoading(false);
                
            } catch(err){
                console.log(err.response.data);
                setIsLoading(false);
                props.setIsError([true, err.response.data]);
            }
        } else {
            props.setCompletedReservation([false, 'You cannot reserve your own listing!']);
        }

        
    }  

    async function addOrRemoveToWishlist(){
        try{
            const response = await axios.put(`/wishlist/addOrRemove/${user._id}/${rentingInfo._id}`, []);
            props.setRemovedOrAddedFromWishlist([true, response.data]);
            if (response.data === "Successfully removed listing from wishlist") {
                setIsAlreadyInWishlist(false);
            } else {
                setIsAlreadyInWishlist(true);
            }
            
        } catch(err){
            console.log(err.response.data);
            props.setIsError([true, err.response.data]);
        }
    }


    async function getHostInfo(){
        try{
            setOnMountLoading(true);
            const foundHost = await axios.get(`/user/${rentingInfo.host}`);
            setHost(foundHost.data);
            setOnMountLoading(false);
        } catch (err) {
            setOnMountLoading(false);
            props.setIsError(true);
            throw err;
        }
        
    }

    async function getUserInformation(){
        try{
            setOnMountLoading(true);
            const userInfo = await axios.get(`/user/${userId}`, []);
            setUser(userInfo.data);
            setIsAlreadyInWishlist(userInfo.data.likedListings.length > 0 && userInfo.data.likedListings.includes(rentingInfo._id) ? true : false);
            setIsAlreadyReserved((rentingInfo.renter !== null && rentingInfo.renter.renterId === userInfo.data._id) ? true : false);
            setOnMountLoading(false);
        } catch (err) { 
            setOnMountLoading(false);
            props.setIsError(true);
            throw err;
        }
    }

    async function getRentingListInformation(){
        try{
            setOnMountLoading(true);
            const rentinglistinfo = await axios.get(`/rentinglist/${rentingListId}`, []);
            setRentingListInformation(rentinglistinfo.data);
            setOnMountLoading(false);
        } catch (err){
            setOnMountLoading(false);
            props.setIsError(true);
            throw err;
        }
        
    }

    const CenteredDot = () => {
        return (
          <div className="flex justify-center items-center">
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        );
    };
      
    function addOrSubtractGuests(e, addOrSubtract){
        e.preventDefault();
        if (addOrSubtract === 'subtract' && numGuests > 1){
            setNumGuests((prev) => (prev - 1));
        } else if (addOrSubtract === 'add' && numGuests < rentingInfo.numGuests){
            setNumGuests((prev) => (prev + 1));
        }
    }
    
    useEffect(() => {
        const getInfo = async () => {
            await getHostInfo();
        } 

        const retrieveUser = async () => {
            await getUserInformation();
        }

        const retrieveRentingListInfo = async () => {
            await getRentingListInformation();
        }

        retrieveUser();
        retrieveRentingListInfo();
        getInfo();

    }, []);

    return (
        <div className="xl:w-1000 lg:w-850 md:w-full w-full md:px-6 lg:translate-y-28 md:translate-y-28 translate-y-6 flex flex-col justify-center">
            {(host && onMountLoading === false) && (
                <div>
                    {/* -- Return and Save button (small screens only) -- */}
                    <div className="w-screen lg:hidden md:hidden flex justify-between mx-auto px-8">
                            <button onClick={props.resetNavbar} className="hover:bg-gray-100 rounded-full p-3 lg:hidden md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </button>
                            <span onClick={() => (host._id !== userId) ? addOrRemoveToWishlist() : props.setRemovedOrAddedFromWishlist([false, 'Cannot add own listing to your wishlists!'])} className="flex items-center text-center text-sm gap-1.5 p-3 rounded-xl hover:bg-gray-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill={isAlreadyInWishlist ? "red" : "none"} stroke={isAlreadyInWishlist ? "red" : "currentColor"} viewBox="0 0 24 24" strokeWidth={1.5} className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p className="font-medium"><u>Save</u></p>
                            </span>
                    </div>

                    {/* -- Mobile screen break line -- */}
                    <hr className="lg:hidden md:hidden w-maxborder-gray-400 mx-2 mt-6 mb-10"/>

                    {/* -- Mobile screen photo section -- */ }
                    <div onClick={() => props.setIsSeeAllPhotos(true)} className="lg:hidden md:hidden grid w-screen px-8 mx-auto cursor-pointer">
                        <img className="hover:opacity-80 ease-in-out duration-200 cursor-pointer" src={rentingInfo.photos[0]}/>
                        <p className="text-xs px-0.5 py-2 bg-slate-50 rounded-lg border-black border whitespace-nowrap w-32 text-center -translate-y-12 -translate-x-2 place-self-end">See all photos</p>
                    </div>

                    

                    {/* -- Title and Save button (large and medium screens only) -- */}
                    <div className="lg:flex md:flex hidden justify-between items-center mt-2">
                        <div className="flex flex-col justify-start">
                            <p className="lg:text-3xl md:text-3xl lg:translate-y-0 md:translate-y-0 text-xl translate-y-2 font-semibold">{rentingInfo.title} </p>
                            <p>{isAlreadyReserved ? <span className="text-sm font-light underline text-center">Already reserved for {rentingInfo.renter.checkIn} - {rentingInfo.renter.checkOut}</span> : ""}</p>
                        </div>
                        <div className="flex">
                            <span onClick={() => (host._id !== userId) ? addOrRemoveToWishlist() : props.setRemovedOrAddedFromWishlist([false, 'Cannot add own listing to your wishlists!'])} className="flex items-center text-center text-sm gap-1.5 px-2.5 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={isAlreadyInWishlist ? "red" : "none"}
                                stroke={isAlreadyInWishlist ? "red" : "currentColor"}
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                
                                className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                    />
                                </svg>
                                <p className="font-medium"><u>Save</u></p>
                            </span>

                            {isAlreadyReserved && (
                                <span onClick={() => cancelReservation()} className="flex items-center text-center text-sm gap-1.5 px-2.5 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <p className="font-medium"><u>Cancel Reservation</u></p>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* -- Photo grid layout for non-mobile screens -- */}
                    <div className="w-full h-2/3 lg:grid md:grid hidden grid-rows-2 grid-cols-4 gap-2 mt-4 lg:px-0 md:px-0 px-4">
                        {rentingInfo.photos.map((photo, index) => {
                            if (index <= 4) {
                                return(
                                    <div className={`
                                        ${index === 0 ? "h-full w-full row-start-1 row-span-full col-span-2 hover:opacity-75 ease-in-out duration-200" : ""}
                                        ${index === 1 ? "h-full w-full row-start-1 col-start-3 row-span-1 col-span-1 hover:opacity-75 ease-in-out duration-200" : ""}
                                        ${index === 2 ? "h-full row-start-2 row-span-1 col-span-1 hover:opacity-75 ease-in-out duration-200" : ""}
                                        ${index === 3 ? "h-full row-start-1 row-span-1 col-span-1 hover:opacity-75 ease-in-out duration-200" : ""}
                                        ${index === 4 ? "h-full row-start-2 row-span-1 col-span-1 hover:opacity-75 ease-in-out duration-200" : ""}
                                    `}>
                                        <img onClick={() => props.setIsSeeAllPhotos(true)} className={`
                                            ${index === 0 ? "h-full w-full rounded-l-xl object-cover cursor-pointer" : ""}
                                            ${(index === 1 || index === 2) ? "h-full w-full object-cover cursor-pointer" : ""}
                                            ${index === 3 ? "h-full w-full rounded-tr-xl object-cover cursor-pointer" : ""}
                                            ${index === 4 ? "h-full w-full rounded-br-xl object-cover cursor-pointer" : ""}
                                        `} 
                                        src={photo}/>
                                    </div> 
                                )
                            }
                            
                        })} 
                    </div>

                    {/* -- Description and Reservation Data -- */ }
                    <div className="flex lg:flex-row md:flex-row lg:justify-between md:justify-between flex-col z-50 mt-10 lg:p-0 md:p-0 px-14">
                        <div className="flex flex-col gap-1">
                            {isAlreadyReserved ? <span className="lg:hidden md:hidden text-sm font-base underline">Already reserved for {rentingInfo.renter.checkIn} - {rentingInfo.renter.checkOut}</span> : ""}
                            <p className="lg:text-2xl md:text-2xl text-xl font-medium whitespace-nowrap">{rentingInfo.description}</p>
                            <div className="flex gap-2 font-light lg:text-normal md:text-normal text-xs whitespace-nowrap">
                                <p>{rentingInfo.numGuests} guest(s)</p>
                                <ul className="flex text-black gap-2">
                                    <CenteredDot/>
                                    <li>{rentingInfo.numBedrooms} bedroom(s)</li>
                                    <CenteredDot/>
                                    <li>{rentingInfo.numBeds} bed(s)</li>
                                    <CenteredDot/>
                                    <li>{rentingInfo.numBaths} bath(s)</li>
                                </ul>
                            </div>
                            <div className="flex gap-2 font-light">
                                <p className="font-semibold">★ {rentingInfo.stars}</p>
                                <CenteredDot/>
                                <p className="font-medium"><u>{rentingInfo.reviews.length} reviews</u></p>
                            </div> 
                            <hr className="my-3"/>
                            <div className="flex gap-4 items-center">
                                <img className="w-12 h-12 rounded-full" src={host.picturePath}/>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium text-normal">Hosted by {host.firstName}</p>
                                    <p className="text-sm text-gray-500 font-light">Superhost | 6 years hosting</p>
                                </div>
                            </div>
                            <hr className="my-3"/>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-6 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                    </svg>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-normalm font-medium">Dedicated workspace</p>
                                        <p className="font-light text-sm">A common area with wifi that's well-suited for working</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="w-5 h-5"><path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path></svg>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-normal font-medium">Self Check-in</p>
                                        <p className="font-light text-sm">Check yourself in with the keypad.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '24px', width: '24px', fill: 'currentcolor'}}><path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"></path></svg>
                                     <p className="text-normal font-medium">Free cancellation before your check-in date.</p>           
                                </div>
                            </div>
                            <hr className="my-3"/>
                        </div>

                        <form onSubmit={(e) => (host._id !== userId) ? addReserver(e, 'Can reserve') : addReserver(e, 'Cannot reserve')} className="lg:w-2/5 md:w-2/5 w-full flex flex-col justify-center gap-4 shadow-2xl border border-gray-300 rounded-xl pt-4 pb-8 lg:mt-0 md:mt-0 mt-8 mb-14 px-8">
                            <p className="text-lg py-4 justify-start font-light"><span className="text-2xl font-medium">${rentingInfo.priceBeforeTax}</span> night</p>
                            <div className="flex flex-col">
                                <div className="flex cursor-pointer" onClick={() => setShowCalendarRentingComponent((prev) => (!prev))}>
                                    <div className="w-1/2 flex flex-col gap-1 justify-between pt-3 pb-3 px-5 rounded-tl-xl border border-black">
                                        <p className="font-base text-xs">CHECK-IN</p>
                                        <p className="font-light text-sm">{checkIn}</p>
                                    </div>
                                    <div className="w-1/2 flex flex-col gap-1 justify-between pt-3 pb-3 px-5 rounded-tr-xl border border-black">
                                        <p className="font-base text-xs">CHECKOUT</p>
                                        <p className="font-light text-sm">{checkOut}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 justify-between py-3 px-5 rounded-bl-xl rounded-br-xl border border-black">
                                    <p className="font-base text-xs">GUESTS</p>
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-light text-sm">{numGuests} guest(s)</p>
                                        <div className="flex gap-2">
                                            <button onClick={(e) => addOrSubtractGuests(e, 'subtract')} value="subtract" className="border border-gray-400 rounded-full text-sm p-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                </svg>
                                            </button>
                                            <button onClick={(e) => addOrSubtractGuests(e, 'add')}  className="border border-gray-400 rounded-full text-sm p-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <Button type="submit" className="ease-in-out duration-200 p-2 bg-gradient-to-r from-red-500 to-pink-600 active:from-orange-400 active:to-red-700 rounded-xl px-8">
                                {loading === false ? (
                                    <p className="text-base">Reserve</p>
                                ) : (
                                    <Spinner/>
                                )}
                            </Button>

                            <p className="text-center text-sm font-light">You won't be charged yet</p>
                            <hr className="my-3"/>
                            <div className="flex justify-between text-lg font-medium pb-4">
                                <p>Total before taxes</p>
                                <p>${totalBeforeTaxes}</p>
                            </div>
                        </form>       

                        {/* -- Reservation Calendar Component -- */ }
                        {(showCalendarRentingComponent === true) && (
                            <CalendarRentingComponent 
                            setShowCalendarRentingComponent={setShowCalendarRentingComponent} 
                            setCheckIn={setCheckIn} 
                            setCheckOut={setCheckOut} 
                            checkIn={new Date(rentingInfo.startDate)} 
                            checkOut={new Date(rentingInfo.endDate)}
                            setTotalBeforeTaxes={setTotalBeforeTaxes}
                            rentingPrice={rentingInfo.priceBeforeTax}
                            />
                        )} 
                    </div>

                </div>
            )}

            {onMountLoading === true && (
                <div className="flex gap-2 justify-center text-center bg-white">
                    <p className="text-4xl font-bold">Page Loading...</p>
                    <Spinner/>
                </div>
                
            )}                

        </div>
    )
}


