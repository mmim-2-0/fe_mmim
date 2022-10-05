import React from 'react';
import PendingMeeting from '../PendingMeeting/PendingMeeting';
import './PendingMeetings.css';
import { useState, useEffect } from 'react';

const PendingMeetings = ({ userMeetings, userId, token, setUserMeetings }) => {

  const [pendingMeetings, setPendingMeetings] = useState([]);

  useEffect(() => {
    let allMeetings = []
    userMeetings.forEach((m) => {
      if (m.attributes.status === 'pending' && !allMeetings.includes(m)) {
        allMeetings.push(m)
      }
    })
    let filteredMeetings = [];
    allMeetings.forEach(m => {
      let allIds = filteredMeetings.reduce((acc, i) => {
        acc.push(i.id)
        return acc;
      }, [])
      if (!allIds.includes(m.id)) {
        filteredMeetings.push(m);
      }
    })
    setPendingMeetings(filteredMeetings)
  }, [])

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
