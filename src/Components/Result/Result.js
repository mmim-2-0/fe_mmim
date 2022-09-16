import React from 'react';
import { useState } from 'react';


const Result = ({ info, checkedMeetingLocations, setCheckedMeetingLocations, id, searchResponses }) => {

  const [checked, setChecked] = useState(false)
  // add a function to checkbox where it keeps track of how many are checked
    // add check box to state, if state length is 3 or 3 boxes are checked, disable other checkboxes
    // once all fields are filled out, send meeting invitation POST 
    
    // on check, push info to empty array, uncheck removes from array 
      // reassign checkedMeeting locations to the helper array 

    const handleCheckBox = () => {
      if (!checked) {
        setChecked(true)
      } else if (checked) {
        setChecked(false)
      }
    }

    const 

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
