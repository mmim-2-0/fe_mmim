import React from 'react';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { getLocations } from '../../apiCalls.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer';

const ResultsPage = ({ searchCategory, setSearchCategory, setSearchResponses, searchResponses, setSearchCenter, searchCenter, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId, addressTwoEmail }) => {

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
      <div>
        <h1>Choose a place to meet</h1>
        <CafeIcon setSearchCategory={updateCategory}/>
        <RestaurantIcon setSearchCategory={updateCategory}/>
        <BarIcon setSearchCategory={updateCategory}/>
        <LibraryIcon setSearchCategory={updateCategory}/>
        <ParkIcon setSearchCategory={updateCategory}/>
      </div>

      <Map
        searchResponses={searchResponses}
        searchCenter={searchCenter}
      />
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
    )
};

export default ResultsPage;


// <>
//     <p>Didn't find what you're looking for?</p>
//     <select>
//         <option>Cafe</option>
//         <option>Restaurant</option>
//         <option>Bar</option>
//         <option>Park</option>
//         <option>Library</option>
//     </select>
//     <button>Update category</button>
// </>
