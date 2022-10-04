import PendingMeetings from "../PendingMeetings/PendingMeetings";
import ConfirmedMeetings from "../ConfirmedMeetings/ConfirmedMeetings";
import DefaultAddress from "../DefaultAddress/DefaultAddress";
import './DashboardPage.css';
import { useEffect, useState } from 'react';
import { updateDefaultAddress } from "../../apiCalls";

const DashboardPage = ({ userMeetings, userId, userName, userEmail, token, setPageTitle, userDefaultAddress, setUserDefaultAddress, setUserMeetings, setAddressOne }) => {
  
  const [currentDisplay, setCurrentDisplay] = useState("confirmed")

  const handleDashboardDisplay = (display) => {
    setCurrentDisplay(display)
  }

  useEffect(() => {
    setPageTitle('dashboard')
  });



  return (
    <div className="dashboard-parent-div">
      <div className="left-sidebar">
        <button className="dashboard-option-button" style={{ backgroundColor : currentDisplay === "confirmed" ? "black" : "white", color : currentDisplay === "confirmed" ? "white" : "black"}} onClick={() => handleDashboardDisplay("confirmed")}>Confirmed Meetings</button>
        <button className="dashboard-option-button" style={{ backgroundColor : currentDisplay === "pending" ? "black" : "white", color : currentDisplay === "pending" ? "white" : "black"}} onClick={() => handleDashboardDisplay("pending")}>Pending Invites</button>
        <button className="dashboard-option-button" style={{ backgroundColor : currentDisplay === "myInfo" ? "black" : "white", color : currentDisplay === "myInfo" ? "white" : "black"}} onClick={() => handleDashboardDisplay("myInfo")}>My Info</button>
      </div>
        {(currentDisplay === "confirmed") && <ConfirmedMeetings 
          userMeetings={userMeetings}
          userId={userId}
          token={token}
          setUserMeetings={setUserMeetings}
        />}
        {(currentDisplay === "pending") && <PendingMeetings 
          userMeetings={userMeetings}
          userId={userId}
          token={token}
          setUserMeetings={setUserMeetings}
        />}
        {(currentDisplay === "myInfo") && <DefaultAddress 
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