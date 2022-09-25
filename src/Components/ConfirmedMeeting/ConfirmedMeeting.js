import React from 'react';
import { useState } from 'react';
import { patchMeeting } from '../../apiCalls';


const ConfirmedMeeting = ({ meetingInfo, userId, token }) => {

    const cancelMeetingInvite = (e) => {
      
      patchMeeting("cancelled", userId, meetingInfo.id, token, meetingInfo.attributes.locations[0].id)
    }

    const displayLocationOptions = (array) => {
      return array.map((location, index) => (
        <div key={index}>
        <p>{location.name}</p>
        <p>{location.address}</p>
        </div>
      ))
    }

    return (
      <div>
      <p>{meetingInfo.attributes.host_name}'s meeting with {meetingInfo.attributes.guest_name}</p>
      <p>Time: {meetingInfo.attributes.time}</p>
      {displayLocationOptions(meetingInfo.attributes.locations)}
      <button onClick={(e) => cancelMeetingInvite(e)}>Cancel Meeting</button>
    </div>
    )
};

export default ConfirmedMeeting;