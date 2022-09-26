import React from 'react';
import Result from '../Result/Result';
import { sendMeetingOptions } from '../../apiCalls.js';
import { useState } from 'react';
import './ResultsContainer.css';

const ResultsContainer = ({ searchResponses, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId, addressTwoEmail }) => {

  const [meetingTime, setMeetingTime] = useState('')

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
      // setMeetingTime('2022-09-30T17:46')
      // console.log(typeOf meetingTime)
    }

    const postMeetingLocations = () => {
      console.log('id', userId)
      console.log('token', token)
      console.log('email', addressTwoEmail)
      console.log('time', meetingTime)
      console.log('locations', checkedMeetingLocations)
      // console.log(typeOf meetingTime)
      sendMeetingOptions(userId, token, addressTwoEmail, meetingTime, checkedMeetingLocations).then(res => console.log(res))
    }

    return (
      <div>
        {/* <h1>Meet Me in The Middle</h1> */}
        {/* <h3>Results ({searchResponses.length}):</h3> */}
        <h2 className="results-title">Results:</h2>
        {displayedResults}
        {addressTwoEmail ? <div className='meeting-invite-container'>
          <p>Select a date / time and enter the other party's email for your meeting invitation:</p>
          <input type="datetime-local" onChange={handleTimeInput} value={meetingTime}/>
          <button onClick={postMeetingLocations}>Send Meeting Invitation</button>
        </div> : <p className="login-text">Login to send a friend a meeting invite</p>}
      </div>
    )
};

export default ResultsContainer;
