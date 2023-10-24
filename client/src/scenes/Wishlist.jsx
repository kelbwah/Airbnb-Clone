import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toast } from "flowbite-react";
import {AiFillHeart} from "react-icons/ai";
import { HiX, HiCheck } from "react-icons/hi";


export default function Wishlist(props){

    const userId = useParams().id;

    const [allLikedListings, setAllLikedListings] = useState([]);
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [removedOrAddedFromWishlist, setRemovedOrAddedFromWishlist] = useState(false);
    const navigate = useNavigate();
    props.setIsNavbarOptions(false);
    props.setIsNavbarDestination(false);

    function resetNavbar(){
        props.setIsNavbarOptions(true);
        props.setIsNavbarDestination(true);
        navigate('/');
    }

    async function addOrRemoveToWishlist(rentingInfoId){
        try{
            const response = await axios.put(`/wishlist/addOrRemove/${user._id}/${rentingInfoId}`, []);
            console.log(response);
            setRemovedOrAddedFromWishlist([true, response.data]);

            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
            
            
        } catch(err){
            console.log(err.response.data);
        }
    }

    async function getLikedListings(){
        try{
            setIsLoading(true);
            const likedListingResponse = await axios.get(`/user/wishlists/${userId}`);
            const wishlists = [];
            if (likedListingResponse) {
                console.log(likedListingResponse.data);
                for (let i = 0; i < likedListingResponse.data.length; i++){
                    let wishlistData = await axios.get(`/rentinglist/${likedListingResponse.data[i]}`);
                    if (wishlistData) {
                        wishlists.push(wishlistData.data);
                    }
                }
                
                setAllLikedListings(wishlists);
                setIsLoading(false);
            }

        } catch(err){
            setIsLoading(false);
            console.log(err);
        }
    }

    useEffect(() => {
        const retrieveWishlistInfo = async () => {
            await getLikedListings();
        }

        retrieveWishlistInfo();

    }, []);

    return (
        <div>
            {/* -- Toast for successful removal or addition to wishlist -- */}
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

            {isLoading === false ? (
                    <div className="">
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
                        <div className="flex flex-col justify-center gap-4 w-screen h-full mt-20 lg:px-32 md:px-14 px-8 py-12 overflow-y-auto">
                            <h1 className="lg:text-4xl md:text-4xl text-3xl font-bold text-center flex items-center justify-center gap-2">Your Wishlist <span><AiFillHeart className="text-red-500"/></span></h1>
                            {allLikedListings.length > 0 ? (
                                <div className="flex flex-col">
                                    <div className="w-full justify-center items-center content-center lg:px-20 md:px-20 px-8 animate-fadeIn ease-in-out duration-100">
                                        <div className="result-cards-wishlist pb-10 place-content-center">
                                            {allLikedListings && (allLikedListings.map((rentingList) => { 
                                                const startDate = `${new Date(rentingList.startDate).toLocaleString('default', {month: 'long'})} ${rentingList.startDate.split('-')[2].substring(0, 2)}`;
                                                const endDate = `${new Date(rentingList.endDate).toLocaleString('default', {month: 'long'})} ${rentingList.endDate.split('-')[2].substring(0, 2)}`;
                                                return(
                                                    <div className="cursor-pointer w-full grid place-content-center">
                                                        <HiX onClick={() => addOrRemoveToWishlist(rentingList._id)} className="translate-y-14 translate-x-2 p-2 bg-slate-50 hover:bg-gray-200 active:p-3 hover:shadow-2xl text-black h-ex w-ex ease-in-out duration-200 rounded-full"/>
                                                        <button className="grid w-full place-content-center">
                                                            <img onClick={() => navigate(`/rentingList/${rentingList._id}`)} className="card object-cover hover:shadow-xl ease-in-out duration-300" src={rentingList.photos[0]}/>      
                                                        </button>
                                                        <div className="text-sm w-310">
                                                            <div className="flex w-full justify-between">
                                                                <p className="justify-start font-medium">{rentingList.country}</p>
                                                                <p className="justify-end font-light">★ {rentingList.stars}</p>
                                                            </div>
                                                            <p className="text-gray-400 font-light">26 miles to Yosemite National Park</p>
                                                            <p className="text-gray-400 font-light">{startDate} - {endDate}</p>
                                                            <span className="flex mt-1">
                                                                {props.isDisplayTotalBeforeTaxes === true ? <u><b>${rentingList.priceBeforeTax}</b> total before taxes</u> : <p className="font-semibold">${rentingList.priceAfterTax}</p>}
                                                                {!props.isDisplayTotalBeforeTaxes && (
                                                                    <p className="font-light">&nbsp;night</p>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )     
                                            }))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="fixed top-0 bottom-0 left-0 right-0 flex w-screen h-screen justify-center gap-2 items-center bg-white text-center">
                                    <p className="lg:text-3xl md:text-3xl text-xl font-medium p-20">Nothing here, come back later once you've added listings to your wishlist!</p>
                                </div>
                            )}
                            
                            
                        </div>
                    </div>
                ) : (
                    <div className="flex w-screen h-screen justify-center gap-2 items-center">
                        <p className="text-3xl font-medium">Loading your wishlist...</p>
                        <Spinner/>
                    </div>
                )}
        </div>
    )
}