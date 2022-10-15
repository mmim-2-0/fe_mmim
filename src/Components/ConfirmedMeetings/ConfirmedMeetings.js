import React from 'react';
import ConfirmedMeeting from '../ConfirmedMeeting/ConfirmedMeeting';
import './ConfirmedMeetings.css';
import { useState, useEffect } from 'react';
import { getUserMeetings } from '../../apiCalls';


const ConfirmedMeetings = ({ userMeetings, userId, token, setUserMeetings, currentDisplay }) => {

  // const [userConfirmedMeetings, setUserConfirmedMeetings] = useState([]);
  const [confirmedMeetings, setConfirmedMeetings] = useState([]);

  // useEffect(() => {
  //   getUserMeetings(userId, token).then((response) => {
  //     console.log(response)
  //     // setUserMeetings(response.data)
  //     let allMeetings = []
  //     response.data.forEach((m) => {
  //       if (m.attributes.status === 'confirmed' && !allMeetings.includes(m)) {
  //         allMeetings.push(m)
  //       }
  //     })
  //     let filteredMeetings = [];
  //     allMeetings.forEach(m => {
  //       let allIds = filteredMeetings.reduce((acc, i) => {
  //         acc.push(i.id)
  //         return acc;
  //       }, [])
  //       if (!allIds.includes(m.id)) {
  //         filteredMeetings.push(m);
  //       }
  //     })
  //     setUserConfirmedMeetings(filteredMeetings)
  //   })
  // }, [])

  useEffect(() => {
    // getUserMeetings(userId, token).then((response) => {
    //   console.log('r', response)
    // })
    console.log('userMeetingsChanged')
    setConfirmedMeetings(userMeetings.filter(meeting => meeting.attributes.status === "accepted"))
  }, [userMeetings])

  // const refetchMeetings = () => {
  //   getUserMeetings(userId, token).then((response) => {
  //     console.log('r', response)
  //   })
  // }

  // const confirmedMeetings = userMeetings.filter(meeting => meeting.attributes.status === "accepted");
  
  const displayConfirmedMeetings = confirmedMeetings.map((meeting, index) => {
    return <ConfirmedMeeting 
      userId={userId}
      meetingInfo={meeting}
      token={token}
      setUserMeetings={setUserMeetings}
      key={index}
    />
  });

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
