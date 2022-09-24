import React from 'react';
import DefaultMidForm from '../DefaultMidForm/DefaultMidForm';
import UserMidForm from '../UserMidForm/UserMidForm';
import PendingMeetings from '../PendingMeetings/PendingMeetings';
import homepageImage from '../../assets/homepageImage.jpg';
import './Homepage.css'

const Homepage = ({ token, userEmail, userName, userId, searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, searchResponses, setSearchResponses, addressTwoEmail, setAddressTwoEmail, addressTwoManual, setAddressTwoManual, userDefaultAddress, setUserDefaultAddress, defaultFormView, setDefaultFormView, searchCenter, setSearchCenter, userMeetings }) => {
    return (
    <div>
      <section className="homepage">
      <div>
        <img className="homepageImage" src={homepageImage} alt="Nighttime aerial view of city"/>
        <header>Meet Me in the Middle</header>
        <p>Whether you’re meeting a friend or buying a dresser, Meet Me in the Middle makes it easy.</p>
        <p>Use MMiM to find the right place between your two locations.</p>
      </div>
      {!userEmail ? <DefaultMidForm
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        addressOne={addressOne}
        setAddressOne={setAddressOne}
        addressTwo={addressTwo}
        setAddressTwo={setAddressTwo}
        searchResponses={searchResponses}
        setSearchResponses={setSearchResponses}
        searchCenter={searchCenter}
        setSearchCenter={setSearchCenter}
      /> : <UserMidForm
        userName={userName}
        userEmail={userEmail}
        token={token}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        addressOne={addressOne}
        setAddressOne={setAddressOne}
        addressTwo={addressTwo}
        setAddressTwo={setAddressTwo}
        searchResponses={searchResponses}
        setSearchResponses={setSearchResponses}
        addressTwoEmail={addressTwoEmail}
        setAddressTwoEmail={setAddressTwoEmail}
        addressTwoManual={addressTwoManual}
        setAddressTwoManual={setAddressTwoManual}
        userDefaultAddress={userDefaultAddress}
        setUserDefaultAddress={setUserDefaultAddress}
        defaultFormView={defaultFormView}
        setDefaultFormView={setDefaultFormView}
        searchCenter={searchCenter}
        setSearchCenter={setSearchCenter}
      />      
      }
      {(userMeetings.length > 0) && <PendingMeetings 
        userMeetings={userMeetings}
        userId={userId}
        token={token}
      />}
      </section>
    </div>
    )
};

export default Homepage;
