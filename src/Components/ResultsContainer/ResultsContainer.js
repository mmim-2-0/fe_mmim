import React from 'react';
import Result from '../Result/Result';

const ResultsContainer = ({ searchResponses, addressOne, addressTwo }) => {

    console.log(searchResponses)
    let displayedResults = searchResponses.map(response => {
      return <Result info={response} key={response.url}/>
    })

    return (
      <div>
        <h1>Meet Me in The Middle</h1>
        <p>{addressOne}</p>
        <p>{addressTwo}</p>
        <h2>Results ({searchResponses.length})</h2>
        {displayedResults}
      </div>
    )
};

export default ResultsContainer;
