import PendingMeetings from "../PendingMeetings/PendingMeetings";
import ConfirmedMeetings from "../ConfirmedMeetings/ConfirmedMeetings";
import './DashboardPage.css';
import { useEffect } from 'react';

const DashboardPage = ({ userMeetings, userId, token, setPageTitle }) => {
  
  useEffect(() => {
    setPageTitle('dashboard')
  });

  return (
    <div className="dashboard-parent-div">
      <div className="left-sidebar">
        <p>add functionality to change default address here</p>
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