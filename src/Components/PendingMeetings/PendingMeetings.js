import React from 'react';
import PendingMeeting from '../PendingMeeting/PendingMeeting';
import { acceptMeeting } from '../../apiCalls';
import './PendingMeetings.css'


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
      <div className="all-pending-and-title">
        <h2 className="pending-title">Your Pending Meetings</h2>
        <div className="all-pending">
          {displayPendingMeetings}
        </div>
      </div>
    )
};

export default PendingMeetings;
