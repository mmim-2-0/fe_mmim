import React from 'react';
import Nav from '../Nav/Nav';
import DefaultMidForm from '../DefaultMidForm/DefaultMidForm';
import UserMidForm from '../UserMidForm/UserMidForm';


const Homepage = ({ userEmail, userName, searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, searchResponses, setSearchResponses }) => {
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
      /> : <UserMidForm />}
    </div>
    )
};

export default Homepage;
