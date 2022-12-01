import React from "react";
import Login from "../login";
import Logout from "../logout";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({
  userEmail,
  setUserEmail,
  userName,
  setUserName,
  token,
  setToken,
  setUserDefaultAddress,
  setUserId,
  userId,
  userMeetings,
  setUserMeetings,
  pageTitle,
  setPageTitle,
}) => {
  let navigate = useNavigate();

  const navigateHomePage = () => {
    navigate(`/dashboard`);
    setPageTitle("dashboard");
  };

  const navigateHome = () => {
    navigate(`/`);
    setPageTitle("home");
  };

  const navigateAbout = () => {
    navigate(`/about`);
    setPageTitle("about");
  };

  return (
      <div className="Nav">
        <div className="title-div">
          <button className="nav-home-button" onClick={navigateHome}><h1 className="page-title">MMiM</h1></button>
          <div className="title-block"></div>
        </div>
        {/* <div className="about-button">
          <button className="nav-button" onClick={navigateAbout}>our team</button>
          {pageTitle === 'about' && <div className="about-bar"></div>}
        </div> */}
        {userEmail && 
          <div className="dashboard-button">
            <button className="nav-button" onClick={navigateHomePage}>My dashboard</button>
            {pageTitle === 'dashboard' && <div className="dashboard-bar"></div>}
          </div>
        } 
        {!userEmail ? (<Login
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
        />
      ) : (
        <Logout
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          token={token}
          setToken={setToken}
          setUserDefaultAddress={setUserDefaultAddress}
          setUserId={setUserId}
          setUserMeetings={setUserMeetings}
          setPageTitle={setPageTitle}
        />
      )}
    </div>
  );
};

export default Nav;
