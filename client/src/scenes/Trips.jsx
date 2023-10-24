import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Trips(props) {

    const userId = useParams().id; // just cause i know i could use the useSelector but i like useParams() :D

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [allTrips, setAllTrips] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    props.setIsNavbarOptions(false);
    props.setIsNavbarDestination(false);

    function resetNavbar(){
        props.setIsNavbarOptions(true);
        props.setIsNavbarDestination(true);
        navigate('/');
    }  


    async function getTrips(){
        try{
            setIsLoading(true);
            const updatedUser = await axios.get(`/user/${userId}`);
            if (updatedUser) {
                const allTripsIds = updatedUser.data.reservations;
                const allTripsInformation = [];

                for (let i = 0; i < allTripsIds.length; i++) {
                    let rentingInfo = await axios.get(`/rentinglist/${allTripsIds[i]}`);
                    let rentingHost = await axios.get(`/user/${rentingInfo.data.renter.renterId}`);
                    allTripsInformation.push([rentingInfo.data, rentingHost.data.firstName]);
                    
                }

                setAllTrips(allTripsInformation);

                setIsLoading(false);
            }

        } catch (err){
            setIsLoading(false);
            console.log(err);
        }
        
    }

    useEffect(() => {
        const retrieveNecessaryInformation = async () => {
            await getTrips();
        }

        retrieveNecessaryInformation();

    }, []);

    return (

            <div>
                {isLoading === false ? (
                    <div className="overflow-y-auto">
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
                        <div className="flex flex-col gap-8 w-screen h-full mt-20 lg:px-32 md:px-14 px-8 py-12 justify-center items-center overflow-y-auto">
                            
                            {allTrips.length > 0 ? (
                                <div className="flex flex-col overflow-y-auto px-20">
                                    <h1 className="lg:text-4xl md:text-4xl text-3xl font-semibold">{user.firstName}'s Trips</h1>
                                    <div className="flex flex-col gap-4 xl:w-1200 lg:w-900 md:w-700 w-310 justify-center pb-32 overflow-y-auto">
                                        <h2 className="lg:text-2xl md:text-xl text-xl font-medium mt-8 mb-2">Upcoming reservations</h2>
                                        <div className="flex flex-col gap-12 w-full h-full jusitfy-center items-center whitespace-nowrap">
                                            {allTrips.map((rentingList) => (
                                                <div onClick={() => navigate(`/rentingList/${rentingList[0]._id}`)} className="flex gap-14 lg:flex-row md:flex-row flex-col w-full h-1/2 shadow-xl border-2 border-gray-300 rounded-2xl cursor-pointer">
                                                    {/* -- Regular screen version for showing data -- */}
                                                    <div className="w-1/2 flex flex-col gap-2 px-8 pt-10 mb-6 lg:flex md:flex hidden">
                                                        <h2 className="lg:text-2xl md:text-2xl text-xl font-semibold">{rentingList[0].title}</h2>
                                                        <p className="text-sm font-light">Hosted by {rentingList[1]}</p>
                                                        <hr className="w-full my-2"/>
                                                        <div className="flex gap-6 items-center">
                                                            <div>
                                                                <p className="font-light text-normal">Check In: {new Date(rentingList[0].startDate).toLocaleDateString('en-US')}</p>
                                                                <p className="font-light text-normal">Check Out: {new Date(rentingList[0].endDate).toLocaleDateString('en-US')}</p>
                                                            </div>
                                                            <div className="h-full border-l border-gray-300 justify-center"></div>
                                                            <div>
                                                                <p className="font-normal text-normal">{rentingList[0].country}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img className="object-cover h-200 lg:w-1/2 md:w-1/2 w-full lg:rounded-tl-none md:rounded-tl-none lg:rounded-tr-xl md:rounded-tr-xl lg:rounded-br-xl md:rounded-br-xl rounded-tr-xl rounded-tl-xl" src={rentingList[0].photos[0]}/>
                                                    
                                                    {/* -- Mobile version for showing data -- */}
                                                    <div className="px-8 pb-8 w-full flex flex-col gap-2 lg:hidden md:hidden flex flex-col">
                                                        <h2 className="text-2xl font-semibold ">{rentingList[0].title}</h2>
                                                        <p className="text-sm font-light">Hosted by {rentingList[1]}</p>
                                                        <hr className="w-full my-2"/>
                                                        <div className="flex flex-col gap-6">
                                                            <p className="font-normal text-xl font-semibold">{rentingList[0].country}</p>
                                                            <p className="font-light text-xs">Check In: {new Date(rentingList[0].startDate).toLocaleDateString('en-US')}</p>
                                                            <p className="font-light text-xs">Check Out: {new Date(rentingList[0].endDate).toLocaleDateString('en-US')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> 
                                </div>
                            ) : (
                                <div className="fixed top-0 bottom-0 flex w-screen h-screen justify-center gap-2 items-center">
                                    <p className="text-3xl font-medium">You have no reservations, come back later!</p>
                                </div>
                            )}
                            
                            
                        </div>
                    </div>
                ) : (
                    <div className="flex w-screen h-screen justify-center gap-2 items-center">
                        <p className="text-3xl font-medium">Loading your reservations...</p>
                        <Spinner/>
                    </div>
                )}
                
            </div>
        
    )
}