import React from 'react';
import Login from '../login';
import Logout from '../logout';

const Nav = ({ userEmail, setUserEmail, userName, setUserName, token, setToken, setUserDefaultAddress, setUserId, userId, userMeetings, setUserMeetings }) => {
    return (
      <div className="Nav">
        <button>home</button>
        <button>our team</button>
        <button>meeting dashboard</button>
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

