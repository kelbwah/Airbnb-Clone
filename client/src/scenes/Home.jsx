import React from "react";
import Navbar from "../components/Navbar.jsx";
import Login_Modal from "../components/Login_Modal.jsx";
import Destination_Modal from "../components/Desination_Modal.jsx";
import Renting_List from "../components/Renting_List.jsx";
import { useNavigate } from "react-router-dom";

export default function Home(props){
    const navigate = useNavigate();

    function resetNavbar(){
        props.setIsNavbarOptions(true);
        props.setIsNavbarDestination(true);
        navigate('/');
    }

    function changeActiveNavbarOption(option){
        props.setActiveNavbarOption(option);
    }

    return (
        <div>
            {(props.showLoginModal === true) ? (
                <Login_Modal refreshPage={props.refreshPage} changeLoginModal={props.changeLoginModal}/>
            ) : (props.showDestinationModal === true) ? (
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
            ) : (
                <></>
            )}
            
            {props.showDestinationModal === false && (
                <div className="flex flex-grow flex-col h-screen overflow-y-auto">
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
                    activeNavbarOption={props.activeNavbarOption}
                    changeActiveNavbarOption={changeActiveNavbarOption}
                    resetNavbar={resetNavbar}
                    isDisplayTotalBeforeTaxes={props.isDisplayTotalBeforeTaxes}
                    />
                    <Renting_List
                    guests={props.guests}
                    weeks={props.weeks}
                    country={props.country}
                    filters={props.filters}
                    activeNavbarOption={props.activeNavbarOption}
                    isDisplayTotalBeforeTaxes={props.isDisplayTotalBeforeTaxes}
                    changeLoginModal={props.changeLoginModal}
                    />
                </div>
            )}
            
        </div>
    )

}