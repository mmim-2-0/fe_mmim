import React from 'react';
import { useEffect, useState } from 'react';
import Map from '../Map/Map';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { getLocations, getGuestUser, sendMeetingOptions } from '../../apiCalls.js';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import './ResultsPage.css';
import { useNavigate } from 'react-router-dom';

const ResultsPage = ({ searchCategory, setSearchCategory, setSearchResponses, searchResponses, setSearchCenter, searchCenter, addressOne, addressTwo, addressTwoManual, checkedMeetingLocations, setCheckedMeetingLocations, userEmail, token, userId, addressTwoEmail, setPageTitle }) => {
  
  const [meetingTime, setMeetingTime] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    setPageTitle('home')
  })

    let updateCategory = (category) => {
      setSearchCategory(category)
      if (addressTwo || addressTwoManual) {
        getLocations(addressOne, addressTwo || addressTwoManual, category)
        .then(data => {
            setSearchResponses(data.data.attributes.locations)
            setSearchCenter(data.data.attributes.map_argument.map_center)
        })
      }
      if (addressTwoEmail) {
        getGuestUser(token, addressTwoEmail)
        .then((data) => {
            return data.data.attributes.address
        })
        .then(address => {
            getLocations(addressOne, address, category)
                .then(data => {
                    setSearchResponses(data.data.attributes.locations)
                    setSearchCenter(data.data.attributes.map_argument.map_center)
                 })
        }) 
      }
    }

    const handleTimeInput = (e) => {
      setMeetingTime(e.target.value)
    }

    const postMeetingLocations = () => {
      // console.log('id', userId)
      // console.log('token', token)
      // console.log('email', addressTwoEmail)
      // console.log('time', meetingTime)
      // console.log('locations', checkedMeetingLocations)
      sendMeetingOptions(userId, token, addressTwoEmail, meetingTime, checkedMeetingLocations).then(res => console.log(res))
      setCheckedMeetingLocations([])
      navigate(`/dashboard`)
      setPageTitle('dashboard')
    }

    return (
    <div>
      <div className="category-change-container">
        <h1 className="category-text">Change your meeting category:</h1>
        <div className="category-container">
          <CafeIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <RestaurantIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <BarIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <LibraryIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
          <ParkIcon setSearchCategory={updateCategory} searchCategory={searchCategory}/>
        </div>
      </div>
      <div className="map-and-results">
        <div className="map">
          <Map
            searchResponses={searchResponses}
            searchCenter={searchCenter}
          />
        </div>
        <div className="title-and-results">
          <h2 className="results-title">Results:</h2>
          {addressTwoEmail && <p className="email-instructions">Select up to three locations to send <strong>{addressTwoEmail}</strong></p>}
          <div className="results">
            <ResultsContainer
              searchResponses={searchResponses}
              addressOne={addressOne}
              addressTwo={addressTwo}
              addressTwoManual={addressTwoManual}
              checkedMeetingLocations={checkedMeetingLocations}
              setCheckedMeetingLocations={setCheckedMeetingLocations}
              userEmail={userEmail}
              token={token}
              userId={userId}
              addressTwoEmail={addressTwoEmail}
              setPageTitle={setPageTitle}
            />
          </div>
            {addressTwoEmail ? <div className='meeting-invite-container'>
              <p>Select a date / time and enter the other party's email for your meeting invitation:</p>
              <input type="datetime-local" onChange={handleTimeInput} value={meetingTime}/>
              <button className="invitation-button" onClick={postMeetingLocations}>Send Meeting Invitation</button>
            </div> : <p className="login-text">Login to send a friend a meeting invite</p>}
        </div>
      </div>
    </div>
    )
};

export default ResultsPage;