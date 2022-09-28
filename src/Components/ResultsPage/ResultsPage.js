import React from 'react';
import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { getLocations } from '../../apiCalls.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import './ResultsPage.css';

const ResultsPage = ({ searchCategory, setSearchCategory, setSearchResponses, searchResponses, setSearchCenter, searchCenter, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId, addressTwoEmail, setPageTitle }) => {

  useEffect(() => {
    setPageTitle('home')
  })

    let updateCategory = (category) => {
      getLocations(addressOne, addressTwo || addressTwoManual, category)
      .then(data => {
          console.log(data)
          setSearchCategory(category)
          setSearchResponses(data.data.attributes.locations)
          setSearchCenter(data.data.attributes.map_argument.map_center)
      })
    }

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
          />
        </div>
      </div>
    </div>
    )
};

export default ResultsPage;