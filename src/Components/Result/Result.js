import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import Tooltip from "@mui/material/Tooltip";
import "./Result.css";

const Result = ({
  info,
  checkedMeetingLocations,
  setCheckedMeetingLocations,
  id,
  searchResponses,
  addressTwoEmail,
}) => {
  const [checked, setChecked] = useState(false);
  const [tooManyChecked, setTooManyChecked] = useState(false);

  const handleCheckBox = () => {
    if (!checked && checkedMeetingLocations.length < 3) {
      setChecked(true);
      setTooManyChecked(false);
      setCheckedMeetingLocations((checkedMeetingLocations) => [
        ...checkedMeetingLocations,
        searchResponses[id],
      ]);
    } else if (checked) {
      setChecked(false);
      setTooManyChecked(false);
      setCheckedMeetingLocations(
        checkedMeetingLocations.filter((meetingLocation) => {
          return meetingLocation !== searchResponses[id];
        })
      );
    } else if (!checked && checkedMeetingLocations.length >= 3) {
      console.log("too many");
      setTooManyChecked(true);
    }
  };

  return (
    <div className='individual-result'>
      <div className='result-image-div'>
        {info.photos[0] ? (
          <img className='result-image' src={info.photos[0]} />
        ) : (
          <img
            className='result-image'
            src='https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg'
          />
        )}
      </div>
      <div className='result-info-container'>
        <p className='place-name'>{info.name}</p>
        <div className='row'>
          <p className='result-info'>
            {" "}
            <repeatstar n={Math.round(info.rating)}></repeatstar>{" "}
          </p>
          <p className='result-review-count'> {info.review_count} reviews</p>
        </div>
        {info.categories.map((category) => (
          <p className='result-category'> {category}</p>
        ))}
        <div className='row'>
          {!info.is_open_now ? (
            <p className='result-closed'>Currently Closed</p>
          ) : (
            <p className='result-open'>Open Now</p>
          )}
          <p className='result-price'>{info.price}</p>
        </div>
        <p className='result-address'>{info.address}</p>
        {addressTwoEmail && (
          <div className='invite-info'>
            <div className='row'>
              <p className='more-info'>
                <a className='result-url' href={info.url} target='_blank'>
                  More info
                </a>
              </p>
              <div className='checkbox-info'>
                <p className='more-info'>Meet here</p>
                <input
                  className='checkbox'
                  type='checkbox'
                  id={id}
                  checked={checked}
                  onChange={handleCheckBox}
                />
              </div>
            </div>
          </div>
        )}
        {!addressTwoEmail && (
          <div className='row'>
            <Tooltip title='Go to yelp page' placement='bottom'>
              <p>
                <a className='result-url' href={info.url} target='_blank'>
                  More info
                </a>
              </p>
            </Tooltip>
            <Tooltip title='View directions on Google Maps' placement='bottom'>
              <p>
                <Popup
                  trigger={<a className='result-url'>Directions</a>}
                  position='right'
                >
                  <div className='directions-column'>
                    <div>
                      <a
                        className='direction-url'
                        href={info.directions.direction_1}
                        target='_blank'
                      >
                        Direction from address 1
                      </a>
                    </div>
                    <div>
                      <a
                        className='direction-url'
                        href={info.directions.direction_2}
                        target='_blank'
                      >
                        Direction from address 2
                      </a>
                    </div>
                  </div>
                </Popup>
              </p>
            </Tooltip>
          </div>
        )}
        {tooManyChecked && (
          <p className='too-many-error'>
            Please select no more than three location options.
          </p>
        )}
      </div>
    </div>
  );
};

export default Result;
