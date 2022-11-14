import React from 'react';
import PendingMeeting from '../PendingMeeting/PendingMeeting';
import './PendingMeetings.css';
import { getUserMeetings } from '../../apiCalls';
import { useState, useEffect } from 'react';

const PendingMeetings = ({ userMeetings, userId, token, setUserMeetings, setCurrentDisplay, currentDisplay }) => {

  const [pendingMeetings, setPendingMeetings] = useState([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    getUserMeetings(userId, token).then((response) => {
      setUserMeetings(response.data)
      let allMeetings = []
      response.data.forEach((m) => {
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
    })
  }, [currentDisplay])

  const displayPendingMeetings = pendingMeetings.map((meeting, index) => {
    return <PendingMeeting 
      userId={userId}
      meetingInfo={meeting}
      token={token}
      setUserMeetings={setUserMeetings}
      key={index}
      setCurrentDisplay={setCurrentDisplay}
      setError={setError}
    />
  });

  return (
    <div className="all-pending-and-title">
      <h2 className="pending-title">Pending meetings:</h2>
      {error && <p className="error-message">Please select a location to accept a meeting invitation.</p>}
      <div className="all-pending">
        {(pendingMeetings.length > 0) ? displayPendingMeetings : <p className='no-meeting-notification'>You have no pending meetings at the moment.</p>}
      </div>
    </div>
  );
};

export default PendingMeetings;
