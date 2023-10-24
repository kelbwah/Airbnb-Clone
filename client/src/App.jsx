import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './scenes/Home.jsx';
import RentingScene from './scenes/RentingScene.jsx';
import Wishlist from './scenes/Wishlist.jsx';
import Trips from './scenes/Trips.jsx';
import AirbnbYourHome from './scenes/AirbnbYourHome.jsx';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  const isAuth = Boolean(useSelector((state) => state.token));
  
  // Navbar options
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [guests, setGuests] = useState(0);
  const [weeks, setWeeks] = useState('Any week');
  const [country, setCountry] = useState('Anywhere');
  const [filters, setFilters] = useState([]);
  const [isDisplayTotalBeforeTaxes, setIsDisplayTotalBeforeTaxes] = useState(false);
  const [activeNavbarOption, setActiveNavbarOption] = useState("Amazing pools");
  const [isNavbarOptions, setIsNavbarOptions] = useState(true);
  const [isNavbarDestination, setIsNavbarDestination] = useState(true);

  const isUser = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const [isHost, setIsHost] = useState(false);

  function changeDisplayTotal(){
    setIsDisplayTotalBeforeTaxes((prev) => !(prev));
  }

  function refreshPage(){
      window.location.reload();
  }

  function changeShowLoginModal(){
      setShowLoginModal((prev) => !(prev));
  }

  function changeShowDestinationModal(){
      setShowDestinationModal(!showDestinationModal);
  }

  async function getTest() {
    const {data} = await axios.get(`${user._id}/ishost`);
    if (data[0] === true) {
      setIsHost([true, data[1]]);
    } else if (data[0] === false) {
      setIsHost(false);
    }
  }

  useEffect(() => {
    
    const getRentingLists = async () => {
      await getTest();
    }

    getRentingLists();

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home
            changeDisplayTotal={changeDisplayTotal}
            changeLoginModal={changeShowLoginModal} 
            changeDestinationModal={changeShowDestinationModal}
            activeNavbarOption={activeNavbarOption}
            setActiveNavbarOption={setActiveNavbarOption}
            guests={guests}
            weeks={weeks}
            country={country}
            numAdults={numAdults}
            numChildren={numChildren}
            filters={filters}
            setGuests={setGuests}
            setWeeks={setWeeks}
            setCountry={setCountry}
            setFilters={setFilters}
            setNumAdults={setNumAdults}
            setNumChildren={setNumChildren}
            isNavbarOptions={isNavbarOptions}
            setIsNavbarOptions={setIsNavbarOptions}
            isNavbarDestination={isNavbarDestination}
            setIsNavbarDestination={setIsNavbarDestination}
            refreshPage={refreshPage}
            showDestinationModal={showDestinationModal}
            showLoginModal={showLoginModal}
            isDisplayTotalBeforeTaxes={isDisplayTotalBeforeTaxes}
            />
          }>
        </Route>
        <Route path="/rentingList/:id" element={isAuth ? 
          <RentingScene
            changeDisplayTotal={changeDisplayTotal}
            changeLoginModal={changeShowLoginModal} 
            changeDestinationModal={changeShowDestinationModal}
            guests={guests}
            weeks={weeks}
            country={country}
            numAdults={numAdults}
            numChildren={numChildren}
            filters={filters}
            setGuests={setGuests}
            setWeeks={setWeeks}
            setCountry={setCountry}
            setFilters={setFilters}
            setNumAdults={setNumAdults}
            setNumChildren={setNumChildren}
            isNavbarOptions={isNavbarOptions}
            setIsNavbarOptions={setIsNavbarOptions}
            isNavbarDestination={isNavbarDestination}
            setIsNavbarDestination={setIsNavbarDestination}
            refreshPage={refreshPage}
            showDestinationModal={showDestinationModal}
            showLoginModal={showLoginModal}
          /> 
        : <Navigate to="/"/>}/>
         <Route path="/wishlists/:id" element={isAuth ? 
          <Wishlist
            changeLoginModal={changeShowLoginModal} 
            changeDestinationModal={changeShowDestinationModal}
            guests={guests}
            weeks={weeks}
            country={country}
            numAdults={numAdults}
            numChildren={numChildren}
            filters={filters}
            setGuests={setGuests}
            setWeeks={setWeeks}
            setCountry={setCountry}
            setFilters={setFilters}
            setNumAdults={setNumAdults}
            setNumChildren={setNumChildren}
            isNavbarOptions={isNavbarOptions}
            setIsNavbarOptions={setIsNavbarOptions}
            isNavbarDestination={isNavbarDestination}
            isDisplayTotalBeforeTaxes={isDisplayTotalBeforeTaxes}
            setIsNavbarDestination={setIsNavbarDestination}
            refreshPage={refreshPage}
            showDestinationModal={showDestinationModal}
            showLoginModal={showLoginModal}
          /> 
        : <Navigate to="/"/>}/>
        <Route path="/trips/:id" element={isAuth ? 
          <Trips
            changeLoginModal={changeShowLoginModal} 
            changeDestinationModal={changeShowDestinationModal}
            guests={guests}
            weeks={weeks}
            country={country}
            numAdults={numAdults}
            numChildren={numChildren}
            filters={filters}
            setGuests={setGuests}
            setWeeks={setWeeks}
            setCountry={setCountry}
            setFilters={setFilters}
            setNumAdults={setNumAdults}
            setNumChildren={setNumChildren}
            isNavbarOptions={isNavbarOptions}
            setIsNavbarOptions={setIsNavbarOptions}
            isNavbarDestination={isNavbarDestination}
            setIsNavbarDestination={setIsNavbarDestination}
            refreshPage={refreshPage}
            showDestinationModal={showDestinationModal}
            showLoginModal={showLoginModal}
          /> 
        : <Navigate to="/"/>}/>
        <Route path="/airbnbyourhome/:id" element=
          {isAuth && (isHost === false) ? 
            <AirbnbYourHome
              changeLoginModal={changeShowLoginModal} 
              changeDestinationModal={changeShowDestinationModal}
              guests={guests}
              weeks={weeks}
              country={country}
              numAdults={numAdults}
              numChildren={numChildren}
              filters={filters}
              setGuests={setGuests}
              setWeeks={setWeeks}
              setCountry={setCountry}
              setFilters={setFilters}
              setNumAdults={setNumAdults}
              setNumChildren={setNumChildren}
              isNavbarOptions={isNavbarOptions}
              setIsNavbarOptions={setIsNavbarOptions}
              isNavbarDestination={isNavbarDestination}
              setIsNavbarDestination={setIsNavbarDestination}
              refreshPage={refreshPage}
              showDestinationModal={showDestinationModal}
              showLoginModal={showLoginModal}
            /> : isAuth && (isHost[0] === true) ? <Navigate to={`/rentingList/${isHost[1]}`}/> : <Navigate to='/'/>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
