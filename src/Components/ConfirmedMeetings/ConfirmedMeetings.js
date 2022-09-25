import React from 'react';
import ConfirmedMeeting from '../ConfirmedMeeting/ConfirmedMeeting';

const ConfirmedMeetings = ({ userMeetings, userId, token }) => {

    const confirmedMeetings = userMeetings.filter(meeting => meeting.attributes.status === "accepted")
    
    const displayConfirmedMeetings = confirmedMeetings.map((meeting, index) => {
      return <ConfirmedMeeting 
        userId={userId}
        meetingInfo={meeting}
        token={token}
        key={index}
      />
})
    return (
      <div>
      <h2>Confirmed Meetings</h2>
      {displayConfirmedMeetings}
      </div>
    )
};

export default ConfirmedMeetings;
