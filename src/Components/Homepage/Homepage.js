import React from 'react';
import Nav from '../Nav/Nav';
import DefaultMidForm from '../DefaultMidForm/DefaultMidForm';
import UserMidForm from '../UserMidForm/UserMidForm';
import PendingMeetings from '../PendingMeetings/PendingMeetings';



const Homepage = ({ token, userEmail, userName, userId, searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, searchResponses, setSearchResponses, addressTwoEmail, setAddressTwoEmail, addressTwoManual, setAddressTwoManual, userDefaultAddress, setUserDefaultAddress, defaultFormView, setDefaultFormView, searchCenter, setSearchCenter, userMeetings }) => {
  // if userEmail is null, render defaultMidForm, if not null, render userMidForm
    return (
    <div>
      <Nav userName={userName}/>
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
      {userMeetings.length && <PendingMeetings 
        userMeetings={userMeetings}
        userId={userId}
        token={token}
      />}
    </div>
    )
};

export default Homepage;
