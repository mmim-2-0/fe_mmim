import React from 'react';
import { useState } from 'react';
import { patchMeeting } from '../../apiCalls';


const PendingMeeting = ({ meetingInfo, userId, token }) => {

    const [selectedLocation, setSelectedLocation] = useState('')

    const acceptMeetingInvite = (e) => {
      
      patchMeeting("accepted", userId, meetingInfo.id, token, selectedLocation)
    }

    const declineMeetingInvite = (e) => {
      
      patchMeeting("declined", userId, meetingInfo.id, token, selectedLocation)
    }

    const displayLocationOptions = (array) => {
      return array.map((location, index) => (
        <div key={index}>
        <input type='radio' name="location" value={location.name} id={location.id} onChange={() => setSelectedLocation(location.id)}></input>
        <label>{location.name}</label>
        </div>
      ))
    }

    return (
      <div>
      <p>{meetingInfo.attributes.host_name}'s meeting with {meetingInfo.attributes.guest_name}</p>
      <p>Time: {meetingInfo.attributes.time}</p>
      <form>Choose a Location:
        {displayLocationOptions(meetingInfo.attributes.locations)}
        <button onClick={(e) => acceptMeetingInvite(e)}>Accept Meeting</button>
        <button onClick={(e) => declineMeetingInvite(e)}>Decline Meeting</button>
      </form>
    </div>
    )
};

export default PendingMeeting;