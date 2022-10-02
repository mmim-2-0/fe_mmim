import React from 'react';
import Result from '../Result/Result';
import { sendMeetingOptions } from '../../apiCalls.js';
import { useState } from 'react';
import './ResultsContainer.css';
import { useNavigate } from 'react-router-dom';

const ResultsContainer = ({ searchResponses, checkedMeetingLocations, setCheckedMeetingLocations, token, userId, addressTwoEmail, setPageTitle }) => {

  let navigate = useNavigate();

  const [meetingTime, setMeetingTime] = useState('')
    // console.log(searchResponses)
    
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
    }

    const postMeetingLocations = () => {
      // console.log('id', userId)
      // console.log('token', token)
      // console.log('email', addressTwoEmail)
      // console.log('time', meetingTime)
      // console.log('locations', checkedMeetingLocations)
      sendMeetingOptions(userId, token, addressTwoEmail, meetingTime, checkedMeetingLocations).then(res => console.log(res))
      setCheckedMeetingLocations([])
      navigate(`/dashboard`)
      setPageTitle('dashboard')
    }

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
