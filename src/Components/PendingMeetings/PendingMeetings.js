import React from 'react';


const PendingMeetings = ({ userMeetings }) => {

    const pendingMeetings = userMeetings.filter(meeting => meeting.attributes.status === "pending")

    const displayLocationOptions = (array) => {
      return array.map((location, index) => (
        <div key={index}>
        <input type='radio' name="location" value={location.name}></input>
        <label>{location.name}</label>
        </div>
      ))
    }
    
    const displayPendingMeetings = pendingMeetings.map((meeting, index) => ((
      <div key={index}>
        <p>{meeting.attributes.host_name}'s meeting with {meeting.attributes.guest_name}</p>
        <p>Time: {meeting.attributes.time}</p>
        <form>Choose a Location:
          {displayLocationOptions(meeting.attributes.locations)}
        </form>
        <button>Accept Meeting</button>
        <button>Decline Meeting</button>
      </div>
    )))

      //options
      //button to accept / decline meeeting


    return (
      <div>
      <h2>Pending Meetings</h2>
      {displayPendingMeetings}
      </div>
    )
};

export default PendingMeetings;
