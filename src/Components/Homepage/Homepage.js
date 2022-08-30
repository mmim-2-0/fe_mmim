import React from 'react';
import Nav from '../Nav/Nav';
import DefaultMidForm from '../DefaultMidForm/DefaultMidForm';
import UserMidForm from '../UserMidForm/UserMidForm';


const Homepage = ({ userEmail, userName }) => {
  // if userEmail is null, render defaultMidForm, if not null, render userMidForm
    return (
    <div>
      <Nav userName={userName}/>
      {!userEmail ? <DefaultMidForm /> : <UserMidForm />}
    </div>
    )
};

export default Homepage;
