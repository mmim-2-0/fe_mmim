import React from 'react';
import Result from '../Result/Result';

const ResultsContainer = ({ searchResponses, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations }) => {

    console.log(searchResponses)
    let displayedResults = searchResponses.map((response, index) => {
      return (
        <Result 
          info={response} 
          id={index}
          key={response.url} 
          checkedMeetingLocations={checkedMeetingLocations}
          setCheckedMeetingLocations={setCheckedMeetingLocations}
          searchResponses={searchResponses}
        />
      )
    })

    return (
      <div>
        <h1>Meet Me in The Middle</h1>
        <p>{addressOne}</p>
        <p>{addressTwo || addressTwoManual}</p>
        <h2>Results ({searchResponses.length})</h2>
        {displayedResults}
        <div className='meeting-invite-container'>
          <p>Select a date / time and enter the other party's email for your meeting invitation:</p>
          <input type="datetime-local" />
          <input type='email' placeholder="Email" />
          <button>Send Meeting Invitation</button>
        </div>
      </div>
    )
};

export default ResultsContainer;
