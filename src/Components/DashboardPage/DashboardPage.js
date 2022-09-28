import PendingMeetings from "../PendingMeetings/PendingMeetings";
import ConfirmedMeetings from "../ConfirmedMeetings/ConfirmedMeetings";
import './DashboardPage.css';
import { useEffect } from 'react';

const DashboardPage = ({ userMeetings, userId, token, setPageTitle }) => {
  
  useEffect(() => {
    setPageTitle('dashboard')
  });

  return (
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
  )
}

export default DashboardPage;