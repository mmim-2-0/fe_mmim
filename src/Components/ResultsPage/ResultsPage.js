import React from 'react';
import { useEffect } from 'react';
import Map from '../Map/Map';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { getLocations, getGuestUser } from '../../apiCalls.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import './ResultsPage.css';

const ResultsPage = ({ searchCategory, setSearchCategory, setSearchResponses, searchResponses, setSearchCenter, searchCenter, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId, addressTwoEmail, setPageTitle }) => {

  useEffect(() => {
    setPageTitle('home')
  })

    let updateCategory = (category) => {
      setSearchCategory(category)
      if (addressTwo || addressTwoManual) {
        getLocations(addressOne, addressTwo || addressTwoManual, category)
        .then(data => {
            console.log(data)
            setSearchResponses(data.data.attributes.locations)
            setSearchCenter(data.data.attributes.map_argument.map_center)
        })
      }
      if (addressTwoEmail) {
        console.log('a', addressTwoEmail)
        getGuestUser(token, addressTwoEmail)
        .then((data) => {
            return data.data.attributes.address
        })
        .then(address => {
            getLocations(addressOne, address, category)
                .then(data => {
                    console.log(data)
                    setSearchResponses(data.data.attributes.locations)
                    setSearchCenter(data.data.attributes.map_argument.map_center)
                 })
        }) 
      }
    }

    // update the category changer when someone is searching by email specifically

    return (
    <div>
      <div className="category-change-container">
        <h1>Change your meeting category:</h1>
        <div className="category-container">
          <CafeIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <RestaurantIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <BarIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <LibraryIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <ParkIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
        </div>
      </div>
      <div className="map-and-results">
        <div className="map">
          <Map
            searchResponses={searchResponses}
            searchCenter={searchCenter}
          />
        </div>
        <div className="results">
          <ResultsContainer
            searchResponses={searchResponses}
            addressOne={addressOne}
            addressTwo={addressTwo}
            addressTwoManual={addressTwoManual}
            checkedMeetingLocations={checkedMeetingLocations}
            setCheckedMeetingLocations={setCheckedMeetingLocations}
            userEmail={userEmail}
            token={token}
            userId={userId}
            addressTwoEmail={addressTwoEmail}
            setPageTitle={setPageTitle}
          />
        </div>
      </div>
    </div>
    )
};

export default ResultsPage;