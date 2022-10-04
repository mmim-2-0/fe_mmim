import React from 'react';
import ConfirmedMeeting from '../ConfirmedMeeting/ConfirmedMeeting';
import './ConfirmedMeetings.css'

const ConfirmedMeetings = ({ userMeetings, userId, token, setUserMeetings }) => {

    const confirmedMeetings = userMeetings.filter(meeting => meeting.attributes.status === "accepted")
    
    const displayConfirmedMeetings = confirmedMeetings.map((meeting, index) => {
      return <ConfirmedMeeting 
        userId={userId}
        meetingInfo={meeting}
        token={token}
        setUserMeetings={setUserMeetings}
        key={index}
      />
})
    return (
      <div className="all-confirmed-and-title">
        <h2 className="confirmed-title">Confirmed meetings:</h2>
        <div className="all-confirmed">
          {displayConfirmedMeetings}
        </div>
      </div>
    )
};

export default ConfirmedMeetings;
