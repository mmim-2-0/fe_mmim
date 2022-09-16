import React from 'react';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';
import { getLocations } from '../../apiCalls.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer';

const ResultsPage = ({ searchCategory, setSearchCategory, setSearchResponses, searchResponses, setSearchCenter, searchCenter, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId }) => {

    let updateCategory = (category) => {
      getLocations(addressOne, addressTwo, category)
      .then(data => {
          console.log(data)
          setSearchCategory(category)
          setSearchResponses(data.data.attributes.locations)
          setSearchCenter(data.data.attributes.map_argument.map_center)
      })
    }

    return (
    <div>
      <Nav />
      <div>
        <h1>Find Meeting Location</h1>
        <button onClick={() => updateCategory("cafe")}>cafe</button>
        <button onClick={() => updateCategory("restaurant")}>restaurant</button>
        <button onClick={() => updateCategory("bar")}>bar</button>
        <button onClick={() => updateCategory("library")}>library</button>
        <button onClick={() => updateCategory("park")}>park</button>
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
