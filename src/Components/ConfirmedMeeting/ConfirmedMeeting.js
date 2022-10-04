import React from 'react';
import { patchMeeting, getUserMeetings } from '../../apiCalls';
import './ConfirmedMeeting.css'

const ConfirmedMeeting = ({ meetingInfo, userId, token, setUserMeetings }) => {

    const cancelMeetingInvite = (e) => {
      patchMeeting("cancelled", userId, meetingInfo.id, token, meetingInfo.attributes.locations[0].id)
      .then(getUserMeetings(userId, token).then((response) => setUserMeetings(response.data)))
    }

    const displayLocationOptions = (array) => {
      return array.map((location, index) => (
        <div key={index} className="radio-div">
          <p>{location.name}</p>
          <p>{location.address}</p>
        </div>
      ))
    }

    return (
      <div className="individual-confirmed-meeting">
        <p><strong>{meetingInfo.attributes.host_name}'s meeting with {meetingInfo.attributes.guest_name}</strong></p>
        <p className="meeting-time" ><strong>Time: </strong>{meetingInfo.attributes.time}</p>
        {displayLocationOptions(meetingInfo.attributes.locations)}
        <button className="cancel-button" onClick={(e) => cancelMeetingInvite(e)}>Cancel Meeting</button>
      </div>
    )
};

export default ConfirmedMeeting;