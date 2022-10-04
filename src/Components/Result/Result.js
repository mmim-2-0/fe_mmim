import React from 'react';
import { useState } from 'react';
import './Result.css';

const Result = ({ info, checkedMeetingLocations, setCheckedMeetingLocations, id, searchResponses, addressTwoEmail }) => {

  const [checked, setChecked] = useState(false);

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
  };

  return (
    <div className="individual-result">
      {info.photos[0] && <img className="result-image" src={info.photos[0]}/>}
      <div className="result-info-container">
        <h3>{info.name}</h3>
        <p className="result-info"> {info.rating}/5 stars from {info.review_count} ratings</p>
        <p className="result-info">{info.categories.join(', ')}</p>
        <p className="result-info">{info.price}</p>
        <p className="result-info">{info.address}</p>
        {!info.is_open_now ? <p className="result-info">Currently Closed</p> : <p>Open Now</p>}
        {addressTwoEmail && 
          <div className="invite-info">
            <p>Meet here</p>
            <input type="checkbox" id={id} checked={checked} onChange={handleCheckBox}/>
          </div>}
      </div>
    </div>
  )
};

export default Result;
