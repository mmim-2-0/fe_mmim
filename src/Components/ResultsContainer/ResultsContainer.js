import React from 'react';
import Result from '../Result/Result';
import './ResultsContainer.css';

const ResultsContainer = ({ searchResponses, checkedMeetingLocations, setCheckedMeetingLocations, token, userId, addressTwoEmail, setPageTitle }) => {
    
    let displayedResults = searchResponses.map((response, index) => {
      return (
        <Result 
          info={response} 
          id={index}
          key={response.url} 
          checkedMeetingLocations={checkedMeetingLocations}
          setCheckedMeetingLocations={setCheckedMeetingLocations}
          searchResponses={searchResponses}
          addressTwoEmail={addressTwoEmail}
        />
      )
    })

    return (
      <div>
        {/* <h2 className="results-title">Results:</h2> */}
        {/* {addressTwoEmail && <p className="email-instructions">Select up to three locations to send <strong>{addressTwoEmail}</strong></p>} */}
        {displayedResults}
        {/* {addressTwoEmail ? <div className='meeting-invite-container'>
          <p>Select a date / time and enter the other party's email for your meeting invitation:</p>
          <input type="datetime-local" onChange={handleTimeInput} value={meetingTime}/>
          <button onClick={postMeetingLocations}>Send Meeting Invitation</button>
        </div> : <p className="login-text">Login to send a friend a meeting invite</p>} */}
      </div>
    )
};

export default ResultsContainer;
