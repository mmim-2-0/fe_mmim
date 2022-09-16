import React from 'react';

const Result = ({ info, checkedMeetingLocations, setCheckedMeetingLocations, id, searchResponses }) => {
  // add a function to checkbox where it keeps track of how many are checked
    // add check box to state, if state length is 3 or 3 boxes are checked, disable other checkboxes
    // once all fields are filled out, send meeting invitation POST 

    const handleCheckBox = (e) => {
      let inputIndex = e.target.id
      if (!e.checked) {
        e.checked = true
      } else if (e.checked) {
        e.checked = false
      }
      console.log(e.checked)
      // if inputIndex === searchResponses[index], push that searchResponse object to checkedMeetingLocations state 
      // setCheckedMeetingLocations(...checkedMeetingLocations, searchResponses[index])

      // left off on 9/15 - changing checked back to false, not working as is 
      console.log(inputIndex)
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
        <input type="checkbox" id={id} onChange={handleCheckBox}/>
      </div>
    )
};

export default Result;
