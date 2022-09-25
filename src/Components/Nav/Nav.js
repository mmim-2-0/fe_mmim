import React from 'react';
import Login from '../login';
import Logout from '../logout';
import './Nav.css';

const Nav = ({ userEmail, setUserEmail, userName, setUserName, token, setToken, setUserDefaultAddress, setUserId, userId, userMeetings, setUserMeetings }) => {
    return (
      <div className="Nav">
        <div className="title-div">
          <h1 className="page-title">MMiM</h1>
          <div className="title-block"></div>
        </div>
        <button className="nav-button">home</button>
        <button className="nav-button">our team</button>
        <button className="nav-button">meeting dashboard</button>
        {!userEmail ? <Login
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          token={token}
          setToken={setToken}
          setUserDefaultAddress={setUserDefaultAddress}
          setUserId={setUserId}
          userId={userId}
          userMeetings={userMeetings}
          setUserMeetings={setUserMeetings}
        /> : <Logout
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          token={token}
          setToken={setToken}
          setUserDefaultAddress={setUserDefaultAddress}
          setUserId={setUserId}
          setUserMeetings={setUserMeetings}
        />}
      </div>
    )
};

export default Nav;

