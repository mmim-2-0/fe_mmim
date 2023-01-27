import React, { useRef } from "react";
import Login from "../login";
import Logout from "../logout";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import Popup from "reactjs-popup"; 


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
    // setPageTitle("dashboard");
    window.location.reload();
  };

  const navigateHome = () => {
    navigate(`/`);
    // setPageTitle("home");
    window.location.reload();
  };

  const navigateAbout = () => {
    navigate(`/about`);
    // setPageTitle("about");
  };
  const popupRef = useRef();  
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
        <div className="login-container"><a className="login-button" onClick={()=> popupRef?.toggle()}>{!userEmail ? "Login":"Logout"}</a>
        <Popup trigger={<button class="login-popup-trigger"></button>} ref={popupRef} position="left">
          {userEmail && 
            <div className="dashboard-button">
              <button className="nav-button" onClick={navigateHomePage}>My dashboard</button>
              {pageTitle === 'dashboard' && <div className="dashboard-bar"></div>}
            </div>
          } 
          { !userEmail ? (<Login 
            shouldHide= {!userEmail && window.location.pathname !== "/"}
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
          </Popup></div>

    </div>
  );
};

export default Nav;
