import React from "react";
import {useState, useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import Login_Modal from "../components/Login_Modal.jsx";
import Destination_Modal from "../components/Desination_Modal.jsx";
import SpecificRentingList from "../components/SpecificRentingList.jsx";
import SeeAllPhotos from "../components/SeeAllPhotos.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RentingScene(props){
    const rentingListId = useParams().id;
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isSeeAllPhotos, setIsSeeAllPhotos] = useState(false);
    
    const [completedReservation, setCompletedReservation] = useState(false);
    const [removedOrAddedFromWishlist, setRemovedOrAddedFromWishlist] = useState(false);
    const [rentingListInformation, setRentingListInformation] = useState(null);
    const [isError, setIsError] = useState([false, '']);

    async function getRentingListInformation(){
        try{
            const rentinglistinfo = await axios.get(`/rentinglist/${rentingListId}`, []);
            setRentingListInformation(rentinglistinfo.data);
        } catch (err){
            console.log(err);
        }
        
    }

    function showError(errorStatement){
        setIsError([true, errorStatement]);
    }

    function resetNavbar(){
        props.setIsNavbarOptions(true);
        props.setIsNavbarDestination(true);
        navigate('/');
    }

    props.setIsNavbarOptions(false);
    props.setIsNavbarDestination(true);
    useEffect(() => {
        const retrieveRentingListInfo = async () => {
            getRentingListInformation();
        }
        retrieveRentingListInfo();

    }, [])

    return(
        <div>
            {/* -- Modal to see all photos when a user clicks on a photo --  */}
            {(isSeeAllPhotos === true) ? (
                <div>
                    <SeeAllPhotos setIsSeeAllPhotos={setIsSeeAllPhotos} photos={rentingListInformation.photos}/>
                </div>
            ) : (
                <div>

                    {/* -- Toast for completion of reservation -- */}
                    {completedReservation[0] === true && (
                        <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {completedReservation[1]}
                            </div>
                            <Toast.Toggle onClick={() => setCompletedReservation(false)}/>
                        </Toast>
                    )}

                    {/* -- Toast for unsuccessful completion of reservation -- */}
                    {completedReservation[0] === false && (
                        <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {completedReservation[1]}
                            </div>
                            <Toast.Toggle onClick={() => setCompletedReservation(false)}/>
                        </Toast>
                    )}

                    {/* -- Toast for successful removal/addition to wishlist -- */}
                    {removedOrAddedFromWishlist[0] === true && (
                        <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {removedOrAddedFromWishlist[1]}
                            </div>
                            <Toast.Toggle onClick={() => setRemovedOrAddedFromWishlist(false)}/>
                        </Toast>
                    )}

                    {removedOrAddedFromWishlist[0] === false && (
                        <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {removedOrAddedFromWishlist[1]}
                            </div>
                            <Toast.Toggle onClick={() => setRemovedOrAddedFromWishlist(false)}/>
                        </Toast>
                    )}
                        



                    {/* -- Toast for error while making reservation -- */}
                    {isError[0] === true && (
                        <Toast className="fixed flex justify-between top-0 left-0 mx-auto z-40 animate-move-and-fade shadow-xl border border-gray-300">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {isError[1]}
                            </div>
                            <Toast.Toggle onClick={() => setIsError([false, ''])}/>
                            
                        </Toast>
                    )}

                    {(props.showLoginModal === true) ? (
                        <Login_Modal refreshPage={props.refreshPage} changeLoginModal={props.changeLoginModal}/>
                    ) : (props.showDestinationModal === true) ? (
                        <div>
                            <Destination_Modal 
                            changeDestinationModal={props.changeDestinationModal}
                            showDestinationModal={props.showDestinationModal}
                            numAdults={props.numAdults}
                            numChildren={props.numChildren}
                            guests={props.guests}
                            weeks={props.weeks}
                            country={props.country}
                            filters={props.filters}
                            setGuests={props.setGuests}
                            setWeeks={props.setWeeks}
                            setCountry={props.setCountry}
                            setFilters={props.setFilters}
                            setNumAdults={props.setNumAdults}
                            setNumChildren={props.setNumChildren}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    
                    {(rentingListInformation) && (
                        <div className={`w-full grid place-content-center ${props.showDestinationModal === true ? "hidden" : ""}`}>
                            <div className="lg:flex md:flex hidden place-content-center">
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
                            </div>
                            <SpecificRentingList
                                rentingListInformation={rentingListInformation}
                                rentingListId={rentingListId}
                                userId = {user._id}
                                setIsSeeAllPhotos={setIsSeeAllPhotos}
                                setCompletedReservation={setCompletedReservation}
                                setRemovedOrAddedFromWishlist={setRemovedOrAddedFromWishlist}
                                resetNavbar={resetNavbar}
                                setIsError={setIsError}
                                showError={showError}
                            />
                        </div>
                    )}
                </div>
            )}


            
        </div>
    )
}