import PendingMeetings from "../PendingMeetings/PendingMeetings";
import ConfirmedMeetings from "../ConfirmedMeetings/ConfirmedMeetings";
import DefaultAddress from "../DefaultAddress/DefaultAddress";
import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { updateDefaultAddress } from "../../apiCalls";

const DashboardPage = ({ userMeetings, userId, userName, userEmail, token, setPageTitle, userDefaultAddress, setUserDefaultAddress, setUserMeetings, setAddressOne }) => {
  
  const [dashboardDisplay, setDashboardDisplay] = useState("confirmed")

  useEffect(() => {
    setPageTitle('dashboard')
  });



  return (
    <div className="dashboard-parent-div">
      <div className="left-sidebar">
        <button className="dashboard-option-button" onClick={() => setDashboardDisplay("confirmed")}>Confirmed Meetings</button>
        <button className="dashboard-option-button" onClick={() => setDashboardDisplay("pending")}>Pending Invites</button>
        <button className="dashboard-option-button" onClick={() => setDashboardDisplay("myInfo")}>My Info</button>
      </div>
        {(dashboardDisplay === "confirmed") && <ConfirmedMeetings 
          userMeetings={userMeetings}
          userId={userId}
          token={token}
          setUserMeetings={setUserMeetings}
        />}
        {(dashboardDisplay === "pending") && <PendingMeetings 
          userMeetings={userMeetings}
          userId={userId}
          token={token}
          setUserMeetings={setUserMeetings}
        />}
        {(dashboardDisplay === "myInfo") && <DefaultAddress 
          token={token}
          userName={userName}
          userEmail={userEmail}
          userDefaultAddress={userDefaultAddress}
          setUserDefaultAddress={setUserDefaultAddress}
          setAddressOne={setAddressOne}
        />} 
    </div>
  )
}

export default DashboardPage;