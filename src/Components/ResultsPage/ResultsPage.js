import React from 'react';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';
import Result from '../Result/Result';

const ResultsPage = ({ searchResponses, searchCenter }) => {
    return (
    <div>
      <Nav />
      <Map
        searchResponses={searchResponses}
        searchCenter={searchCenter}
      />
      <Result />
    </div>
    )
};

export default ResultsPage;
