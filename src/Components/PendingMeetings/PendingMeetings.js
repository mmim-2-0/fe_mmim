import React from 'react';
import PendingMeeting from '../PendingMeeting/PendingMeeting';
import { acceptMeeting } from '../../apiCalls';


const PendingMeetings = ({ userMeetings, userId, token }) => {

    const pendingMeetings = userMeetings.filter(meeting => meeting.attributes.status === "pending")
    
    const displayPendingMeetings = pendingMeetings.map((meeting, index) => {
      return <PendingMeeting 
        userId={userId}
        meetingInfo={meeting}
        token={token}
        key={index}
      />
})

    return (
      <div>
      <h2>Pending Meetings</h2>
      {displayPendingMeetings}
      </div>
    )
};

export default PendingMeetings;
