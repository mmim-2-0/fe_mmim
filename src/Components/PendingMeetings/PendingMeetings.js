import React from 'react';
import PendingMeeting from '../PendingMeeting/PendingMeeting';
import './PendingMeetings.css';

const PendingMeetings = ({ userMeetings, userId, token, setUserMeetings }) => {

  const pendingMeetings = userMeetings.filter(meeting => meeting.attributes.status === "pending");
  
  const displayPendingMeetings = pendingMeetings.map((meeting, index) => {
    return <PendingMeeting 
      userId={userId}
      meetingInfo={meeting}
      token={token}
      setUserMeetings={setUserMeetings}
      key={index}
    />
  });

  return (
    <div className="all-pending-and-title">
      <h2 className="pending-title">Pending meetings:</h2>
      <div className="all-pending">
        {(pendingMeetings.length > 0) ? displayPendingMeetings : <p>No pending meetings</p>}
      </div>
    </div>
  );
};

export default PendingMeetings;
