import React from 'react';
import { useState } from 'react';
import { patchMeeting, getUserMeetings } from '../../apiCalls';
import './PendingMeeting.css';
import dayjs from 'dayjs';

const PendingMeeting = ({ meetingInfo, userId, token, setUserMeetings, setCurrentDisplay, setError }) => {

  const [selectedLocation, setSelectedLocation] = useState('');

  const acceptMeetingInvite = (e) => {
    e.preventDefault()
    if (selectedLocation) {
      patchMeeting("accepted", userId, meetingInfo.id, token, selectedLocation)
      .then(getUserMeetings(userId, token).then((response) => {
        setUserMeetings(response.data)
        setCurrentDisplay('confirmed')
        setError(false)
        }
      ))
    } else {
      setError(true)
    }
  };

  const declineMeetingInvite = (e) => {
    e.preventDefault()
    patchMeeting("declined", userId, meetingInfo.id, token, selectedLocation)
    .then(getUserMeetings(userId, token).then((response) => {
      setUserMeetings(response.data)
      setCurrentDisplay('confirmed')
      setError(false)
      }
    ))
  };

  const displayLocationOptions = (array) => {
    return array.map((location, index) => (
      <div key={index} className="radio-div">
        <input className="location-input" type='radio' name="location" value={location.name} id={location.id} onChange={() => setSelectedLocation(location.id)}></input>
        <label className="location-label">{location.name}</label>
      </div>
    ))
  };

  return (
    <div className="individual-meeting">
      <p className="individual-meeting-title">{meetingInfo.attributes.host_name}'s meeting with {meetingInfo.attributes.guest_name}</p>
      <p>Time: {dayjs(meetingInfo.attributes.time).format('LLL')}</p>
      <form className="pending-form">
        <div className="choose-location-container">
          <span className="form-instructions">Choose a Location:</span>
          {displayLocationOptions(meetingInfo.attributes.locations)}
        </div>
        <div className="pending-button-container">
          <button className="accept-button" onClick={(e) => acceptMeetingInvite(e)}>Accept</button>
          <button className="decline-button" onClick={(e) => declineMeetingInvite(e)}>Decline</button>
        </div>
      </form>
    </div>
  )
};

export default PendingMeeting;