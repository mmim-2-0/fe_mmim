import React from 'react';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';
import ResultsContainer from '../ResultsContainer/ResultsContainer';

const ResultsPage = ({ searchResponses, searchCenter, addressOne, addressTwo }) => {
    return (
    <div>
      <Nav />
      <Map
        searchResponses={searchResponses}
        searchCenter={searchCenter}
      />
      <ResultsContainer
        searchResponses={searchResponses}
        addressOne={addressOne}
        addressTwo={addressTwo}
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
