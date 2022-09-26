import React from 'react';
import Login from '../login';
import Logout from '../logout';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = ({ userEmail, setUserEmail, userName, setUserName, token, setToken, setUserDefaultAddress, setUserId, userId, userMeetings, setUserMeetings }) => {
   
  let navigate = useNavigate();

  const navigateHomePage = () => {
    navigate(`/dashboard`)
  }

  const navigateHome = () => {
    navigate(`/`)
  }

  return (
      <div className="Nav">
        <div className="title-div">
          <h1 className="page-title">MMiM</h1>
          <div className="title-block"></div>
        </div>
        <button className="nav-button" onClick={navigateHome}>home</button>
        <button className="nav-button">our team</button>
        <button className="nav-button" onClick={navigateHomePage}>meeting dashboard</button>
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

