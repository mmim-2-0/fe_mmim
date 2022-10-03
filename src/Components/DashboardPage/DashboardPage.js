import PendingMeetings from "../PendingMeetings/PendingMeetings";
import ConfirmedMeetings from "../ConfirmedMeetings/ConfirmedMeetings";
import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { updateDefaultAddress } from "../../apiCalls";

const DashboardPage = ({ userMeetings, userId, userName, userEmail, token, setPageTitle, userDefaultAddress, setUserDefaultAddress }) => {
  
  const [localDefault, setLocalDefault] = useState(userDefaultAddress)

  useEffect(() => {
    setPageTitle('dashboard')
  });

    const defaultAddressHandler = () => {
      console.log("token", token, typeof(token))
      console.log("userName", userName, typeof(userName))
      console.log("userEmail", userEmail, typeof(userEmail))
      console.log("localDefault", localDefault, typeof(localDefault))

      updateDefaultAddress(token, userName, userEmail, localDefault)
      // setUserDefaultAddress(localDefault)
      setLocalDefault('')
    }

    const handleLocalDefault = (e) => {
      setLocalDefault(e.target.value)
    }

  return (
    <div className="dashboard-parent-div">
      <div className="left-sidebar">
        <h3 className="change-default-title">change your default address:</h3>
        <input className="default-input" type="text" placeholder="new default address" value={localDefault} onChange={handleLocalDefault}></input>
        <button className="update-button" onClick={defaultAddressHandler}>update</button>
      </div>
      <div className="all-meetings">
        {(userMeetings.length > 0) && <PendingMeetings 
          userMeetings={userMeetings}
          userId={userId}
          token={token}
        />}
        {(userMeetings.length > 0) && <ConfirmedMeetings 
          userMeetings={userMeetings}
          userId={userId}
          token={token}
        />}
      </div>

    </div>
  )
}

export default DashboardPage;