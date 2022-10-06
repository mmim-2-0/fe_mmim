import React from 'react';
import { patchMeeting, getUserMeetings } from '../../apiCalls';
import './ConfirmedMeeting.css';
import dayjs from 'dayjs';

const ConfirmedMeeting = ({ meetingInfo, userId, token, setUserMeetings }) => {

  const cancelMeetingInvite = (e) => {
    console.log('m', meetingInfo)
    patchMeeting("cancelled", userId, meetingInfo.id, token, meetingInfo.attributes.locations[0].id)
    .then(getUserMeetings(userId, token).then((response) => setUserMeetings(response.data)))
  };

  const displayLocationOptions = (array) => {
    return array.map((location, index) => (
      <div key={index}>
        <p>{location.name}</p>
        <p>{location.address}</p>
      </div>
    ))
  };

  return (
    <div className="individual-confirmed-meeting">
      <div>
      <p className="individual-meeting-title"><strong>{meetingInfo.attributes.host_name}'s meeting with {meetingInfo.attributes.guest_name}</strong></p>
      <p><strong>Time: </strong>{dayjs(meetingInfo.attributes.time).format('MM/DD/YYYY hh:mm A')}</p>
      {displayLocationOptions(meetingInfo.attributes.locations)}
      </div>
      <button className="cancel-button" onClick={(e) => cancelMeetingInvite(e)}>Cancel Meeting</button>
    </div>
  )
};

export default ConfirmedMeeting;