import React from 'react';
import Result from '../Result/Result';
import { sendMeetingOptions } from '../../apiCalls.js';
import { useState } from 'react';

const ResultsContainer = ({ searchResponses, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId, addressTwoEmail }) => {

  const [meetingTime, setMeetingTime] = useState(null)

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
          addressTwoEmail={addressTwoEmail}
        />
      )
    })

    const handleTimeInput = (e) => {
      
      setMeetingTime(e.target.value)
      // console.log(typeOf meetingTime)
    }

    const postMeetingLocations = () => {
      sendMeetingOptions(userId, token, addressTwoEmail, meetingTime, checkedMeetingLocations)
    }

    return (
      <div>
        <h1>Meet Me in The Middle</h1>
        <p>{addressOne}</p>
        <p>{addressTwo || addressTwoManual}</p>
        <h2>Results ({searchResponses.length})</h2>
        {displayedResults}
        {addressTwoEmail ? <div className='meeting-invite-container'>
          <p>Select a date / time and enter the other party's email for your meeting invitation:</p>
          <input type="datetime-local" onChange={handleTimeInput}/>
          <button onClick={postMeetingLocations}>Send Meeting Invitation</button>
        </div> : <p>Login to send a friend a meeting invite</p>}
      </div>
    )
};

export default ResultsContainer;
