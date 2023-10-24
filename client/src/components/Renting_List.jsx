import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Renting_List(props){
    const [initialRentingList, setInitialRentingList] = useState(null);
    const loadingRentingList = [];
    const isUser = Boolean(useSelector((state) => state.token));
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    for (let i = 0; i < 16; i++){
        loadingRentingList.push({
            country: 'United States',
            stars: '4.95',
            date: 'Oct 69 - Oct 420',
            priceBeforeTax: '6969'
        });
    }

    const navigate = useNavigate();

    async function getRentingLists() {

        const allRentingLists = await axios.get('rentinglists', []);
        if (allRentingLists) { 
            setInitialRentingList(allRentingLists.data);
        }
    }

    function openRentingScene(rentingListId){
        isUser ? navigate(`/rentingList/${rentingListId}`) : props.changeLoginModal();
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true);

                // fake fetch to simulate delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                await getRentingLists();


            } catch(err){
                throw err;
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
        
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    function updateRentingListsFilter(){
        if (initialRentingList !== null) {
            // another timeout to simulate data fetching
            
            const filteredList = initialRentingList.filter((rentingList) => ((rentingList.homeType.toLowerCase().replace(/\s/g, "") === props.activeNavbarOption.toLowerCase().replace(/\s/g, "")) && (props.guests <= rentingList.numGuests) && (props.country !== 'Anywhere' ? rentingList.country.toLowerCase().replace(/\s/g, "") === props.country.toLowerCase().replace(/\s/g, "") : true) && (isUser ? rentingList.host !== user._id : true) && (props.weeks !== 'Any week' ? (new Date(rentingList.startDate) >= new Date(props.weeks[0]) && (new Date(rentingList.endDate) <= new Date(props.weeks[1]))) : true)));
            
            return filteredList;
        }
    }
    
    return (
        <div>

            {!isLoading && initialRentingList ? (
                <div className="w-full justify-center items-center content-center lg:px-20 md:px-20 px-8 animate-fadeIn ease-in-out duration-100">
                    <div className="result-cards translate-y-48 pb-10 place-content-center">
                        {updateRentingListsFilter().length > 0 ? (updateRentingListsFilter().map((rentingList) => { 
                            const startDate = `${new Date(rentingList.startDate).toLocaleString('default', {month: 'long'})} ${rentingList.startDate.split('-')[2].substring(0, 2)}`;
                            const endDate = `${new Date(rentingList.endDate).toLocaleString('default', {month: 'long'})} ${rentingList.endDate.split('-')[2].substring(0, 2)}`;
                            return(
                                <div onClick={() => openRentingScene(rentingList._id)} className="cursor-pointer w-full grid place-content-center">
                                    <button className="grid w-full place-content-center">
                                        <img className="card object-cover hover:shadow-xl ease-in-out duration-300" src={rentingList.photos[0]}/>
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
                        })) : (
                            <div className="fixed top-0 left-0 w-full h-full flex flex-col gap-2 text-center items-center justify-center translate-y-24">
                                <h1 className="lg:text-3xl md:text-3xl text-2xl font-semibold">No listings found!</h1>
                                <p className="text-sm font-light">Please try another search.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full justify-center items-center content-center lg:px-20 md:px-20 px-8">
                    <div className="result-cards translate-y-48 pb-10 place-content-center">
                        {loadingRentingList && (loadingRentingList.map((rentingList) => { 
                            return(
                                <div className="w-full grid place-content-center">
                                    <button className="grid w-full place-content-center">
                                        <div className="loading-card ease-in-out duration-300"/>
                                    </button>
                                    <div className="text-sm w-310">
                                        <div className="flex w-full justify-between">
                                            <p className="justify-start gray-rectangle font-medium">{rentingList.country}</p>
                                            <p className="justify-end gray-rectangle font-light">★ {rentingList.stars}</p>
                                        </div>
                                        <p className="text-gray-400 gray-rectangle font-light">26 miles to Yosemite National Park</p>
                                        <p className="text-gray-400 gray-rectangle font-light">{rentingList.date}</p>
                                        <span className="flex mt-1 gray-rectangle">
                                            {rentingList.priceBeforeTax} night
                                        </span>
                                    </div>
                                </div>
                            )     
                        }))}
                    </div>
                </div>
            )}
        </div>
        
       
    )
}