import React from 'react';
import { useState } from 'react';


const Result = ({ info, checkedMeetingLocations, setCheckedMeetingLocations, id, searchResponses }) => {

  const [checked, setChecked] = useState(false)

    const handleCheckBox = () => {
      if (!checked && checkedMeetingLocations.length < 3) {
        setChecked(true)
        setCheckedMeetingLocations(checkedMeetingLocations => [...checkedMeetingLocations, searchResponses[id]])
      } else if (checked) {
        setChecked(false)
        setCheckedMeetingLocations(checkedMeetingLocations.filter(meetingLocation => {
          return meetingLocation !== searchResponses[id]
        }))
      }
    }

    return (
      <div>
        <img src={info.photos[0]}/>
        <h2>{info.name}</h2>
        <p>{info.review_count} ratings</p>
        <p>{info.categories.join(', ')}</p>
        <p>{info.price}</p>
        <p>{info.address}</p>
        {!info.is_open_now ? <p>Currently Closed</p> : <p>Currently Open</p>}
        <p>Meet here</p>
        <input type="checkbox" id={id} checked={checked} onChange={handleCheckBox}/>
      </div>
    )
};

export default Result;
