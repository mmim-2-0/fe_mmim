import React from 'react';
import { useState } from 'react';
import { patchMeeting, getUserMeetings } from '../../apiCalls';
import './PendingMeeting.css';
import dayjs from 'dayjs';

const PendingMeeting = ({ meetingInfo, userId, token, setUserMeetings }) => {

    const [selectedLocation, setSelectedLocation] = useState('')

    const acceptMeetingInvite = (e) => {
      e.preventDefault()
      patchMeeting("accepted", userId, meetingInfo.id, token, selectedLocation)
      .then(getUserMeetings(userId, token).then((response) => setUserMeetings(response.data)))
  

    }

    const declineMeetingInvite = (e) => {
      e.preventDefault()
      patchMeeting("declined", userId, meetingInfo.id, token, selectedLocation)
      .then(getUserMeetings(userId, token).then((response) => setUserMeetings(response.data)))

    }

    const displayLocationOptions = (array) => {
      return array.map((location, index) => (
        <div key={index} className="radio-div">
          <input type='radio' name="location" value={location.name} id={location.id} onChange={() => setSelectedLocation(location.id)}></input>
          <label>{location.name}</label>
        </div>
      ))
    }

    return (
      <div className="individual-meeting">
        <p>{meetingInfo.attributes.host_name}'s meeting with {meetingInfo.attributes.guest_name}</p>
        <p>Time: {dayjs(meetingInfo.attributes.time).format('MM/DD/YYYY hh:mm a')}</p>
        <form className="pending-form"><span className="form-instructions">Choose a Location:</span>
          {displayLocationOptions(meetingInfo.attributes.locations)}
          <button className="pending-button" onClick={(e) => acceptMeetingInvite(e)}>Accept Meeting</button>
          <button className="pending-button" onClick={(e) => declineMeetingInvite(e)}>Decline Meeting</button>
        </form>
      </div>
    )
};

export default PendingMeeting;